let audioElement = new Audio();
export const AUDIO_MAIN = "/sounds/main.mp3";
export const AUDIO_CORRECT = "/sounds/correct.mp3";
export const AUDIO_WRONG = "/sounds/wrong.mp3";
export const AUDIO_BG = "/sounds/125000.mp3";

export function playAudio(url: string) {
  audioElement.src = url;
  audioElement.play();
}

export function stopAudio() {
  audioElement.pause();
  audioElement.currentTime = 0;
}

export function isAudioPlaying() {
  return !audioElement.paused;
}