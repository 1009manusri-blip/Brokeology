import React, { useEffect, useRef } from 'react';

interface Props {
  blendWith3D?: boolean;
}

export const CinematicHeroScene: React.FC<Props> = ({ blendWith3D = true }) => {
  const cloudsDeepRef = useRef<SVGGElement>(null);
  const cloudsForeRef = useRef<SVGGElement>(null);
  const island1Ref = useRef<SVGGElement>(null);
  const island2Ref = useRef<SVGGElement>(null);
  const crystal1Ref = useRef<SVGGElement>(null);
  const crystal2Ref = useRef<SVGGElement>(null);
  const crystal3Ref = useRef<SVGGElement>(null);
  const metropolisRef = useRef<SVGGElement>(null);
  const cliffRef = useRef<SVGGElement>(null);
  const avatarRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Only enable pointer parallax on fine pointer devices (desktop/mouse)
    const isPointerFine = window.matchMedia('(pointer: fine)').matches;
    if (!isPointerFine) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let isAnimating = false;

    const updateTransforms = (x: number, y: number) => {
      if (cloudsDeepRef.current) cloudsDeepRef.current.setAttribute('transform', `translate(${x * -0.4}, ${y * -0.3})`);
      if (cloudsForeRef.current) cloudsForeRef.current.setAttribute('transform', `translate(${x * 0.7}, ${y * 0.5})`);
      if (island1Ref.current) island1Ref.current.setAttribute('transform', `translate(${380 + x * 0.6}, ${340 + y * 0.4}) scale(0.65)`);
      if (island2Ref.current) island2Ref.current.setAttribute('transform', `translate(${740 + x * 0.8}, ${250 + y * 0.6}) scale(0.75)`);
      if (crystal1Ref.current) crystal1Ref.current.setAttribute('transform', `translate(${890 + x * 0.9}, ${460 + y * 0.7})`);
      if (crystal2Ref.current) crystal2Ref.current.setAttribute('transform', `translate(${1440 + x * 0.7}, ${390 + y * 0.5})`);
      if (crystal3Ref.current) crystal3Ref.current.setAttribute('transform', `translate(${220 + x * 0.6}, ${370 + y * 0.4})`);
      if (metropolisRef.current) metropolisRef.current.setAttribute('transform', `translate(${1020 + x * 1.1}, ${240 + y * 0.9})`);
      if (cliffRef.current) cliffRef.current.setAttribute('transform', `translate(${680 + x * -0.5}, ${580 + y * -0.3})`);
      if (avatarRef.current) avatarRef.current.setAttribute('transform', `translate(${860 + x * -0.5}, ${460 + y * -0.3})`);
    };

    const animate = () => {
      // Damped spring interpolation for smooth parallax
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      const x = Math.round(currentX * 6 * 100) / 100;
      const y = Math.round(currentY * 4 * 100) / 100;
      updateTransforms(x, y);

      // Stop RAF when motion settles to save 100% of CPU cycles
      if (Math.abs(targetX - currentX) < 0.002 && Math.abs(targetY - currentY) < 0.002) {
        isAnimating = false;
        rafId = null;
      } else {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <svg
        viewBox="0 0 1600 1000"
        className="w-full h-full object-cover transition-opacity duration-700"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Rich 7-Stop Sunset Sky Gradient */}
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0518" />
            <stop offset="22%" stopColor="#1a0b36" />
            <stop offset="44%" stopColor="#45114f" />
            <stop offset="65%" stopColor="#871f65" />
            <stop offset="82%" stopColor="#cf3474" />
            <stop offset="93%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>

          {/* Luminous Sunset Cloud Gradients */}
          <linearGradient id="cloudSunset1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.88" />
            <stop offset="35%" stopColor="#f43f5e" stopOpacity="0.75" />
            <stop offset="75%" stopColor="#86198f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cloudSunset2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fed7aa" stopOpacity="0.92" />
            <stop offset="45%" stopColor="#fb7185" stopOpacity="0.78" />
            <stop offset="85%" stopColor="#701a75" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#2e1065" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cloudSunset3" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#db2777" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#581c87" stopOpacity="0.1" />
          </linearGradient>

          {/* Horizon Glow Gradient */}
          <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0" />
            <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.35" />
            <stop offset="85%" stopColor="#fbbf24" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0.7" />
          </linearGradient>

          {/* Island Rock Face */}
          <linearGradient id="islandRockFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="85%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Island Plateau */}
          <linearGradient id="grassPlateau" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="pinkHoodieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="45%" stopColor="#ec4899" />
            <stop offset="80%" stopColor="#be185d" />
            <stop offset="100%" stopColor="#831843" />
          </linearGradient>

          {/* Sun Corona Radial Bloom */}
          <radialGradient id="sunBloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#fb923c" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#f43f5e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#831843" stopOpacity="0" />
          </radialGradient>

          {/* Soft Atmospheric Blur Filters */}
          <filter id="bloomFilter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="30" />
          </filter>
          <filter id="softGlow10" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Base Sky Background (Stationary) */}
        <rect width="1600" height="1000" fill="url(#skyGrad)" />

        {/* 2. Twinkling Starlight in Deep Upper Cosmic Sky */}
        {[
          [120, 80, 1.2, 0.7],
          [240, 140, 1.5, 0.9],
          [380, 60, 1.0, 0.6],
          [510, 120, 1.4, 0.85],
          [690, 70, 1.8, 0.9],
          [820, 130, 1.2, 0.75],
          [950, 50, 1.5, 0.8],
          [1100, 95, 1.3, 0.7],
          [1280, 65, 1.6, 0.85],
          [1420, 110, 1.1, 0.6],
          [1540, 75, 1.4, 0.8],
          [310, 180, 1.0, 0.5],
          [740, 170, 1.2, 0.6],
          [1190, 160, 1.1, 0.55],
          [1490, 170, 1.3, 0.65],
        ].map(([cx, cy, r, op], i) => (
          <circle key={`star-${i}`} cx={cx} cy={cy} r={r} fill="#ffffff" opacity={op} />
        ))}

        {/* 3. Radiant Sunset Sun & Glowing Corona on Horizon */}
        <circle cx="1140" cy="740" r="460" fill="url(#sunBloom)" filter="url(#bloomFilter)" />
        <circle cx="1140" cy="740" r="160" fill="#fef08a" opacity="0.5" filter="url(#bloomFilter)" />
        <circle cx="1140" cy="740" r="80" fill="#ffffff" opacity="0.8" filter="url(#softGlow10)" />

        {/* Glowing Atmospheric Horizon Band */}
        <rect x="0" y="650" width="1600" height="350" fill="url(#horizonGlow)" />

        {/* 4. Deep Background Clouds with Slow Parallax Layer (moves ~0.35x) */}
        <g
          ref={cloudsDeepRef}
          transform="translate(0, 0)"
          className="transition-transform duration-75 ease-out"
          opacity="0.82"
        >
          {/* Billowing clouds across entire horizon (both left & right) */}
          <ellipse cx="1440" cy="840" rx="380" ry="150" fill="url(#cloudSunset2)" />
          <ellipse cx="1060" cy="850" rx="340" ry="130" fill="url(#cloudSunset2)" />
          <ellipse cx="680" cy="870" rx="400" ry="140" fill="url(#cloudSunset1)" />
          <ellipse cx="260" cy="880" rx="360" ry="130" fill="url(#cloudSunset2)" />
          <ellipse cx="-40" cy="840" rx="320" ry="140" fill="url(#cloudSunset1)" />

          {/* Mid-altitude clouds */}
          <ellipse cx="1320" cy="620" rx="280" ry="105" fill="url(#cloudSunset1)" />
          <ellipse cx="1560" cy="530" rx="240" ry="90" fill="url(#cloudSunset1)" />
          <ellipse cx="980" cy="570" rx="260" ry="95" fill="url(#cloudSunset3)" />
          <ellipse cx="740" cy="480" rx="240" ry="85" fill="url(#cloudSunset1)" />
          <ellipse cx="420" cy="540" rx="280" ry="95" fill="url(#cloudSunset2)" />
          <ellipse cx="160" cy="590" rx="240" ry="85" fill="url(#cloudSunset1)" />
        </g>

        {/* 5. Forefront Clouds with Medium Parallax Layer (moves ~0.7x) */}
        <g
          ref={cloudsForeRef}
          transform="translate(0, 0)"
          className="transition-transform duration-75 ease-out"
          opacity="0.75"
        >
          <ellipse cx="880" cy="940" rx="420" ry="110" fill="url(#cloudSunset2)" />
          <ellipse cx="1380" cy="910" rx="340" ry="100" fill="url(#cloudSunset1)" />
          <ellipse cx="380" cy="930" rx="380" ry="105" fill="url(#cloudSunset2)" />
          <ellipse cx="1180" cy="760" rx="280" ry="75" fill="url(#cloudSunset3)" />
          <ellipse cx="560" cy="740" rx="260" ry="70" fill="url(#cloudSunset1)" />
        </g>

        {/* 6. Distant Silhouette Floating Island 1 (Left background) */}
        <g
          ref={island1Ref}
          transform="translate(380, 340) scale(0.65)"
          className="transition-transform duration-75 ease-out"
          opacity="0.7"
        >
          <polygon points="50,120 180,120 230,150 190,240 120,300 40,210 10,150" fill="url(#islandRockFace)" />
          <polygon points="50,120 10,150 60,170 180,170 230,150 180,120" fill="url(#grassPlateau)" />
          <polygon points="110,40 130,55 130,120 110,105" fill="#38bdf8" />
          <polygon points="110,40 90,55 90,120 110,105" fill="#0284c7" />
          <line x1="110" y1="40" x2="110" y2="10" stroke="#fbcfe8" strokeWidth="2" />
          <circle cx="110" cy="8" r="3" fill="#f43f5e" filter="url(#softGlow10)" />
        </g>

        {/* 7. Distant Silhouette Midground Island 2 (Center-upper horizon) */}
        <g
          ref={island2Ref}
          transform="translate(740, 250) scale(0.75)"
          className="transition-transform duration-75 ease-out"
          opacity="0.8"
        >
          <polygon points="60,130 200,130 250,165 200,280 120,340 40,240 10,165" fill="url(#islandRockFace)" />
          <polygon points="60,130 10,165 60,185 200,185 250,165 200,130" fill="url(#grassPlateau)" />
          <g transform="translate(100, 70)">
            <polygon points="20,0 45,15 45,70 20,55" fill="#f43f5e" />
            <polygon points="20,0 -5,15 -5,70 20,55" fill="#9f1239" />
            <polygon points="20,0 -5,15 20,30 45,15" fill="#fbcfe8" />
            <rect x="25" y="25" width="8" height="12" fill="#fef08a" />
          </g>
          <g transform="translate(160, 40)">
            <polygon points="15,0 30,12 30,100 15,85" fill="#38bdf8" />
            <polygon points="15,0 0,12 0,100 15,85" fill="#0369a1" />
            <line x1="20" y1="30" x2="28" y2="35" stroke="#fef08a" strokeWidth="2" />
            <line x1="20" y1="50" x2="28" y2="55" stroke="#fef08a" strokeWidth="2" />
          </g>
          <circle cx="80" cy="155" r="14" fill="#059669" />
          <circle cx="170" cy="160" r="16" fill="#10b981" />
        </g>

        {/* 8. Hovering Sunset Crystals with Soft Magical Glow */}
        <g ref={crystal1Ref} transform="translate(890, 460)" filter="url(#softGlow10)">
          <polygon points="15,0 30,20 20,40 5,30 0,15" fill="#f43f5e" />
          <polygon points="15,0 20,40 5,30" fill="#ec4899" />
        </g>
        <g ref={crystal2Ref} transform="translate(1440, 390)" filter="url(#softGlow10)">
          <polygon points="20,0 40,25 25,50 10,35 0,20" fill="#38bdf8" />
        </g>
        <g ref={crystal3Ref} transform="translate(220, 370)" filter="url(#softGlow10)">
          <polygon points="12,0 24,16 16,32 4,24 0,12" fill="#fb923c" />
        </g>

        {/* 9. Floating Ambient Magical Dust & Sparks */}
        {[
          [280, 480, 2, '#fed7aa', 0.8],
          [340, 420, 2.5, '#f472b6', 0.7],
          [450, 520, 1.8, '#fef08a', 0.85],
          [580, 460, 2.2, '#fed7aa', 0.75],
          [720, 390, 1.5, '#ffffff', 0.9],
          [890, 440, 2.8, '#f472b6', 0.7],
          [1040, 360, 2.0, '#fed7aa', 0.8],
          [1210, 480, 2.4, '#fef08a', 0.85],
          [1350, 430, 1.6, '#ffffff', 0.7],
          [1480, 490, 2.2, '#f472b6', 0.75],
        ].map(([cx, cy, r, col, op], i) => (
          <circle
            key={`spark-${i}`}
            cx={cx as number}
            cy={cy as number}
            r={r as number}
            fill={col as string}
            opacity={op as number}
            filter="url(#softGlow10)"
          />
        ))}

        {/* Standalone 2D Hero Artwork (Rendered only when not blending with interactive 3D WebGL city) */}
        {!blendWith3D && (
          <>
            {/* Main Floating Metropolis */}
            <g
              ref={metropolisRef}
              transform="translate(1020, 240)"
              className="transition-transform duration-75 ease-out"
            >
              <polygon
                points="80,260 360,260 440,310 370,520 220,620 90,480 20,310"
                fill="url(#islandRockFace)"
              />
              <polygon points="80,260 220,620 370,520" fill="#0f172a" opacity="0.75" />
              <polygon points="80,260 220,620 90,480" fill="#1e293b" opacity="0.6" />
              <path d="M 220,620 L 210,500 L 250,420 L 240,330" stroke="#f43f5e" strokeWidth="2" opacity="0.4" />
              <path d="M 160,530 L 175,440 L 150,360" stroke="#fb923c" strokeWidth="2" opacity="0.3" />

              {/* Plateau */}
              <polygon
                points="80,260 20,310 90,345 370,345 440,310 360,260"
                fill="url(#grassPlateau)"
              />
              <polygon points="90,345 370,345 350,365 110,365" fill="#047857" />

              {/* Skyscraper 1 */}
              <g transform="translate(200, 80)">
                <polygon points="35,0 75,25 75,190 35,160" fill="#38bdf8" />
                <polygon points="35,0 -5,25 -5,190 35,160" fill="#0284c7" />
                <polygon points="35,0 -5,25 35,45 75,25" fill="#bae6fd" />
                {[45, 65, 85, 105, 125, 145].map((y) => (
                  <g key={y}>
                    <line x1="42" y1={y} x2="68" y2={y + 16} stroke="#fef08a" strokeWidth="3" strokeDasharray="5 3" />
                    <line x1="2" y1={y + 16} x2="28" y2={y} stroke="#fef08a" strokeWidth="3" strokeDasharray="5 3" />
                  </g>
                ))}
                <line x1="35" y1="0" x2="35" y2="-40" stroke="#bae6fd" strokeWidth="3" />
                <circle cx="35" cy="-42" r="4" fill="#f43f5e" filter="url(#softGlow10)" />
              </g>

              {/* Skyscraper 2 */}
              <g transform="translate(130, 150)">
                <polygon points="30,0 60,18 60,130 30,110" fill="#f43f5e" />
                <polygon points="30,0 0,18 0,130 30,110" fill="#be123c" />
                <polygon points="30,0 0,18 30,34 60,18" fill="#fbcfe8" />
                <rect x="10" y="40" width="10" height="15" fill="#fef08a" />
                <rect x="10" y="65" width="10" height="15" fill="#fef08a" />
                <rect x="38" y="45" width="14" height="20" fill="#fef08a" />
                <rect x="38" y="75" width="14" height="20" fill="#fef08a" />
              </g>

              {/* Skyscraper 3 */}
              <g transform="translate(290, 130)">
                <polygon points="25,0 55,16 55,145 25,125" fill="#a855f7" />
                <polygon points="25,0 -5,16 -5,145 25,125" fill="#7e22ce" />
                <polygon points="25,0 -5,16 25,30 55,16" fill="#e9d5ff" />
                {[40, 65, 90, 115].map((y) => (
                  <line key={y} x1="32" y1={y} x2="48" y2={y + 10} stroke="#fef08a" strokeWidth="2.5" />
                ))}
              </g>

              {/* Houses */}
              <g transform="translate(80, 230)">
                <polygon points="25,0 50,15 50,60 25,45" fill="#fb923c" />
                <polygon points="25,0 0,15 0,60 25,45" fill="#c2410c" />
                <polygon points="25,0 0,15 25,28 50,15" fill="#fed7aa" />
                <rect x="8" y="24" width="8" height="10" fill="#fef08a" />
              </g>
              <g transform="translate(240, 240)">
                <polygon points="25,0 50,15 50,65 25,50" fill="#06b6d4" />
                <polygon points="25,0 0,15 0,65 25,50" fill="#0e7490" />
                <polygon points="25,0 0,15 25,28 50,15" fill="#a5f3fc" />
              </g>

              {/* Foliage */}
              <circle cx="70" cy="285" r="16" fill="#10b981" />
              <circle cx="170" cy="305" r="20" fill="#059669" />
              <circle cx="195" cy="315" r="15" fill="#34d399" />
              <circle cx="340" cy="310" r="18" fill="#10b981" />
              <circle cx="370" cy="320" r="14" fill="#059669" />

              {/* Suspension Bridge */}
              <path d="M 20 310 Q -40 330 -110 320" stroke="#f59e0b" strokeWidth="3" fill="none" />
              <path d="M 20 325 Q -40 345 -110 335" stroke="#f59e0b" strokeWidth="2" fill="none" />
              <line x1="-20" y1="318" x2="-20" y2="333" stroke="#fed7aa" strokeWidth="1" />
              <line x1="-60" y1="324" x2="-60" y2="339" stroke="#fed7aa" strokeWidth="1" />
            </g>

            {/* Foreground Cliff Terrace */}
            <g
              ref={cliffRef}
              transform="translate(680, 580)"
              className="transition-transform duration-75 ease-out"
            >
              <path d="M 0,260 L 260,180 L 520,240 L 580,420 L 0,420 Z" fill="#120e2e" />
              <path d="M 260,180 L 520,240 L 480,420 L 200,420 Z" fill="#1d1245" opacity="0.9" />
              <path d="M 0,260 L 260,180 L 520,240" stroke="#f43f5e" strokeWidth="4" fill="none" opacity="0.8" />
              <path d="M 260,180 L 520,240" stroke="#fde047" strokeWidth="2" fill="none" opacity="0.9" />
            </g>

            {/* Protagonist Avatar */}
            <g
              ref={avatarRef}
              transform="translate(860, 460)"
              className="transition-transform duration-75 ease-out"
            >
              <circle cx="95" cy="160" r="130" fill="#f43f5e" opacity="0.25" filter="url(#bloomFilter)" />
              {/* Pants/boots */}
              <path d="M 68 290 L 82 430 L 102 430 L 92 290 Z" fill="#0f172a" />
              <path d="M 106 290 L 118 425 L 138 425 L 128 290 Z" fill="#090d16" />
              <rect x="78" y="420" width="26" height="15" rx="5" fill="#1e293b" />
              <rect x="114" y="415" width="26" height="15" rx="5" fill="#1e293b" />

              {/* Pink Hoodie */}
              <path
                d="M 45,140 C 55,115 135,110 155,140 L 165,290 C 140,305 60,305 40,290 Z"
                fill="url(#pinkHoodieGrad)"
              />
              <path d="M 70,145 C 90,165 110,165 130,145" stroke="#9d174d" strokeWidth="4" fill="none" />
              <path d="M 98,155 L 98,225" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 106,155 L 106,220" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 152,145 Q 162,210 160,285" stroke="#fed7aa" strokeWidth="2.5" fill="none" opacity="0.8" />

              {/* Backpack */}
              <rect x="68" y="145" width="74" height="95" rx="18" fill="#090d16" stroke="#334155" strokeWidth="2.5" />
              <rect x="78" y="185" width="54" height="42" rx="8" fill="#1e293b" />
              <line x1="84" y1="185" x2="126" y2="185" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="84" y1="150" x2="84" y2="235" stroke="#f43f5e" strokeWidth="2.5" />
              <line x1="126" y1="150" x2="126" y2="235" stroke="#f43f5e" strokeWidth="2.5" />
              <rect x="80" y="200" width="8" height="6" fill="#e2e8f0" rx="1" />
              <rect x="122" y="200" width="8" height="6" fill="#e2e8f0" rx="1" />

              {/* Arms */}
              <path
                d="M 46,145 C 30,180 30,230 44,270"
                stroke="url(#pinkHoodieGrad)"
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="44" cy="275" r="9" fill="#fed7aa" />

              {/* Head & Hair */}
              <rect x="92" y="90" width="20" height="25" fill="#fed7aa" />
              <ellipse cx="102" cy="72" rx="28" ry="30" fill="#381c10" />
              <ellipse cx="122" cy="52" rx="18" ry="18" fill="#291208" />
              <path d="M 128,60 C 146,80 152,110 138,135" stroke="#291208" strokeWidth="10" strokeLinecap="round" fill="none" />

              {/* Cyan Headphones */}
              <path d="M 76,68 C 76,38 126,38 126,68" stroke="#38bdf8" strokeWidth="5" fill="none" filter="url(#softGlow10)" />
              <rect x="72" y="62" width="10" height="20" rx="5" fill="#0284c7" />
              <rect x="122" y="62" width="10" height="20" rx="5" fill="#38bdf8" filter="url(#softGlow10)" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
