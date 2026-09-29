/**
 * Romantic Ambient Audio Engine
 * Uses Web Audio API for a warm, soothing generative chord progression
 * or plays a custom audio URL if provided by the user.
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private customAudioEl: HTMLAudioElement | null = null;
  private gainNode: GainNode | null = null;

  // Gentle pentatonic romantic frequencies (C major / A minor soft warm chords)
  // Notes: C4, E4, G4, A4, B4, C5, E5, G5
  private chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00], // G6
  ];
  private chordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime); // gentle volume
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playGentleChime(freq: number, delayMs: number = 0) {
    if (!this.ctx || !this.gainNode) return;
    
    setTimeout(() => {
      if (!this.ctx || !this.gainNode || !this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Warm sine + subtle triangle character
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft envelope (slow attack, long release like a music box or rhodes)
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.04, now + 0.3);
      noteGain.gain.exponentialRampToValueAtTime(0.00001, now + 3.2);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + 3.3);
    }, delayMs);
  }

  private playChordStep() {
    if (!this.isPlaying) return;
    const currentChord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    // Arpeggiate softly across 2.5 seconds
    currentChord.forEach((note, i) => {
      this.playGentleChime(note, i * 400);
    });

    // Add a light high twinkle chime
    const sparkleFreq = currentChord[Math.floor(Math.random() * currentChord.length)] * 2;
    this.playGentleChime(sparkleFreq, 1800);
  }

  public play(customUrl?: string): boolean {
    if (this.isPlaying) return true;

    if (customUrl && customUrl.trim().length > 0) {
      try {
        if (!this.customAudioEl) {
          this.customAudioEl = new Audio(customUrl);
          this.customAudioEl.loop = true;
        } else {
          this.customAudioEl.src = customUrl;
        }
        this.customAudioEl.play();
        this.isPlaying = true;
        return true;
      } catch (err) {
        console.warn('Custom audio playback failed, falling back to ambient generator', err);
      }
    }

    try {
      this.initContext();
      this.isPlaying = true;
      this.playChordStep();
      this.intervalId = window.setInterval(() => {
        this.playChordStep();
      }, 3600);
      return true;
    } catch (e) {
      console.error('Audio initialization error:', e);
      return false;
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.customAudioEl) {
      this.customAudioEl.pause();
    }
  }

  public toggle(customUrl?: string): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      return this.play(customUrl);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticAudio = new RomanticAudioManager();
