import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { canListen, canSpeak, stopSpeaking } from '../../services/speechService';

describe('speechService — unit', () => {
  beforeEach(() => vi.clearAllMocks());

  test('canListen returns false when no speech recognition API exists', () => {
    const origSR = window.SpeechRecognition;
    const origWSR = window.webkitSpeechRecognition;
    window.SpeechRecognition = undefined;
    window.webkitSpeechRecognition = undefined;
    expect(canListen()).toBe(false);
    window.SpeechRecognition = origSR;
    window.webkitSpeechRecognition = origWSR;
  });

  test('canListen returns true when SpeechRecognition is defined', () => {
    window.SpeechRecognition = class MockSR {};
    expect(canListen()).toBe(true);
    window.SpeechRecognition = undefined;
  });

  test('canListen returns true when webkitSpeechRecognition is defined', () => {
    window.SpeechRecognition = undefined;
    window.webkitSpeechRecognition = class MockWSR {};
    expect(canListen()).toBe(true);
    window.webkitSpeechRecognition = undefined;
  });

  test('canSpeak returns true when speechSynthesis is available', () => {
    expect(canSpeak()).toBe(true);
  });

  test('stopSpeaking calls speechSynthesis.cancel()', () => {
    stopSpeaking();
    expect(window.speechSynthesis.cancel).toHaveBeenCalled();
  });
});
