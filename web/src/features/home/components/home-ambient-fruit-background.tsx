import type { ReactElement } from "react";

type FruitProps = {
  className?: string;
};

function Strawberry({ className }: FruitProps): ReactElement {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="strawberry_body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fb7185" />
          <stop offset="0.55" stopColor="#f43f5e" />
          <stop offset="1" stopColor="#be123c" />
        </linearGradient>
        <radialGradient id="strawberry_gloss" cx="35%" cy="30%" r="60%">
          <stop offset="0" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="0.55" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <path
        d="M60 22c10 0 18-4 24-12 1-1 2 0 2 1-1 11-7 19-14 24 9 2 16 6 21 13 10 14 5 33-5 47-12 16-28 23-28 23S44 111 32 95c-10-14-15-33-5-47 5-7 12-11 21-13-7-5-13-13-14-24 0-1 1-2 2-1 6 8 14 12 24 12z"
        fill="url(#strawberry_body)"
      />
      <path
        d="M62 24c-10 0-18-4-24-11 3 9 9 16 17 20-8 2-15 6-20 12-9 13-4 30 5 42 10 14 22 19 22 19s12-5 22-19c9-12 14-29 5-42-5-6-12-10-20-12 8-4 14-11 17-20-6 7-14 11-24 11z"
        fill="url(#strawberry_gloss)"
      />
      <path
        d="M42 18c6 6 12 9 18 9s12-3 18-9c3 1 6 1 9 0-3 10-10 18-18 22-6 3-12 3-18 0-8-4-15-12-18-22 3 1 6 1 9 0z"
        fill="#16a34a"
        opacity="0.92"
      />
      <path d="M60 25c4-7 10-11 18-13-4 7-10 11-18 13z" fill="#22c55e" opacity="0.9" />
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 28 + (i % 7) * 11;
        const y = 46 + Math.floor(i / 7) * 16;
        return <circle key={i} cx={x} cy={y} r="1.6" fill="#fde68a" opacity="0.85" />;
      })}
    </svg>
  );
}

function OrangeSlice({ className }: FruitProps): ReactElement {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="orange_pulp" cx="45%" cy="38%" r="70%">
          <stop offset="0" stopColor="#fff7ed" />
          <stop offset="0.35" stopColor="#fed7aa" />
          <stop offset="0.75" stopColor="#fb923c" />
          <stop offset="1" stopColor="#ea580c" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="44" fill="url(#orange_pulp)" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="#f97316" strokeWidth="6" opacity="0.55" />
      <circle cx="60" cy="60" r="14" fill="#fff7ed" opacity="0.8" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x2 = 60 + Math.cos(angle) * 38;
        const y2 = 60 + Math.sin(angle) * 38;
        return (
          <path
            key={i}
            d={`M60 60 L ${x2.toFixed(2)} ${y2.toFixed(2)}`}
            stroke="#fff7ed"
            strokeWidth="4"
            opacity="0.55"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function Kiwi({ className }: FruitProps): ReactElement {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="kiwi_flesh" cx="45%" cy="40%" r="70%">
          <stop offset="0" stopColor="#dcfce7" />
          <stop offset="0.35" stopColor="#86efac" />
          <stop offset="0.75" stopColor="#22c55e" />
          <stop offset="1" stopColor="#15803d" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="44" fill="#a16207" opacity="0.65" />
      <circle cx="60" cy="60" r="38" fill="url(#kiwi_flesh)" />
      <circle cx="60" cy="60" r="12" fill="#fff7ed" opacity="0.85" />
      {Array.from({ length: 18 }).map((_, i) => {
        const angle = (i * 2 * Math.PI) / 18;
        const x = 60 + Math.cos(angle) * 18;
        const y = 60 + Math.sin(angle) * 18;
        return <ellipse key={i} cx={x} cy={y} rx="1.2" ry="2.2" fill="#0f172a" opacity="0.55" />;
      })}
    </svg>
  );
}

function Grapes({ className }: FruitProps): ReactElement {
  const dots = [
    [0, 0],
    [18, 4],
    [-18, 6],
    [10, 20],
    [-10, 22],
    [0, 38],
    [20, 40],
    [-20, 42]
  ];

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="grape_skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.55" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <path d="M62 20c8-10 16-12 24-6-10 0-18 4-24 12-2-2-3-4 0-6z" fill="#16a34a" opacity="0.9" />
      <path d="M62 22c0-5 2-9 6-12" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
      {dots.map(([dx, dy], i) => (
        <circle key={i} cx={60 + dx} cy={52 + dy} r="16" fill="url(#grape_skin)" opacity="0.9" />
      ))}
      <circle cx="52" cy="44" r="6" fill="rgba(255,255,255,0.35)" />
    </svg>
  );
}

export function HomeAmbientFruitBackground(): ReactElement {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Warm haze to unify with the hero's faint yellow background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(251,191,36,0.18),transparent_55%),radial-gradient(ellipse_at_80%_35%,rgba(253,186,116,0.18),transparent_60%),radial-gradient(ellipse_at_55%_90%,rgba(251,191,36,0.14),transparent_55%)]"
        aria-hidden="true"
      />

      {/* Side fruit clusters (hidden on very small screens to keep hero clean) */}
      <div className="absolute -left-12 top-10 hidden w-[280px] sm:block lg:-left-16 lg:w-[360px]">
        <Strawberry className="home-fruit-float absolute left-0 top-0 h-40 w-40 opacity-20 blur-[0.65px] [animation-delay:-2.4s] lg:h-52 lg:w-52" />
        <OrangeSlice className="home-fruit-float absolute left-28 top-44 h-32 w-32 opacity-16 blur-[0.45px] [animation-delay:-1.2s] lg:left-40 lg:top-52 lg:h-44 lg:w-44" />
        <Kiwi className="home-fruit-float-slow absolute left-10 top-[24rem] h-28 w-28 opacity-14 blur-[0.4px] [animation-delay:-3.4s] lg:left-16 lg:top-[28rem] lg:h-36 lg:w-36" />

        <Grapes className="home-fruit-float-slow absolute -left-6 top-[14rem] h-28 w-28 opacity-12 blur-[0.6px] [animation-delay:-5.2s] lg:-left-10 lg:top-[16rem] lg:h-36 lg:w-36" />
        <OrangeSlice className="home-fruit-float absolute left-8 top-[34rem] h-24 w-24 opacity-12 blur-[0.55px] [animation-delay:-4.3s] lg:left-10 lg:top-[40rem] lg:h-32 lg:w-32" />
        <Strawberry className="home-fruit-float absolute left-40 top-[30rem] h-24 w-24 opacity-10 blur-[0.55px] [animation-delay:-6.1s] lg:left-56 lg:top-[34rem] lg:h-32 lg:w-32" />
      </div>

      <div className="absolute -right-12 top-14 hidden w-[280px] sm:block lg:-right-16 lg:w-[360px]">
        <Grapes className="home-fruit-float absolute right-0 top-2 h-40 w-40 opacity-16 blur-[0.55px] [animation-delay:-2.1s] lg:h-52 lg:w-52" />
        <Kiwi className="home-fruit-float-slow absolute right-32 top-64 h-28 w-28 opacity-13 blur-[0.4px] [animation-delay:-1.7s] lg:right-44 lg:top-72 lg:h-36 lg:w-36" />
        <OrangeSlice className="home-fruit-float absolute right-10 top-[24rem] h-32 w-32 opacity-12 blur-[0.45px] [animation-delay:-3.1s] lg:right-14 lg:top-[28rem] lg:h-44 lg:w-44" />

        <Strawberry className="home-fruit-float-slow absolute -right-8 top-[16rem] h-28 w-28 opacity-11 blur-[0.65px] [animation-delay:-4.8s] lg:-right-12 lg:top-[18rem] lg:h-36 lg:w-36" />
        <OrangeSlice className="home-fruit-float absolute right-40 top-[34rem] h-24 w-24 opacity-10 blur-[0.55px] [animation-delay:-5.9s] lg:right-56 lg:top-[40rem] lg:h-32 lg:w-32" />
        <Kiwi className="home-fruit-float absolute right-10 top-[38rem] h-24 w-24 opacity-10 blur-[0.55px] [animation-delay:-6.6s] lg:right-12 lg:top-[46rem] lg:h-32 lg:w-32" />
      </div>

      {/* Soft edge fade so fruit doesn't fight content */}
      <div
        className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-amber-50 to-transparent sm:w-28"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-rose-50/80 to-transparent sm:w-28"
        aria-hidden="true"
      />
    </div>
  );
}
