import React from 'react';

interface Props {
  interactive?: boolean;
  onSelectLocation?: (locationName: 'College' | 'Home' | 'Market' | 'Cafe' | 'Bank') => void;
  selectedLocation?: string | null;
  showSpeechBubble?: boolean;
}

export const IsometricWorldIllustration: React.FC<Props> = ({
  interactive = false,
  onSelectLocation,
  selectedLocation,
  showSpeechBubble = true,
}) => {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-gradient-to-b from-[#141b38] via-[#0f152d] to-[#090d1f] border border-white/15 shadow-2xl group select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-pink-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <svg
        viewBox="0 0 900 620"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="grassGradIso" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="40%" stopColor="#22c55e" />
            <stop offset="85%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>

          <linearGradient id="pathCobble" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="rockUnderIsland" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="45%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d1a" />
          </linearGradient>

          <linearGradient id="buildingCampus" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          <linearGradient id="roofCollegeBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          <linearGradient id="pinkCharacter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#9d174d" />
          </linearGradient>

          {/* Filters */}
          <filter id="softGlowBuilding" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Warm Golden Sunlight Ray */}
        <ellipse cx="450" cy="200" rx="400" ry="220" fill="#fde047" opacity="0.06" />

        {/* Floating Island Diorama Base */}
        <g transform="translate(450, 310)">
          {/* Island Depth / Underside Geological Crags */}
          <polygon
            points="0,210 390,0 390,75 0,285 -390,75 -390,0"
            fill="url(#rockUnderIsland)"
          />
          <polygon points="0,210 0,285 390,75 390,0" fill="#1e293b" opacity="0.85" />
          <polygon points="0,210 -390,0 -390,75 0,285" fill="#0f172a" />
          {/* Rock strata seams */}
          <path d="M -220,50 L 0,250 L 220,50" stroke="#f43f5e" strokeWidth="2" opacity="0.3" fill="none" />
          <path d="M -150,75 L 0,270 L 150,75" stroke="#f59e0b" strokeWidth="1.5" opacity="0.25" fill="none" />

          {/* Grass Top Surface (Isometric Diamond) */}
          <polygon
            points="0,-210 380,0 0,210 -380,0"
            fill="url(#grassGradIso)"
          />

          {/* Cobblestone Isometric Roads & Paths */}
          {/* Main Diagonal Highway (Bottom-left to Top-right) */}
          <polygon
            points="0,210 -50,180 0,40 50,70"
            fill="url(#pathCobble)"
          />
          {/* Branch toward College Hall (Top) */}
          <polygon
            points="0,40 160,-50 210,-20 50,70"
            fill="url(#pathCobble)"
          />
          {/* Branch toward Cafe/Market (Left) */}
          <polygon
            points="0,40 -190,-60 -150,-85 30,20"
            fill="url(#pathCobble)"
          />
          {/* Branch toward Bank (Right) */}
          <polygon
            points="50,70 230, -20 270,5 90,95"
            fill="url(#pathCobble)"
          />

          {/* Central Campus Plaza Roundabout */}
          <ellipse cx="0" cy="50" rx="55" ry="28" fill="#e2e8f0" />
          <ellipse cx="0" cy="50" rx="36" ry="18" fill="#38bdf8" opacity="0.75" />
          {/* Water Fountain Feature */}
          <ellipse cx="0" cy="48" rx="14" ry="7" fill="#67e8f9" />
          <rect x="-3" y="32" width="6" height="16" fill="#f8fafc" />
          <ellipse cx="0" cy="32" rx="9" ry="4.5" fill="#bae6fd" />
          <line x1="0" y1="32" x2="0" y2="22" stroke="#ffffff" strokeWidth="2" strokeDasharray="2 2" />

          {/* 1. COLLEGE HALL (Center / Top-Right) */}
          <g
            className={interactive ? 'cursor-pointer transition-transform hover:scale-105' : ''}
            onClick={() => onSelectLocation && onSelectLocation('College')}
            transform="translate(20, -130)"
          >
            {/* Building Shadow on Grass */}
            <polygon points="-80,60 110,60 140,80 -50,80" fill="#0f172a" opacity="0.4" />

            {/* Left Wall */}
            <polygon points="-60,0 0,30 0,100 -60,70" fill="url(#buildingCampus)" />
            {/* Right Wall */}
            <polygon points="0,30 85,-15 85,55 0,100" fill="#ea580c" />
            {/* Slanted Roof */}
            <polygon points="-60,0 0,30 15,-25 -45,-55" fill="#0284c7" />
            <polygon points="0,30 85,-15 100,-70 15,-25" fill="url(#roofCollegeBlue)" />

            {/* Classical Columns */}
            {[-25, -10, 5, 20, 35].map((x) => (
              <rect key={x} x={x} y={48 - x * 0.15} width="6" height="42" fill="#ffffff" rx="1" />
            ))}

            {/* Glowing Golden Windows */}
            <rect x="-48" y="20" width="14" height="20" rx="2" fill="#fef08a" />
            <rect x="-48" y="48" width="14" height="20" rx="2" fill="#fef08a" />
            <rect x="55" y="5" width="16" height="22" rx="2" fill="#fef08a" />
            <rect x="55" y="35" width="16" height="22" rx="2" fill="#fef08a" />

            {/* University Crest / Clock */}
            <circle cx="15" cy="-2" r="11" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2.5" />
            <line x1="15" y1="-2" x2="15" y2="-7" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
            <line x1="15" y1="-2" x2="20" y2="-2" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* 2. CAFE (Center-Left) */}
          <g
            className={interactive ? 'cursor-pointer transition-transform hover:scale-105' : ''}
            onClick={() => onSelectLocation && onSelectLocation('Cafe')}
            transform="translate(-130, -20)"
          >
            {/* Cafe Building */}
            <polygon points="-50,0 0,25 0,70 -50,45" fill="#f43f5e" />
            <polygon points="0,25 55,-5 55,40 0,70" fill="#be123c" />
            {/* Striped Canopy Awning */}
            <polygon points="-55,-6 3,21 60,-10 3,-38" fill="#ec4899" />
            {/* Windows & Neon Sign */}
            <rect x="-38" y="18" width="22" height="24" rx="3" fill="#fef08a" />
            <rect x="12" y="16" width="28" height="22" rx="2" fill="#fef08a" />
            {/* Outdoor Cafe Parasol */}
            <g transform="translate(30, 60)">
              <circle cx="0" cy="0" r="12" fill="#fb7185" />
              <rect x="-2" y="0" width="4" height="12" fill="#475569" />
            </g>
          </g>

          {/* 3. MARKET (Far Left) */}
          <g
            className={interactive ? 'cursor-pointer transition-transform hover:scale-105' : ''}
            onClick={() => onSelectLocation && onSelectLocation('Market')}
            transform="translate(-230, -100)"
          >
            <polygon points="-40,0 0,20 0,55 -40,35" fill="#8b5cf6" />
            <polygon points="0,20 40,0 40,35 0,55" fill="#6d28d9" />
            <polygon points="-44,-5 3,18 45,-5 0,-27" fill="#a855f7" />
            <rect x="-28" y="15" width="16" height="18" rx="2" fill="#fed7aa" />
            <rect x="10" y="10" width="18" height="16" rx="2" fill="#fed7aa" />
          </g>

          {/* 4. HOME (Top Right) */}
          <g
            className={interactive ? 'cursor-pointer transition-transform hover:scale-105' : ''}
            onClick={() => onSelectLocation && onSelectLocation('Home')}
            transform="translate(200, -110)"
          >
            <polygon points="-35,0 0,18 0,55 -35,37" fill="#06b6d4" />
            <polygon points="0,18 40,-4 40,33 0,55" fill="#0891b2" />
            <polygon points="-38,-10 3,12 45,-10 4,-32" fill="#f43f5e" />
            <rect x="18" y="-28" width="8" height="16" fill="#94a3b8" />
            <rect x="-25" y="12" width="14" height="15" rx="2" fill="#fef08a" />
          </g>

          {/* 5. BANK (Bottom Right) */}
          <g
            className={interactive ? 'cursor-pointer transition-transform hover:scale-105' : ''}
            onClick={() => onSelectLocation && onSelectLocation('Bank')}
            transform="translate(190, 35)"
          >
            <polygon points="-45,0 0,22 0,65 -45,43" fill="#e0e7ff" />
            <polygon points="0,22 45,0 45,43 0,65" fill="#818cf8" />
            <polygon points="-48,-8 2,18 48,-6 0,-32" fill="#4f46e5" />
            {/* Golden Vault Coin Symbol */}
            <circle cx="-20" cy="22" r="10" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <text x="-24" y="26" fill="#78350f" fontSize="12" fontWeight="bold">₹</text>
          </g>

          {/* Lush Isometric Trees on the island */}
          {/* Tree Cluster Left */}
          <g transform="translate(-100, 95)">
            <ellipse cx="0" cy="14" rx="14" ry="7" fill="#0f172a" opacity="0.3" />
            <rect x="-3" y="-5" width="6" height="20" fill="#78350f" />
            <circle cx="0" cy="-15" r="18" fill="#22c55e" />
            <circle cx="-7" cy="-20" r="12" fill="#4ade80" />
            <circle cx="6" cy="-24" r="14" fill="#86efac" />
          </g>
          {/* Tree Cluster Right */}
          <g transform="translate(110, -35)">
            <ellipse cx="0" cy="12" rx="12" ry="6" fill="#0f172a" opacity="0.3" />
            <rect x="-3" y="-4" width="6" height="18" fill="#78350f" />
            <circle cx="0" cy="-14" r="16" fill="#16a34a" />
            <circle cx="5" cy="-20" r="12" fill="#4ade80" />
          </g>
          {/* Tree Cluster Top */}
          <g transform="translate(-150, -140)">
            <circle cx="0" cy="-10" r="14" fill="#15803d" />
            <circle cx="-4" cy="-15" r="10" fill="#22c55e" />
          </g>

          {/* Student Protagonist on the Cobblestone Road (Walking towards College) */}
          <g transform="translate(15, 95) scale(0.75)">
            {/* Feet / Shoes */}
            <ellipse cx="-5" cy="45" rx="5" ry="2.5" fill="#0f172a" />
            <ellipse cx="9" cy="45" rx="5" ry="2.5" fill="#0f172a" />
            {/* Jeans */}
            <rect x="-7" y="24" width="7" height="22" fill="#1e293b" />
            <rect x="5" y="24" width="7" height="22" fill="#1e293b" />
            {/* Pink Hoodie */}
            <ellipse cx="3" cy="12" rx="16" ry="18" fill="url(#pinkCharacter)" />
            {/* Black Backpack */}
            <rect x="-8" y="2" width="22" height="22" rx="5" fill="#090d16" stroke="#475569" strokeWidth="1.5" />
            {/* Head & Hair */}
            <circle cx="3" cy="-8" r="10" fill="#fed7aa" />
            <circle cx="3" cy="-10" r="11" fill="#381c10" />
            {/* Cyan Headphones */}
            <path d="M -6,-11 C -6,-19 12,-19 12,-11" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
            <rect x="-8" y="-12" width="3" height="6" rx="1.5" fill="#0284c7" />
            <rect x="11" y="-12" width="3" height="6" rx="1.5" fill="#0284c7" />
          </g>
        </g>
      </svg>

      {/* Speech Bubble Overlay Matching Screen 2 */}
      {showSpeechBubble && (
        <div className="absolute top-[28%] right-6 md:right-14 max-w-xs glass-panel-glow p-4 rounded-2xl border border-pink-400/40 shadow-2xl text-left animate-float-gentle pointer-events-none">
          <p className="text-xs md:text-sm text-slate-100 font-semibold leading-snug">
            Visit the college cafe and decide — <span className="text-pink-400 font-bold">coffee</span> or{' '}
            <span className="text-cyan-300 font-bold">budget food</span>?
          </p>
          <div className="absolute -bottom-2 left-6 w-3.5 h-3.5 bg-[#161d3a] border-r border-b border-pink-400/40 rotate-45" />
        </div>
      )}

      {/* Interactive Location Hotspots for Screen 7 (Moneyverse) */}
      {interactive && (
        <>
          <button
            onClick={() => onSelectLocation && onSelectLocation('College')}
            className={`absolute top-[18%] left-[48%] -translate-x-1/2 px-4 py-1.5 rounded-full font-bold text-xs shadow-xl transition-all transform hover:scale-110 flex items-center gap-1.5 cursor-pointer ${
              selectedLocation === 'College'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/50 ring-2 ring-pink-300'
                : 'glass-pill text-cyan-200 border-cyan-400/40 hover:bg-cyan-500 hover:text-white'
            }`}
          >
            <span>College</span>
          </button>

          <button
            onClick={() => onSelectLocation && onSelectLocation('Home')}
            className={`absolute top-[24%] right-[16%] px-4 py-1.5 rounded-full font-bold text-xs shadow-xl transition-all transform hover:scale-110 flex items-center gap-1.5 cursor-pointer ${
              selectedLocation === 'Home'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/50 ring-2 ring-pink-300'
                : 'glass-pill text-slate-200 border-white/20 hover:bg-pink-500 hover:text-white'
            }`}
          >
            <span>Home</span>
          </button>

          <button
            onClick={() => onSelectLocation && onSelectLocation('Market')}
            className={`absolute top-[38%] left-[14%] px-4 py-1.5 rounded-full font-bold text-xs shadow-xl transition-all transform hover:scale-110 flex items-center gap-1.5 cursor-pointer ${
              selectedLocation === 'Market'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/50 ring-2 ring-pink-300'
                : 'glass-pill text-amber-200 border-amber-400/40 hover:bg-amber-500 hover:text-white'
            }`}
          >
            <span>Market</span>
          </button>

          <button
            onClick={() => onSelectLocation && onSelectLocation('Cafe')}
            className={`absolute top-[48%] left-[40%] px-4 py-1.5 rounded-full font-bold text-xs shadow-xl transition-all transform hover:scale-110 flex items-center gap-1.5 cursor-pointer ${
              selectedLocation === 'Cafe'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/50 ring-2 ring-pink-300'
                : 'glass-pill text-rose-200 border-rose-400/40 hover:bg-rose-500 hover:text-white'
            }`}
          >
            <span>Cafe</span>
          </button>

          <button
            onClick={() => onSelectLocation && onSelectLocation('Bank')}
            className={`absolute top-[54%] right-[20%] px-4 py-1.5 rounded-full font-bold text-xs shadow-xl transition-all transform hover:scale-110 flex items-center gap-1.5 cursor-pointer ${
              selectedLocation === 'Bank'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/50 ring-2 ring-pink-300'
                : 'glass-pill text-emerald-200 border-emerald-400/40 hover:bg-emerald-500 hover:text-white'
            }`}
          >
            <span>Bank</span>
          </button>
        </>
      )}
    </div>
  );
};
