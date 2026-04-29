import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const MAX_CHARS = 50000;

export async function extractTextFromFile(file) {
  if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
    return extractTxt(file);
  }
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    return extractPdf(file);
  }
  throw new Error('Unsupported file type. Please upload a PDF or TXT file.');
}

function extractTxt(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(truncate(e.target.result));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

async function extractPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(' ') + '\n';
  }
  return truncate(text.trim());
}

function truncate(text) {
  if (text.length > MAX_CHARS) {
    return text.slice(0, MAX_CHARS) + '\n\n[File truncated — content exceeded limit]';
  }
  return text;
}
