import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] ?? null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock Web Speech API
Object.defineProperty(window, 'SpeechRecognition', { value: undefined, writable: true });
Object.defineProperty(window, 'webkitSpeechRecognition', { value: undefined, writable: true });
Object.defineProperty(window, 'speechSynthesis', {
  value: { speak: vi.fn(), cancel: vi.fn() },
  writable: true,
});

// Mock pdfjs-dist so file extractor tests don't need a real PDF engine
vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: { workerSrc: '' },
  getDocument: vi.fn(() => ({ promise: Promise.resolve({ numPages: 1, getPage: () => Promise.resolve({ getTextContent: () => Promise.resolve({ items: [{ str: 'mock pdf text' }] }) }) }) })),
}));
