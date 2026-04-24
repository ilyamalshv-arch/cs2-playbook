"use client";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { TacticDiagram } from "@/lib/tactics-data";

const ROLE_COLORS: Record<string, string> = {
  entry: "#D0021B",
  support: "#F5A623",
  lurker: "#8B4513",
  awp: "#5dade2",
  igl: "#2ECC71",
  anchor: "#9b59b6",
};

export default function TacticDiagramPlayer({ diagram, side }: { diagram: TacticDiagram; side: "t" | "ct" }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const rafRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  const step = () => {
    const now = performance.now();
    const elapsed = (now - startTimeRef.current) / 1000;
    const newProgress = Math.min(elapsed / diagram.totalDuration, 1);
    setProgress(newProgress);
    if (newProgress >= 1) {
      setPlaying(false);
      return;
    }
    rafRef.current = requestAnimationFrame(step);
  };

  const play = () => {
    if (progress >= 1) setProgress(0);
    const offset = progress * diagram.totalDuration * 1000;
    startTimeRef.current = performance.now() - offset;
    setPlaying(true);
    rafRef.current = requestAnimationFrame(step);
  };

  const pause = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    pausedAtRef.current = progress;
    setPlaying(false);
  };

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    setProgress(0);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  // helper: get player position based on current progress + waypoint timing
  const getPlayerPos = (wp: typeof diagram.waypoints[0]): [number, number] => {
    const segments = wp.path.length - 1;
    if (segments === 0) return wp.path[0];

    // each player has their own timing: starts at delay, moves at their pace
    const playerDelay = wp.delay || 0;
    const playerMoveStart = playerDelay / diagram.totalDuration;
    const moveDuration = 1 - playerMoveStart; // rest of timeline

    if (progress < playerMoveStart) return wp.path[0];

    const playerProg = Math.min((progress - playerMoveStart) / moveDuration, 1);
    const segmentIdx = Math.min(Math.floor(playerProg * segments), segments - 1);
    const segProg = (playerProg * segments) - segmentIdx;

    const [x1, y1] = wp.path[segmentIdx];
    const [x2, y2] = wp.path[segmentIdx + 1];
    return [x1 + (x2 - x1) * segProg, y1 + (y2 - y1) * segProg];
  };

  const currentTime = progress * diagram.totalDuration;
  const sideColor = side === "t" ? "#D0021B" : "#5dade2";

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="cs2-mono text-[10px] tracking-[0.4em] text-[#F5A623]">▸ TACTICAL DIAGRAM</div>
        <div className="cs2-mono text-[10px] text-[#666]">t = {currentTime.toFixed(1)}s / {diagram.totalDuration}s</div>
      </div>

      <div style={{ background: "#060606", border: `1px solid ${sideColor}`, padding: 8 }}>
        <svg viewBox={diagram.viewBox} className="w-full h-auto" style={{ maxHeight: 400 }}>
          {/* background grid */}
          <defs>
            <pattern id={`grid-${side}`} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(245,166,35,0.04)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${side})`} />

          {/* schematic rooms */}
          {diagram.schematic.rooms?.map((r, i) => (
            <g key={`room-${i}`}>
              <rect x={r.x} y={r.y} width={r.w} height={r.h}
                fill={r.color || "rgba(20,20,20,0.5)"}
                stroke="#2a2a2a"
                strokeWidth="1"
              />
              {r.label && (
                <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 4} textAnchor="middle"
                  fill="#555" fontSize="8" fontFamily="VT323, monospace" letterSpacing="1.5">
                  {r.label}
                </text>
              )}
            </g>
          ))}

          {/* walls */}
          {diagram.schematic.walls?.map((w, i) => (
            <line key={`wall-${i}`}
              x1={w.x1} y1={w.y1} x2={w.x2} y2={w.y2}
              stroke="#3a3a3a" strokeWidth="2"
            />
          ))}

          {/* bomb sites */}
          {diagram.schematic.sites?.map((s, i) => (
            <g key={`site-${i}`}>
              <circle cx={s.x} cy={s.y} r={s.r}
                fill="rgba(208,2,27,0.1)" stroke="#D0021B" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x={s.x} y={s.y + 5} textAnchor="middle"
                fill="#D0021B" fontSize="16" fontFamily="Black Ops One, Impact, sans-serif">
                {s.label}
              </text>
            </g>
          ))}

          {/* paths — drawn progressively */}
          {diagram.waypoints.map((wp, i) => {
            const color = ROLE_COLORS[wp.role] || sideColor;
            const [cx, cy] = getPlayerPos(wp);
            const playerDelay = (wp.delay || 0) / diagram.totalDuration;
            const pastStart = progress >= playerDelay;

            // build path string up to current position
            const pathProg = (progress - playerDelay) / (1 - playerDelay);
            const segments = wp.path.length - 1;
            const activeSegment = Math.min(Math.floor(pathProg * segments), segments);

            let d = `M ${wp.path[0][0]} ${wp.path[0][1]}`;
            for (let s = 1; s <= activeSegment && s < wp.path.length; s++) {
              d += ` L ${wp.path[s][0]} ${wp.path[s][1]}`;
            }
            if (pastStart && progress < 1) {
              d += ` L ${cx} ${cy}`;
            }

            return (
              <g key={`wp-${i}`}>
                {/* trail */}
                {pastStart && (
                  <path d={d} fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="4 3" />
                )}
                {/* final destination marker — dimmed, shows where player ends up */}
                <circle cx={wp.path[wp.path.length - 1][0]} cy={wp.path[wp.path.length - 1][1]} r="4"
                  fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
                {/* player dot */}
                <g transform={`translate(${cx} ${cy})`}>
                  <circle r="8" fill={color} opacity="0.3" />
                  <circle r="5" fill={color} stroke="#fff" strokeWidth="1.5" />
                  <text y="-10" textAnchor="middle" fill={color} fontSize="9" fontFamily="VT323, monospace" letterSpacing="1">
                    {wp.player}
                  </text>
                </g>
              </g>
            );
          })}

          {/* utility — pop in by timing */}
          {diagram.utility?.map((u, i) => {
            const appearProg = u.appearAt / diagram.totalDuration;
            if (progress < appearProg) return null;
            const timeSinceAppear = progress - appearProg;
            const popScale = timeSinceAppear < 0.05 ? timeSinceAppear * 20 : 1;
            const kindColors = { smoke: "#888", flash: "#fff176", molly: "#ff6b35", he: "#D0021B" };
            const kindColor = kindColors[u.kind];

            return (
              <g key={`util-${i}`} transform={`translate(${u.x} ${u.y}) scale(${popScale})`}>
                {u.kind === "smoke" && (
                  <>
                    <circle r="16" fill={kindColor} opacity="0.25" />
                    <circle r="10" fill={kindColor} opacity="0.4" />
                  </>
                )}
                {u.kind === "flash" && (
                  <>
                    <circle r="14" fill={kindColor} opacity="0.3" />
                    <circle r="6" fill={kindColor} />
                  </>
                )}
                {u.kind === "molly" && (
                  <>
                    <circle r="14" fill={kindColor} opacity="0.2" />
                    <circle r="8" fill={kindColor} opacity="0.7" />
                    <circle r="3" fill="#ffeb3b" />
                  </>
                )}
                {u.kind === "he" && (
                  <>
                    <circle r="12" fill="none" stroke={kindColor} strokeWidth="2" />
                    <circle r="4" fill={kindColor} />
                  </>
                )}
                {u.label && (
                  <text y="-20" textAnchor="middle" fill={kindColor} fontSize="8" fontFamily="VT323, monospace" letterSpacing="1">
                    {u.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* bomb plant */}
          {diagram.plant && progress >= 0.8 && (
            <g transform={`translate(${diagram.plant.x} ${diagram.plant.y})`}>
              <rect x="-8" y="-6" width="16" height="12" fill="#D0021B" stroke="#fff" strokeWidth="1" />
              <text y="14" textAnchor="middle" fill="#D0021B" fontSize="9" fontFamily="VT323, monospace" letterSpacing="1">
                {diagram.plant.label}
              </text>
              <circle r="20" fill="none" stroke="#D0021B" strokeWidth="1.5" opacity={0.5 + Math.sin(progress * 30) * 0.5}>
                <animate attributeName="r" values="18;24;18" dur="0.8s" repeatCount="indefinite" />
              </circle>
            </g>
          )}
        </svg>

        {/* controls */}
        <div className="mt-3 flex items-center gap-3">
          <button onClick={playing ? pause : play}
            className="cs2-mono text-xs tracking-widest px-4 py-2 flex items-center gap-2 transition-all hover:scale-105"
            style={{ background: sideColor, color: side === "t" ? "#fff" : "#0a0a0a" }}>
            {playing ? <><Pause size={12} /> PAUSE</> : <><Play size={12} /> PLAY</>}
          </button>
          <button onClick={reset}
            className="cs2-mono text-xs tracking-widest px-3 py-2 flex items-center gap-1 text-[#888] hover:text-white transition-colors"
            style={{ border: "1px solid #333" }}>
            <RotateCcw size={11} /> RESET
          </button>
          <div className="flex-1 h-1 bg-[#1a1a1a] rounded">
            <div className="h-full rounded transition-none" style={{ width: `${progress * 100}%`, background: sideColor }} />
          </div>
        </div>

        {/* legend */}
        <div className="mt-3 pt-3 border-t border-[#1a1a1a] flex flex-wrap gap-x-4 gap-y-1 cs2-mono text-[10px] text-[#666]">
          <span>● <span style={{ color: ROLE_COLORS.entry }}>entry</span></span>
          <span>● <span style={{ color: ROLE_COLORS.support }}>support</span></span>
          <span>● <span style={{ color: ROLE_COLORS.lurker }}>lurker</span></span>
          <span>● <span style={{ color: ROLE_COLORS.awp }}>awp</span></span>
          <span>● <span style={{ color: ROLE_COLORS.igl }}>igl</span></span>
          <span>● <span style={{ color: ROLE_COLORS.anchor }}>anchor</span></span>
        </div>
      </div>
    </div>
  );
}
