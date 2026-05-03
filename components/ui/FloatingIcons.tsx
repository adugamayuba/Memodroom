"use client";

interface IconConfig {
  top: string;
  left: string;
  size: number;
  opacity: number;
  animClass: string;
  delay: string;
  rotate?: string;
}

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
      <path d="M2 20h20M4 20L4 10l4 4 4-8 4 8 4-4v10" />
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
      <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2.5" strokeLinecap="round" />
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

const ICONS: Array<IconConfig & { component: React.ComponentType<{ size: number }> }> = [
  // Top row
  { component: CameraIcon,   top: "6%",  left: "4%",  size: 30, opacity: 0.1,  animClass: "animate-float1", delay: "0s" },
  { component: SparkleIcon,  top: "4%",  left: "22%", size: 24, opacity: 0.08, animClass: "animate-float3", delay: "1.2s" },
  { component: HeartIcon,    top: "8%",  left: "48%", size: 28, opacity: 0.1,  animClass: "animate-float2", delay: "0.5s" },
  { component: MusicIcon,    top: "5%",  left: "72%", size: 26, opacity: 0.09, animClass: "animate-float1", delay: "2s" },
  { component: StarIcon,     top: "7%",  left: "90%", size: 28, opacity: 0.1,  animClass: "animate-float3", delay: "0.8s" },

  // Upper mid
  { component: MessageIcon,  top: "22%", left: "2%",  size: 32, opacity: 0.09, animClass: "animate-float2", delay: "1.5s" },
  { component: DiamondIcon,  top: "19%", left: "17%", size: 26, opacity: 0.08, animClass: "animate-float4", delay: "3s" },
  { component: PlayIcon,     top: "24%", left: "82%", size: 34, opacity: 0.1,  animClass: "animate-float1", delay: "0.3s" },
  { component: GiftIcon,     top: "21%", left: "94%", size: 28, opacity: 0.09, animClass: "animate-float3", delay: "2.5s" },

  // Mid
  { component: MicIcon,      top: "42%", left: "1%",  size: 30, opacity: 0.1,  animClass: "animate-float3", delay: "1s" },
  { component: CrownIcon,    top: "38%", left: "14%", size: 28, opacity: 0.08, animClass: "animate-float1", delay: "4s" },
  { component: VideoIcon,    top: "44%", left: "88%", size: 32, opacity: 0.1,  animClass: "animate-float2", delay: "1.8s" },
  { component: FilmIcon,     top: "40%", left: "73%", size: 30, opacity: 0.09, animClass: "animate-float4", delay: "0.6s" },

  // Lower mid
  { component: EnvelopeIcon, top: "60%", left: "3%",  size: 30, opacity: 0.1,  animClass: "animate-float4", delay: "2.2s" },
  { component: ZapIcon,      top: "64%", left: "18%", size: 24, opacity: 0.08, animClass: "animate-float2", delay: "1.3s" },
  { component: AwardIcon,    top: "62%", left: "85%", size: 30, opacity: 0.09, animClass: "animate-float1", delay: "3.5s" },
  { component: ClockIcon,    top: "58%", left: "95%", size: 26, opacity: 0.08, animClass: "animate-float3", delay: "0.9s" },

  // Bottom
  { component: ImageIcon,    top: "78%", left: "6%",  size: 30, opacity: 0.1,  animClass: "animate-float2", delay: "1.7s" },
  { component: PhoneIcon,    top: "82%", left: "20%", size: 26, opacity: 0.08, animClass: "animate-float1", delay: "2.8s" },
  { component: StarIcon,     top: "76%", left: "55%", size: 24, opacity: 0.08, animClass: "animate-float3", delay: "0.4s" },
  { component: HeartIcon,    top: "80%", left: "78%", size: 28, opacity: 0.09, animClass: "animate-float4", delay: "1.6s" },
  { component: SparkleIcon,  top: "85%", left: "92%", size: 26, opacity: 0.1,  animClass: "animate-float2", delay: "3.2s" },
];

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {ICONS.map((icon, i) => {
        const Icon = icon.component;
        return (
          <div
            key={i}
            className={`absolute text-[#25D366] ${icon.animClass}`}
            style={{
              top: icon.top,
              left: icon.left,
              opacity: icon.opacity,
              animationDelay: icon.delay,
              rotate: icon.rotate,
            }}
          >
            <Icon size={icon.size} />
          </div>
        );
      })}
    </div>
  );
}
