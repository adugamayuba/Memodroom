"use client";

/* -----------------------------------------------------------------
   Floating doodle icons for the hero background.
   Animations are applied via inline styles (not Tailwind class names)
   so they survive production purging. Keyframes live in globals.css.
------------------------------------------------------------------ */

interface IconConfig {
  top: string;
  left: string;
  size: number;
  opacity: number;
  animation: string; /* e.g. "float1 6s ease-in-out infinite" */
  delay: string;
}

/* ── SVG icons ─────────────────────────────────────────────────── */

function CameraIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function HeartIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function StarIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function MicIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function PlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  );
}

function GiftIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}

function MessageIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function EnvelopeIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function FilmIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
}

function MusicIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function VideoIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function SparkleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" />
    </svg>
  );
}

function CrownIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M4 20V10l4 4 4-8 4 8 4-4v10" />
    </svg>
  );
}

function DiamondIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9 6 3z" />
      <path d="M2 9h20" />
    </svg>
  );
}

function ImageIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function ZapIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function AwardIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

function PhoneIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </svg>
  );
}

function ClockIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ShareIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

/* ── Icon registry ──────────────────────────────────────────────── */
const ICON_COMPONENTS = [
  CameraIcon, HeartIcon, StarIcon, MicIcon, PlayIcon,
  GiftIcon, MessageIcon, EnvelopeIcon, FilmIcon, MusicIcon,
  VideoIcon, SparkleIcon, CrownIcon, DiamondIcon, ImageIcon,
  ZapIcon, AwardIcon, PhoneIcon, ClockIcon, ShareIcon,
];

/* ── Layout: 24 icons spread across the hero viewport ───────────── */
const LAYOUT: IconConfig[] = [
  // top row
  { top: "5%",  left: "3%",  size: 34, opacity: 0.2,  animation: "float1 6s ease-in-out infinite",   delay: "0s"    },
  { top: "4%",  left: "18%", size: 26, opacity: 0.16, animation: "float3 8s ease-in-out infinite",   delay: "1.2s"  },
  { top: "7%",  left: "36%", size: 30, opacity: 0.18, animation: "float2 7s ease-in-out infinite",   delay: "0.5s"  },
  { top: "5%",  left: "56%", size: 28, opacity: 0.16, animation: "float4 5s ease-in-out infinite",   delay: "2.1s"  },
  { top: "6%",  left: "75%", size: 32, opacity: 0.2,  animation: "float1 6.5s ease-in-out infinite", delay: "0.8s"  },
  { top: "4%",  left: "91%", size: 26, opacity: 0.17, animation: "float3 7.5s ease-in-out infinite", delay: "3s"    },

  // upper-mid row
  { top: "22%", left: "1%",  size: 30, opacity: 0.18, animation: "float2 7s ease-in-out infinite",   delay: "1.5s"  },
  { top: "20%", left: "14%", size: 26, opacity: 0.15, animation: "float4 5.5s ease-in-out infinite", delay: "2.8s"  },
  { top: "24%", left: "30%", size: 28, opacity: 0.17, animation: "float1 6s ease-in-out infinite",   delay: "0.3s"  },
  { top: "21%", left: "63%", size: 32, opacity: 0.18, animation: "float3 8s ease-in-out infinite",   delay: "1.8s"  },
  { top: "23%", left: "80%", size: 28, opacity: 0.16, animation: "float2 7s ease-in-out infinite",   delay: "0.7s"  },
  { top: "20%", left: "94%", size: 30, opacity: 0.2,  animation: "float4 5s ease-in-out infinite",   delay: "2.5s"  },

  // mid row
  { top: "43%", left: "0%",  size: 32, opacity: 0.18, animation: "float3 7.5s ease-in-out infinite", delay: "1s"    },
  { top: "40%", left: "12%", size: 28, opacity: 0.15, animation: "float1 6s ease-in-out infinite",   delay: "3.5s"  },
  { top: "46%", left: "46%", size: 26, opacity: 0.16, animation: "float2 8s ease-in-out infinite",   delay: "0.6s"  },
  { top: "42%", left: "72%", size: 30, opacity: 0.18, animation: "float4 5.5s ease-in-out infinite", delay: "1.4s"  },
  { top: "44%", left: "90%", size: 32, opacity: 0.2,  animation: "float1 6.5s ease-in-out infinite", delay: "2.2s"  },

  // lower-mid row
  { top: "62%", left: "2%",  size: 28, opacity: 0.18, animation: "float2 7s ease-in-out infinite",   delay: "2s"    },
  { top: "60%", left: "22%", size: 26, opacity: 0.15, animation: "float3 8s ease-in-out infinite",   delay: "0.9s"  },
  { top: "65%", left: "58%", size: 30, opacity: 0.17, animation: "float4 5s ease-in-out infinite",   delay: "3.2s"  },
  { top: "61%", left: "86%", size: 28, opacity: 0.16, animation: "float1 6s ease-in-out infinite",   delay: "1.6s"  },

  // bottom row
  { top: "80%", left: "5%",  size: 30, opacity: 0.18, animation: "float3 7.5s ease-in-out infinite", delay: "1.7s"  },
  { top: "82%", left: "25%", size: 26, opacity: 0.15, animation: "float1 6.5s ease-in-out infinite", delay: "2.6s"  },
  { top: "78%", left: "88%", size: 32, opacity: 0.2,  animation: "float2 7s ease-in-out infinite",   delay: "0.4s"  },
];

export function FloatingIcons() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {LAYOUT.map((cfg, i) => {
        const Icon = ICON_COMPONENTS[i % ICON_COMPONENTS.length];
        return (
          <div
            key={i}
            className="absolute text-[#25D366]"
            style={{
              top: cfg.top,
              left: cfg.left,
              opacity: cfg.opacity,
              animation: cfg.animation,
              animationDelay: cfg.delay,
            }}
          >
            <Icon size={cfg.size} />
          </div>
        );
      })}
    </div>
  );
}
