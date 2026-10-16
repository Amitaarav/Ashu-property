import Image from "next/image";

type Props = {
  src?: string;
  alt: string;
  seed?: number;
  variant?: "building" | "plot" | "portrait";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const SKIES: [string, string][] = [
  ["#0b0d10", "#3a2f27"],
  ["#0e1318", "#2f3a40"],
  ["#120e0c", "#5a4331"],
];

// Small deterministic PRNG so each seed always draws the same scene (no hydration mismatch).
function rng(seed: number) {
  let s = (seed * 2654435761) % 2147483647 || 1;
  return () => {
    s = (s * 48271) % 2147483647;
    return s / 2147483647;
  };
}

function Scene({ seed, variant }: { seed: number; variant: NonNullable<Props["variant"]> }) {
  const r = rng(seed);
  const [top, bottom] = SKIES[seed % SKIES.length];
  const gid = `sky-${seed}-${variant}`;

  const sky = (
    <>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gid})`} />
    </>
  );

  if (variant === "portrait") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        {sky}
        <circle cx="200" cy="120" r="46" fill="#1b1b1c" />
        <path d="M90 300c0-70 50-100 110-100s110 30 110 100z" fill="#1b1b1c" />
        <circle cx="200" cy="120" r="46" fill="none" stroke="#f2b765" strokeOpacity="0.25" />
      </svg>
    );
  }

  if (variant === "plot") {
    return (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        {sky}
        <path d="M0 175 Q110 150 220 170 T400 160 V300 H0z" fill="#15130f" />
        <path d="M0 200 H400 V300 H0z" fill="#0d0c0a" />
        <path d="M120 205 L280 205 L340 275 L60 275 Z" fill="none" stroke="#f2b765" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="5 4" />
        {[[120, 205], [280, 205], [340, 275], [60, 275]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#f2b765" />
        ))}
        <circle cx="330" cy="70" r="14" fill="#f2b765" opacity="0.18" />
      </svg>
    );
  }

  const blocks = [
    { x: 70, y: 175, w: 230, h: 75 },
    { x: 120, y: 105, w: 240, h: 70 },
  ];
  const stars = Array.from({ length: 14 }, (_, i) => ({ id: i, x: r() * 400, y: r() * 90, o: 0.2 + r() * 0.5 }));

  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      {sky}
      {stars.map((s) => (
        <circle key={s.id} cx={s.x} cy={s.y} r="0.8" fill="#fff" opacity={s.o} />
      ))}
      {blocks.map((b, bi) => (
        <g key={bi}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="#26282a" />
          <rect x={b.x - 6} y={b.y - 4} width={b.w + 12} height="5" fill="#34363a" />
          {Array.from({ length: 5 }, (_, c) => {
            const cw = (b.w - 20) / 5;
            const lit = r() > 0.4;
            return (
              <rect
                key={c}
                x={b.x + 10 + c * cw + 3}
                y={b.y + 12}
                width={cw - 6}
                height={b.h - 24}
                fill={lit ? "#f2b765" : "#14181c"}
                opacity={lit ? 0.55 + r() * 0.4 : 0.9}
              />
            );
          })}
        </g>
      ))}
      <rect x="0" y="250" width="400" height="50" fill="#0a0a0a" />
      {[256, 264, 272].map((y, i) => (
        <rect key={y} x={70 - i * 6} y={y} width={230 + i * 12} height="3" fill="#1c1c1c" />
      ))}
      <circle cx="58" cy="246" r="3" fill="#f2b765" />
      <circle cx="58" cy="246" r="12" fill="#f2b765" opacity="0.12" />
    </svg>
  );
}

/** Fills its (relatively positioned) parent. Pass `src` for a real photo; otherwise a generated placeholder scene is drawn. */
export default function Photo({ src, alt, seed = 1, variant = "building", className = "", priority, sizes }: Props) {
  if (src) {
    return (
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes ?? "100vw"} className={`object-cover ${className}`} />
    );
  }
  return (
    <div role="img" aria-label={alt} className={`absolute inset-0 ${className}`}>
      <Scene seed={seed} variant={variant} />
    </div>
  );
}
