import React from 'react';

export const CrownSunsetIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-[16/10] max-w-xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl group select-none">
      <svg viewBox="0 0 600 380" className="w-full h-full object-cover">
        <defs>
          <linearGradient id="victorySunset" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1035" />
            <stop offset="30%" stopColor="#4c1d68" />
            <stop offset="60%" stopColor="#9d174d" />
            <stop offset="85%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>

          <linearGradient id="goldCrown" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#facc15" />
            <stop offset="80%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          <filter id="crownGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="balloonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="25%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="75%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>

        {/* Sunset Sky Base */}
        <rect width="600" height="380" fill="url(#victorySunset)" />

        {/* Ambient Sun & Cloud Formations */}
        <ellipse cx="300" cy="280" rx="180" ry="70" fill="#fb923c" opacity="0.35" />
        <ellipse cx="140" cy="310" rx="120" ry="50" fill="#f43f5e" opacity="0.4" />
        <ellipse cx="460" cy="300" rx="140" ry="60" fill="#f43f5e" opacity="0.4" />
        <ellipse cx="300" cy="330" rx="240" ry="60" fill="#facc15" opacity="0.3" />

        {/* Distant Hot Air Balloon (Right side like reference) */}
        <g transform="translate(480, 75) scale(0.7)">
          {/* Balloon Envelope */}
          <path
            d="M 25,0 C 45,0 55,20 45,45 C 40,55 32,65 25,75 C 18,65 10,55 5,45 C -5,20 5,0 25,0 Z"
            fill="url(#balloonGrad)"
            stroke="#b91c1c"
            strokeWidth="1.5"
          />
          {/* Ropes */}
          <line x1="18" y1="75" x2="20" y2="84" stroke="#ffffff" strokeWidth="1" />
          <line x1="32" y1="75" x2="30" y2="84" stroke="#ffffff" strokeWidth="1" />
          {/* Basket */}
          <rect x="18" y="84" width="14" height="10" rx="2" fill="#78350f" />
        </g>

        {/* Central Glowing Golden Crown */}
        <g transform="translate(300, 155) scale(1.15)">
          {/* Crown Halo Glow */}
          <circle cx="0" cy="0" r="75" fill="#facc15" opacity="0.25" filter="url(#crownGlow)" />

          {/* Golden Crown Base & Peaks */}
          <path
            d="M -60,25 L -55,-25 L -25,0 L 0,-40 L 25,0 L 55,-25 L 60,25 Z"
            fill="url(#goldCrown)"
            stroke="#fef08a"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Crown Base Rim */}
          <rect
            x="-62"
            y="24"
            width="124"
            height="18"
            rx="5"
            fill="#eab308"
            stroke="#fef08a"
            strokeWidth="2"
          />

          {/* Crown Jewels on Peaks */}
          <circle cx="-55" cy="-25" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="0" cy="-40" r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          <circle cx="55" cy="-25" r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />

          {/* Jewels on Rim */}
          <circle cx="-40" cy="33" r="4" fill="#a855f7" />
          <circle cx="-15" cy="33" r="5" fill="#ef4444" />
          <circle cx="15" cy="33" r="5" fill="#3b82f6" />
          <circle cx="40" cy="33" r="4" fill="#10b981" />

          {/* Sparkles */}
          <g filter="url(#crownGlow)">
            {/* Sparkle 1 */}
            <path d="M -45,-50 L -45,-38 M -51,-44 L -39,-44" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            {/* Sparkle 2 */}
            <path d="M 45,-55 L 45,-43 M 39,-49 L 51,-49" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            {/* Sparkle 3 */}
            <path d="M 0,-62 L 0,-52 M -5,-57 L 5,-57" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
};
