"use client";
import { useRef } from "react";

type SoundKind =
  | "beep" | "click" | "hover" | "type"
  | "hit" | "miss" | "tick" | "nextq" | "done"
  | "flash" | "shot" | "yell"
  | "select" | "confirm" | "door" | "verdict";

export function useSynth(muted: boolean) {
  const ready = useRef(false);
  const ToneRef = useRef<typeof import("tone") | null>(null);

  const ensure = async () => {
    if (ready.current) return;
    const Tone = await import("tone");
    ToneRef.current = Tone;
    try { await Tone.start(); } catch {}
    ready.current = true;
  };

  const play = (kind: SoundKind) => {
    if (muted || !ready.current || !ToneRef.current) return;
    const Tone = ToneRef.current;
    try {
      switch (kind) {
        case "hover": {
          const s = new Tone.Synth({ oscillator: { type: "triangle" }, envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.02 }, volume: -32 }).toDestination();
          s.triggerAttackRelease(1400, "64n"); setTimeout(() => s.dispose(), 200); break;
        }
        case "click": {
          const s = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.05 }, volume: -20 }).toDestination();
          s.triggerAttackRelease(660, "32n"); setTimeout(() => s.dispose(), 200); break;
        }
        case "beep": {
          const s = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.02 }, volume: -22 }).toDestination();
          s.triggerAttackRelease(880, "64n"); setTimeout(() => s.dispose(), 200); break;
        }
        case "type": {
          const s = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.001, decay: 0.02, sustain: 0, release: 0.01 }, volume: -34 }).toDestination();
          s.triggerAttackRelease(2000 + Math.random() * 800, "64n"); setTimeout(() => s.dispose(), 100); break;
        }
        case "hit": {
          const n = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.05 }, volume: -10 }).toDestination();
          n.triggerAttackRelease("16n");
          const b = new Tone.MembraneSynth({ pitchDecay: 0.04, octaves: 6, volume: -6 }).toDestination();
          b.triggerAttackRelease("A1", "32n");
          setTimeout(() => { n.dispose(); b.dispose(); }, 500); break;
        }
        case "miss": {
          const s = new Tone.MembraneSynth({ pitchDecay: 0.3, octaves: 2, volume: -16 }).toDestination();
          s.triggerAttackRelease("D2", "8n"); setTimeout(() => s.dispose(), 500); break;
        }
        case "tick": {
          const s = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.001, decay: 0.02, sustain: 0, release: 0.01 }, volume: -28 }).toDestination();
          s.triggerAttackRelease(800, "64n"); setTimeout(() => s.dispose(), 80); break;
        }
        case "nextq": {
          const s = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.05 }, volume: -22 }).toDestination();
          s.triggerAttackRelease(1200, "32n"); setTimeout(() => s.dispose(), 200); break;
        }
        case "done": {
          const s = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "triangle" }, envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 }, volume: -12 }).toDestination();
          s.triggerAttackRelease(["C4", "E4", "G4"], "4n");
          setTimeout(() => s.dispose(), 800); break;
        }
        case "flash": {
          const n = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 1.2, sustain: 0, release: 0.8 }, volume: -8 }).toDestination();
          n.triggerAttackRelease("1n"); setTimeout(() => n.dispose(), 2000); break;
        }
        case "shot": {
          const n = new Tone.NoiseSynth({ noise: { type: "white" }, envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.15 }, volume: -6 }).toDestination();
          n.triggerAttackRelease("8n");
          const b = new Tone.MembraneSynth({ pitchDecay: 0.08, octaves: 5, volume: -4 }).toDestination();
          b.triggerAttackRelease("C1", "16n");
          setTimeout(() => { n.dispose(); b.dispose(); }, 700); break;
        }
        case "yell": {
          const s = new Tone.MembraneSynth({ pitchDecay: 0.2, octaves: 6, volume: -10 }).toDestination();
          s.triggerAttackRelease("A1", "8n"); setTimeout(() => s.dispose(), 400); break;
        }
        case "select": {
          const s = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.001, decay: 0.06, sustain: 0, release: 0.03 }, volume: -22 }).toDestination();
          s.triggerAttackRelease(800, "32n"); setTimeout(() => s.dispose(), 150); break;
        }
        case "confirm": {
          const s = new Tone.Synth({ oscillator: { type: "square" }, envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.05 }, volume: -18 }).toDestination();
          s.triggerAttackRelease(600, "16n"); setTimeout(() => s.dispose(), 250); break;
        }
        case "door": {
          const n = new Tone.NoiseSynth({ noise: { type: "brown" }, envelope: { attack: 0.01, decay: 0.4, sustain: 0, release: 0.3 }, volume: -12 }).toDestination();
          n.triggerAttackRelease("4n");
          const b = new Tone.MembraneSynth({ pitchDecay: 0.3, octaves: 2, volume: -8 }).toDestination();
          b.triggerAttackRelease("C2", "4n");
          setTimeout(() => { n.dispose(); b.dispose(); }, 800); break;
        }
        case "verdict": {
          const s = new Tone.MembraneSynth({ pitchDecay: 0.4, octaves: 4, volume: -6 }).toDestination();
          s.triggerAttackRelease("G1", "4n"); setTimeout(() => s.dispose(), 600); break;
        }
      }
    } catch {}
  };

  return { ensure, play, ready };
}
