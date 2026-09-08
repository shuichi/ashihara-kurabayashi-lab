'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const DURATION = '18s';
const PHASES = Array.from({ length: 13 }, (_, i) => (i / 12) * Math.PI * 2);

function pointAt(u: number, v: number, phase: number) {
  const envelope = Math.sin(u * Math.PI);
  return {
    x: 95 + u * 740 + Math.sin(v * Math.PI) * 38 + envelope * Math.sin(phase + v) * 12,
    y: 174 + v * 286
      + Math.sin(u * Math.PI * 2 - v * 2.8 + phase) * envelope * 125
      + Math.cos(u * Math.PI + v * 2.5 - phase) * 35,
  };
}

function curveAt(v: number, phase: number) {
  return Array.from({ length: 65 }, (_, column) => {
    const { x, y } = pointAt(column / 64, v, phase);
    return `${column === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
}

const markers = [{ u: 0.26, v: 0.24 }, { u: 0.78, v: 0.76 }, { u: 0.55, v: 0.48 }];

export function KnowledgeField({ paused }: { paused: boolean }) {
  const svg = useRef<SVGSVGElement>(null);
  // Render a static field until the visitor's motion preference is known.
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const synchronize = () => setMotionAllowed(!preference.matches);
    synchronize();
    preference.addEventListener('change', synchronize);
    return () => preference.removeEventListener('change', synchronize);
  }, []);

  useEffect(() => {
    if (paused || !motionAllowed) svg.current?.pauseAnimations();
    else svg.current?.unpauseAnimations();
  }, [paused, motionAllowed]);

  const curves = useMemo(() => Array.from({ length: 43 }, (_, row) => {
    const phases = motionAllowed ? PHASES : [0];
    return phases.map(phase => curveAt(row / 42, phase));
  }), [motionAllowed]);

  return (
    <svg ref={svg} className="knowledge-field" viewBox="0 0 960 650" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="field-ink" x1="90" y1="150" x2="850" y2="470" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--field-faint)" /><stop offset="0.38" stopColor="var(--field-strong)" /><stop offset="0.76" stopColor="var(--field-strong)" /><stop offset="1" stopColor="var(--field-faint)" />
        </linearGradient>
        <pattern id="field-grid" width="58" height="58" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill="var(--field-grid)" /></pattern>
      </defs>
      <rect x="20" y="20" width="920" height="610" fill="url(#field-grid)" />
      <g stroke="var(--field-grid)" strokeWidth="0.7"><ellipse cx="490" cy="325" rx="370" ry="244" transform="rotate(-18 490 325)" strokeDasharray="2 7" /><path d="M95 325H875M490 90V565" strokeDasharray="2 8" /></g>
      <g className="field-surface">
        <g stroke="url(#field-ink)" strokeWidth="0.85">
          {curves.map((frames, i) => <path key={i} d={frames[0]} className="field-line" style={{ animationDelay: `${-i * 0.25}s` }}>
            {motionAllowed && <animate attributeName="d" dur={DURATION} repeatCount="indefinite" values={frames.join(';')} />}
          </path>)}
        </g>
        <g className="field-points" fill="var(--field-strong)">
          {markers.map(({ u, v }, i) => {
            const initial = pointAt(u, v, 0);
            return <circle key={i} cx={initial.x} cy={initial.y} r={i === 2 ? 2.5 : 3}>
              {motionAllowed && <>
                <animate attributeName="cx" dur={DURATION} repeatCount="indefinite" values={PHASES.map(phase => pointAt(u, v, phase).x.toFixed(2)).join(';')} />
                <animate attributeName="cy" dur={DURATION} repeatCount="indefinite" values={PHASES.map(phase => pointAt(u, v, phase).y.toFixed(2)).join(';')} />
              </>}
            </circle>;
          })}
        </g>
      </g>
      <g stroke="var(--field-strong)" strokeWidth="0.8" opacity="0.55"><path d="M151 133h12m-6-6v12M804 493h12m-6-6v12" /></g>
    </svg>
  );
}
