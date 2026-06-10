export function playHoverSquelch() {
  if (typeof window === "undefined") return;
  try {
    const audio = new Audio("/nfsSounds/Clack.mp3");
    audio.volume = 0.15;
    audio.play().catch(() => { });
  } catch (e) {
    // Ignore audio errors
  }
}

export function playStampThud() {
  if (typeof window === "undefined") return;
  try {
    const audio = new Audio("/nfsSounds/Dunn.mp3");
    audio.volume = 0.2;
    audio.play().catch(() => { });
  } catch (e) {
    // Ignore audio errors
  }
}
