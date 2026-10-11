import React from 'react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-pink-500/10 border border-white/10 group">
      {/* Background Cinematic Sky */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full object-cover select-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="sunsetSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1236" />
            <stop offset="35%" stopColor="#3d1b54" />
            <stop offset="65%" stopColor="#8a2d6c" />
            <stop offset="85%" stopColor="#e3497d" />
            <stop offset="100%" stopColor="#fca36e" />
          </linearGradient>

          <linearGradient id="cloudGlow" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fca36e" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#e84a86" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="pinkHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#9d174d" />
          </linearGradient>

          <linearGradient id="islandRock" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="buildingNeon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>

          <filter id="glowLight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          </filter>
        </defs>

        {/* Sky Base */}
        <rect width="800" height="600" fill="url(#sunsetSky)" />

        {/* Distant Sun Glow */}
        <circle cx="560" cy="380" r="180" fill="#fca36e" opacity="0.35" filter="url(#softGlow)" />
        <circle cx="560" cy="380" r="90" fill="#fef08a" opacity="0.4" filter="url(#glowLight)" />

        {/* Cumulus Cloud Layers */}
        <g opacity="0.65">
          <ellipse cx="620" cy="460" rx="200" ry="80" fill="url(#cloudGlow)" />
          <ellipse cx="440" cy="480" rx="180" ry="70" fill="url(#cloudGlow)" />
          <ellipse cx="700" cy="390" rx="140" ry="60" fill="url(#cloudGlow)" />
          <ellipse cx="520" cy="340" rx="120" ry="50" fill="url(#cloudGlow)" />
          <ellipse cx="320" cy="390" rx="160" ry="65" fill="url(#cloudGlow)" />
        </g>

        {/* Floating City Islands in the Distance */}
        {/* Main Floating Island */}
        <g transform="translate(480, 160)">
          {/* Island Underside Rock */}
          <polygon
            points="50,140 180,140 220,165 190,240 120,290 40,210 10,165"
            fill="url(#islandRock)"
          />
          <polygon points="50,140 120,290 190,240" fill="#1e293b" opacity="0.6" />
          
          {/* Island Green Surface */}
          <polygon
            points="50,140 10,165 60,185 180,185 220,165 180,140"
            fill="#34d399"
            opacity="0.9"
          />
          <polygon
            points="60,185 180,185 170,195 70,195"
            fill="#059669"
          />

          {/* Miniature Isometric Towers on the Island */}
          {/* Tower 1 (Center Tall) */}
          <g transform="translate(100, 60)">
            <polygon points="20,0 45,15 45,85 20,70" fill="#38bdf8" opacity="0.85" />
            <polygon points="20,0 -5,15 -5,85 20,70" fill="#0284c7" opacity="0.9" />
            <polygon points="20,0 -5,15 20,30 45,15" fill="#bae6fd" />
            {/* Glowing Windows */}
            <line x1="25" y1="25" x2="40" y2="34" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="25" y1="40" x2="40" y2="49" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="25" y1="55" x2="40" y2="64" stroke="#fef08a" strokeWidth="2" strokeDasharray="3 3" />
          </g>

          {/* Tower 2 (Right) */}
          <g transform="translate(145, 95)">
            <polygon points="15,0 35,12 35,55 15,43" fill="#f43f5e" opacity="0.8" />
            <polygon points="15,0 -5,12 -5,55 15,43" fill="#be123c" opacity="0.85" />
            <polygon points="15,0 -5,12 15,24 35,12" fill="#fbcfe8" />
          </g>

          {/* Tower 3 (Left) */}
          <g transform="translate(65, 105)">
            <polygon points="15,0 35,12 35,45 15,33" fill="#a855f7" opacity="0.85" />
            <polygon points="15,0 -5,12 -5,45 15,33" fill="#7e22ce" opacity="0.9" />
            <polygon points="15,0 -5,12 15,24 35,12" fill="#e9d5ff" />
          </g>

          {/* Tiny stylized trees */}
          <circle cx="85" cy="165" r="7" fill="#10b981" />
          <circle cx="160" cy="170" r="9" fill="#059669" />
          <circle cx="140" cy="175" r="6" fill="#34d399" />

          {/* Tiny suspended bridge / walkway */}
          <path d="M40 170 Q 20 180 -10 190" stroke="#f59e0b" strokeWidth="2" fill="none" />
        </g>

        {/* Secondary Floating Island (Higher Left) */}
        <g transform="translate(360, 210) scale(0.65)">
          <polygon points="40,110 140,110 170,130 140,190 90,220 30,160 10,130" fill="url(#islandRock)" />
          <polygon points="40,110 10,130 40,145 140,145 170,130 140,110" fill="#10b981" />
          <g transform="translate(70, 70)">
            <polygon points="15,0 30,10 30,45 15,35" fill="#38bdf8" />
            <polygon points="15,0 0,10 0,45 15,35" fill="#0369a1" />
          </g>
        </g>

        {/* Small floating crystal boulders */}
        <polygon points="340,310 350,300 360,315 350,325 338,318" fill="#ec4899" opacity="0.8" />
        <polygon points="690,260 705,250 715,268 700,280 688,270" fill="#38bdf8" opacity="0.8" />
        <polygon points="430,140 440,130 448,145 438,155" fill="#f59e0b" opacity="0.7" />

        {/* Forefront Stone Path / Cliff Edge where the character stands */}
        <g transform="translate(0, 360)">
          <path
            d="M 0,160 L 260,110 L 460,170 L 480,240 L 0,240 Z"
            fill="#1e1b4b"
          />
          <path
            d="M 260,110 L 460,170 L 430,240 L 200,240 Z"
            fill="#2e1065"
            opacity="0.85"
          />
          {/* Edge highlights */}
          <path
            d="M 0,160 L 260,110 L 460,170"
            stroke="#f43f5e"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* Young Adult Avatar with Backpack and Headphones (Seen from back/side looking forward) */}
        <g transform="translate(230, 240)">
          {/* Subtle Ambient Rim Glow Behind Character */}
          <circle cx="70" cy="110" r="90" fill="#f43f5e" opacity="0.2" filter="url(#softGlow)" />

          {/* Lower Body / Legs */}
          <path d="M 45 220 L 58 310 L 72 310 L 64 220 Z" fill="#1e293b" />
          <path d="M 75 220 L 85 305 L 98 305 L 92 220 Z" fill="#0f172a" />

          {/* Torso / Pink Hoodie */}
          <path
            d="M 30,110 C 35,90 95,85 110,110 L 120,220 C 100,230 40,230 25,220 Z"
            fill="url(#pinkHoodie)"
          />

          {/* Hoodie Details & Folds */}
          <path
            d="M 50,115 C 65,130 80,130 95,115"
            stroke="#be185d"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 70,125 L 70,180"
            stroke="#fda4af"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 75,125 L 75,175"
            stroke="#fda4af"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Backpack on Back */}
          <rect
            x="48"
            y="115"
            width="55"
            height="70"
            rx="14"
            fill="#090d16"
            stroke="#334155"
            strokeWidth="2"
          />
          {/* Backpack Pocket & Straps */}
          <rect x="55" y="145" width="40" height="32" rx="6" fill="#1e293b" />
          <path d="M 55,160 L 95,160" stroke="#f43f5e" strokeWidth="2" />
          <circle cx="75" cy="152" r="3" fill="#cbd5e1" />

          {/* Left Arm (relaxed, slightly forward) */}
          <path
            d="M 30,115 C 18,140 18,180 28,210"
            stroke="url(#pinkHoodie)"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="28" cy="215" r="7" fill="#fed7aa" />

          {/* Head & Hair */}
          {/* Neck */}
          <rect x="65" y="70" width="16" height="20" fill="#fed7aa" />

          {/* Hair Bun / Ponytail & Flowing Hair */}
          <ellipse cx="72" cy="55" rx="22" ry="24" fill="#3b1d11" />
          <ellipse cx="88" cy="40" rx="14" ry="14" fill="#2d140a" />
          {/* Ponytail strands */}
          <path
            d="M 94,45 C 110,60 115,85 105,100"
            stroke="#2d140a"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />

          {/* Headphones */}
          {/* Band */}
          <path
            d="M 52,50 C 52,28 92,28 92,50"
            stroke="#38bdf8"
            strokeWidth="4"
            fill="none"
            filter="url(#glowLight)"
          />
          {/* Earcups */}
          <rect x="48" y="46" width="8" height="15" rx="4" fill="#0284c7" />
          <rect x="88" y="46" width="8" height="15" rx="4" fill="#38bdf8" />
        </g>

        {/* Ambient floating magic dust & sparks */}
        <circle cx="380" cy="280" r="2.5" fill="#fef08a" opacity="0.8" />
        <circle cx="420" cy="240" r="1.5" fill="#ffffff" opacity="0.9" />
        <circle cx="490" cy="310" r="3" fill="#f472b6" opacity="0.7" />
        <circle cx="610" cy="220" r="2" fill="#38bdf8" opacity="0.8" />
        <circle cx="310" cy="210" r="1.5" fill="#fef08a" opacity="0.8" />
        <circle cx="250" cy="180" r="2" fill="#ffffff" opacity="0.6" />
      </svg>

      {/* Floating Pill Overlay Matching Reference exactly: ₹10,000 / 30 Days */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-[#121936]/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-xl shadow-pink-500/10 text-center animate-bounce-subtle">
        <div className="text-xl md:text-2xl font-bold font-display text-white tracking-tight flex items-center justify-center gap-1.5">
          <span className="text-pink-400">₹</span>10,000
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-300 font-medium mt-0.5">
          30 Days
        </div>
      </div>
    </div>
  );
};
