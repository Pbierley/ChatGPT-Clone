const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const canListen = () => !!SpeechRecognition;
export const canSpeak = () => !!window.speechSynthesis;

let recognition = null;

export function startListening({ onInterim, onFinal, onEnd, onError }) {
  if (!SpeechRecognition) {
    onError?.('Speech recognition is not supported in this browser.');
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let interim = '';
    let final = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) final += transcript;
      else interim += transcript;
    }
    if (final) onFinal?.(final);
    else onInterim?.(interim);
  };

  recognition.onerror = (event) => {
    if (event.error !== 'no-speech') onError?.(event.error);
    onEnd?.();
  };

  recognition.onend = () => onEnd?.();

  recognition.start();
}

export function stopListening() {
  recognition?.stop();
  recognition = null;
}

export function speak(text, { onEnd } = {}) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => onEnd?.();
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  window.speechSynthesis?.cancel();
}
