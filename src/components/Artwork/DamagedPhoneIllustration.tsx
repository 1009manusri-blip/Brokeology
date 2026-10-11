import React from 'react';

export const DamagedPhoneIllustration: React.FC = () => {
  return (
    <div className="relative w-48 h-64 md:w-56 md:h-72 mx-auto flex items-center justify-center">
      <svg viewBox="0 0 240 320" className="w-full h-full drop-shadow-[0_0_30px_rgba(244,63,94,0.35)]">
        <defs>
          <linearGradient id="phoneBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="screenGlass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="40%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <filter id="crackGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="warnBadge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>

        {/* Phone Case / Bezel (Slight tilt) */}
        <g transform="translate(120, 150) rotate(-6) translate(-120, -150)">
          {/* Metal Edge */}
          <rect
            x="36"
            y="20"
            width="148"
            height="260"
            rx="28"
            fill="url(#phoneBody)"
            stroke="#475569"
            strokeWidth="3"
          />

          {/* Screen Surface */}
          <rect
            x="44"
            y="28"
            width="132"
            height="244"
            rx="22"
            fill="url(#screenGlass)"
            stroke="#0f172a"
            strokeWidth="2"
          />

          {/* Dynamic Island / Speaker Notch */}
          <rect x="88" y="34" width="44" height="10" rx="5" fill="#000000" />
          <circle cx="120" cy="39" r="2.5" fill="#1e293b" />

          {/* Glitched Display Content */}
          <g opacity="0.4">
            <line x1="50" y1="90" x2="160" y2="90" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 4" />
            <line x1="50" y1="140" x2="170" y2="140" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="12 6" />
            <rect x="60" y="180" width="100" height="40" rx="6" fill="#1e1b4b" />
          </g>

          {/* SHATTERED CRACK NETWORK (Impact point at x=135, y=160) */}
          <g filter="url(#crackGlow)" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" opacity="0.95" fill="none">
            {/* Impact Spiderweb Center */}
            <circle cx="135" cy="160" r="4" fill="#ffffff" />
            <circle cx="135" cy="160" r="10" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 2" />

            {/* Main Primary Cracks Radiating Across Screen */}
            <path d="M 135,160 L 105,125 L 85,110 L 60,70 L 45,60" />
            <path d="M 105,125 L 75,145 L 45,150" />
            <path d="M 135,160 L 150,110 L 165,80 L 176,50" />
            <path d="M 135,160 L 120,195 L 90,225 L 75,268" />
            <path d="M 135,160 L 155,200 L 168,235 L 176,255" />
            <path d="M 135,160 L 170,165 L 176,170" />

            {/* Secondary Branch Cracks */}
            <path d="M 85,110 L 98,80 L 115,50" strokeWidth="1" strokeOpacity="0.8" />
            <path d="M 75,145 L 60,180 L 45,190" strokeWidth="1" strokeOpacity="0.8" />
            <path d="M 120,195 L 140,230 L 130,265" strokeWidth="1" strokeOpacity="0.8" />
            <path d="M 150,110 L 130,95 L 138,70" strokeWidth="1" strokeOpacity="0.8" />
            <path d="M 105,125 L 120,140 L 115,160" strokeWidth="1" strokeOpacity="0.8" />
          </g>

          {/* Glass shards reflection / highlights */}
          <polygon points="105,125 135,160 85,110" fill="#ffffff" opacity="0.12" />
          <polygon points="135,160 150,110 165,80" fill="#38bdf8" opacity="0.1" />
          <polygon points="120,195 135,160 90,225" fill="#f43f5e" opacity="0.15" />
        </g>

        {/* Floating Red Hazard Warning Triangle Badge */}
        <g transform="translate(160, 205)">
          {/* Badge Glow */}
          <circle cx="25" cy="25" r="30" fill="#f43f5e" opacity="0.4" filter="url(#crackGlow)" />
          {/* Triangle Base */}
          <polygon
            points="25,5 50,45 0,45"
            fill="url(#warnBadge)"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Exclamation Mark */}
          <line x1="25" y1="18" x2="25" y2="32" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="25" cy="38" r="2" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};
