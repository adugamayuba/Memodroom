"use client";

/* Floating filled icons for the hero background */

interface IconConfig {
  top: string;
  left: string;
  size: number;
  opacity: number;
  animation: string;
  delay: string;
}

/* ── Filled SVG icons ───────────────────────────────────────────── */

function CameraIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"/>
      <path d="M9 2L7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
    </svg>
  );
}

function HeartIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function StarIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function MicIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"/>
      <path d="M17 11a1 1 0 0 0-2 0 3 3 0 0 1-6 0 1 1 0 0 0-2 0 5 5 0 0 0 4.5 4.975V18H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2.5v-2.025A5 5 0 0 0 17 11z"/>
    </svg>
  );
}

function PlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
    </svg>
  );
}

function GiftIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-2.18c.07-.43.18-.86.18-1.3C18 3.21 16.79 2 15.3 2c-.97 0-1.79.6-2.43 1.27L12 4.16l-.87-.89C10.49 2.6 9.67 2 8.7 2 7.21 2 6 3.21 6 4.7c0 .44.11.87.18 1.3H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7.62-2.5c.44-.51.9-.9 1.32-.9.64 0 1.3.56 1.3 1.3 0 .76-.58 1.1-1.3 1.1H13l-.62-1.5zm-4.76 0c.44-.51.9-.9 1.32-.9.64 0 1.3.56 1.3 1.3 0 .76-.58 1.1-1.3 1.1l-.62-1.5zM4 13v7c0 1.1.9 2 2 2h5v-9H4zm9 9h5c1.1 0 2-.9 2-2v-7h-7v9z"/>
    </svg>
  );
}

function MessageIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
  );
}

function EnvelopeIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}

function FilmIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 3v2h-2V3H8v2H6V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h2v-2h2v2h8v-2h2v2h2c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-2zm0 14h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2z"/>
    </svg>
  );
}

function MusicIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6zM8 21a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
    </svg>
  );
}

function VideoIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"/>
    </svg>
  );
}

function SparkleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}

function CrownIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 16l-3-9 5.5 4L12 3l4.5 8L22 7l-3 9H5zm0 2h14v2H5v-2z"/>
    </svg>
  );
}

function DiamondIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.4 2h11.2l4.4 6-10 14L2 8l4.4-6zM4.21 9l7.79 11 7.79-11H4.21zM15.6 4H8.4L6.06 7h11.88L15.6 4z"/>
    </svg>
  );
}

function ImageIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 3H3C1.9 3 1 3.9 1 5v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM14.5 11l-3 3.75L9 12l-3 4h12l-3.5-5z"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
    </svg>
  );
}

function ZapIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function AwardIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a7 7 0 1 0 0 14A7 7 0 0 0 12 2zm-2 14.5l-1.5 5.5L12 20l3.5 2-1.5-5.5A8.96 8.96 0 0 1 12 17a8.96 8.96 0 0 1-2-.5z"/>
    </svg>
  );
}

function PhoneIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm5 17a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-15a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1z"/>
    </svg>
  );
}

function ClockIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z"/>
    </svg>
  );
}

function ShareIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
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

/* ── Layout ─────────────────────────────────────────────────────── */
const LAYOUT: IconConfig[] = [
  { top: "5%",  left: "3%",  size: 34, opacity: 0.18, animation: "float1 6s ease-in-out infinite",   delay: "0s"    },
  { top: "4%",  left: "18%", size: 26, opacity: 0.14, animation: "float3 8s ease-in-out infinite",   delay: "1.2s"  },
  { top: "7%",  left: "36%", size: 30, opacity: 0.16, animation: "float2 7s ease-in-out infinite",   delay: "0.5s"  },
  { top: "5%",  left: "56%", size: 28, opacity: 0.14, animation: "float4 5s ease-in-out infinite",   delay: "2.1s"  },
  { top: "6%",  left: "75%", size: 32, opacity: 0.18, animation: "float1 6.5s ease-in-out infinite", delay: "0.8s"  },
  { top: "4%",  left: "91%", size: 26, opacity: 0.15, animation: "float3 7.5s ease-in-out infinite", delay: "3s"    },
  { top: "22%", left: "1%",  size: 30, opacity: 0.16, animation: "float2 7s ease-in-out infinite",   delay: "1.5s"  },
  { top: "20%", left: "14%", size: 26, opacity: 0.13, animation: "float4 5.5s ease-in-out infinite", delay: "2.8s"  },
  { top: "24%", left: "30%", size: 28, opacity: 0.15, animation: "float1 6s ease-in-out infinite",   delay: "0.3s"  },
  { top: "21%", left: "63%", size: 32, opacity: 0.16, animation: "float3 8s ease-in-out infinite",   delay: "1.8s"  },
  { top: "23%", left: "80%", size: 28, opacity: 0.14, animation: "float2 7s ease-in-out infinite",   delay: "0.7s"  },
  { top: "20%", left: "94%", size: 30, opacity: 0.18, animation: "float4 5s ease-in-out infinite",   delay: "2.5s"  },
  { top: "43%", left: "0%",  size: 32, opacity: 0.16, animation: "float3 7.5s ease-in-out infinite", delay: "1s"    },
  { top: "40%", left: "12%", size: 28, opacity: 0.13, animation: "float1 6s ease-in-out infinite",   delay: "3.5s"  },
  { top: "46%", left: "46%", size: 26, opacity: 0.14, animation: "float2 8s ease-in-out infinite",   delay: "0.6s"  },
  { top: "42%", left: "72%", size: 30, opacity: 0.16, animation: "float4 5.5s ease-in-out infinite", delay: "1.4s"  },
  { top: "44%", left: "90%", size: 32, opacity: 0.18, animation: "float1 6.5s ease-in-out infinite", delay: "2.2s"  },
  { top: "62%", left: "2%",  size: 28, opacity: 0.16, animation: "float2 7s ease-in-out infinite",   delay: "2s"    },
  { top: "60%", left: "22%", size: 26, opacity: 0.13, animation: "float3 8s ease-in-out infinite",   delay: "0.9s"  },
  { top: "65%", left: "58%", size: 30, opacity: 0.15, animation: "float4 5s ease-in-out infinite",   delay: "3.2s"  },
  { top: "61%", left: "86%", size: 28, opacity: 0.14, animation: "float1 6s ease-in-out infinite",   delay: "1.6s"  },
  { top: "80%", left: "5%",  size: 30, opacity: 0.16, animation: "float3 7.5s ease-in-out infinite", delay: "1.7s"  },
  { top: "82%", left: "25%", size: 26, opacity: 0.13, animation: "float1 6.5s ease-in-out infinite", delay: "2.6s"  },
  { top: "78%", left: "88%", size: 32, opacity: 0.18, animation: "float2 7s ease-in-out infinite",   delay: "0.4s"  },
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
            className="absolute text-[#FF7B31]"
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
