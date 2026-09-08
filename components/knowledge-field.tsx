import { pointAt, curveAt } from "@/lib/knowledge-field";
const markers = [
  { u: 0.26, v: 0.24 },
  { u: 0.78, v: 0.76 },
  { u: 0.55, v: 0.48 },
];
export function KnowledgeField() {
  return (
    <svg
      data-knowledge-field=""
      className="knowledge-field"
      viewBox="0 0 960 650"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="field-ink"
          x1="90"
          y1="150"
          x2="850"
          y2="470"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--field-faint)" />
          <stop offset="0.38" stopColor="var(--field-strong)" />
          <stop offset="0.76" stopColor="var(--field-strong)" />
          <stop offset="1" stopColor="var(--field-faint)" />
        </linearGradient>
        <pattern id="field-grid" width="58" height="58" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="var(--field-grid)" />
        </pattern>
      </defs>
      <rect x="20" y="20" width="920" height="610" fill="url(#field-grid)" />
      <g stroke="var(--field-grid)" strokeWidth="0.7">
        <ellipse
          cx="490"
          cy="325"
          rx="370"
          ry="244"
          transform="rotate(-18 490 325)"
          strokeDasharray="2 7"
        />
        <path d="M95 325H875M490 90V565" strokeDasharray="2 8" />
      </g>
      <g className="field-surface">
        <g stroke="url(#field-ink)" strokeWidth="0.85">
          {Array.from({ length: 43 }, (_, i) => (
            <path
              key={i}
              d={curveAt(i / 42, 0)}
              data-row={i}
              className="field-line"
              style={{ animationDelay: `${-i * 0.25}s` }}
            ></path>
          ))}
        </g>
        <g className="field-points" fill="var(--field-strong)">
          {markers.map(({ u, v }, i) => {
            const initial = pointAt(u, v, 0);
            return (
              <circle
                data-u={u}
                data-v={v}
                key={i}
                cx={initial.x}
                cy={initial.y}
                r={i === 2 ? 2.5 : 3}
              ></circle>
            );
          })}
        </g>
      </g>
      <g stroke="var(--field-strong)" strokeWidth="0.8" opacity="0.55">
        <path d="M151 133h12m-6-6v12M804 493h12m-6-6v12" />
      </g>
    </svg>
  );
}
