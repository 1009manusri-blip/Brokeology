import React from 'react';

interface Props {
  type: 'coffee' | 'groceries' | 'movie' | 'shoes' | 'metro' | 'books';
  className?: string;
}

export const ProductIllustration: React.FC<Props> = ({ type, className = 'w-full h-40' }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#1b254b] via-[#141b38] to-[#0c1228] p-3 border border-white/10 shadow-inner group ${className}`}>
      {/* Background item pedestal glow */}
      <div className="absolute inset-0 bg-radial from-pink-500/10 via-transparent to-transparent pointer-events-none" />

      {type === 'coffee' && (
        <svg viewBox="0 0 220 170" className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]">
          <defs>
            <radialGradient id="coffeeFoam2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e9c49a" />
              <stop offset="65%" stopColor="#9c6644" />
              <stop offset="100%" stopColor="#582f0e" />
            </radialGradient>
            <linearGradient id="cupCeramic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="saucerWood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <filter id="steamGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Wooden Saucer */}
          <ellipse cx="110" cy="135" rx="80" ry="18" fill="url(#saucerWood)" stroke="#b45309" strokeWidth="1.5" />
          <ellipse cx="110" cy="132" rx="68" ry="14" fill="#fbbf24" opacity="0.4" />

          {/* Cup Shadow */}
          <ellipse cx="110" cy="125" rx="46" ry="12" fill="#0f172a" opacity="0.5" />

          {/* Cup Body */}
          <path d="M 68,62 L 78,118 C 78,130 142,130 142,118 L 152,62 Z" fill="url(#cupCeramic)" />
          {/* Specular Shine */}
          <path d="M 74,68 L 82,114" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.75" />

          {/* Cup Rim & Foam */}
          <ellipse cx="110" cy="62" rx="42" ry="14" fill="#cbd5e1" />
          <ellipse cx="110" cy="62" rx="38" ry="11.5" fill="url(#coffeeFoam2)" />

          {/* Heart Latte Art */}
          <path
            d="M 110,67 C 104,59 99,60 99,65 C 99,70 106,73 110,77 C 114,73 121,70 121,65 C 121,60 116,59 110,67 Z"
            fill="#fffbeb"
          />

          {/* Cup Handle */}
          <path
            d="M 146,70 C 170,72 170,102 144,108"
            stroke="url(#cupCeramic)"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />

          {/* Rising Steam */}
          <g filter="url(#steamGlow)">
            <path d="M 98,46 Q 90,30 100,16" stroke="#fbcfe8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d="M 116,42 Q 126,28 118,14" stroke="#fbcfe8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
          </g>

          {/* Roasted Coffee Beans */}
          <g transform="translate(42, 130)">
            <ellipse cx="8" cy="5" rx="8" ry="6" fill="#451a03" stroke="#78350f" strokeWidth="1" transform="rotate(-30 8 5)" />
            <path d="M 3,5 Q 8,8 13,5" stroke="#9a3412" strokeWidth="1.5" />
          </g>
          <g transform="translate(162, 128)">
            <ellipse cx="8" cy="5" rx="8" ry="6" fill="#451a03" stroke="#78350f" strokeWidth="1" transform="rotate(40 8 5)" />
            <path d="M 3,5 Q 8,8 13,5" stroke="#9a3412" strokeWidth="1.5" />
          </g>
        </svg>
      )}

      {type === 'groceries' && (
        <svg viewBox="0 0 220 170" className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="crateWood" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="redApple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="60%" stopColor="#e11d48" />
              <stop offset="100%" stopColor="#881337" />
            </linearGradient>
          </defs>

          {/* Wooden Fresh Produce Crate */}
          <rect x="52" y="70" width="116" height="75" rx="10" fill="url(#crateWood)" stroke="#78350f" strokeWidth="2" />
          <line x1="52" y1="95" x2="168" y2="95" stroke="#78350f" strokeWidth="3" />
          <line x1="52" y1="120" x2="168" y2="120" stroke="#78350f" strokeWidth="3" />

          {/* Crusty Baguette */}
          <rect
            x="68"
            y="18"
            width="22"
            height="85"
            rx="11"
            fill="#f59e0b"
            stroke="#b45309"
            strokeWidth="2"
            transform="rotate(-20 79 60)"
          />
          <line x1="72" y1="36" x2="82" y2="36" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-20 79 60)" />
          <line x1="72" y1="52" x2="82" y2="52" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-20 79 60)" />

          {/* Fresh Milk Bottle */}
          <rect x="122" y="32" width="30" height="60" rx="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          <polygon points="122,32 137,18 152,32" fill="#0284c7" />
          <rect x="128" y="46" width="18" height="24" fill="#ffffff" rx="3" />
          <text x="131" y="62" fill="#0284c7" fontSize="10" fontWeight="bold">MILK</text>

          {/* Crisp Salad Greens */}
          <path d="M 92,42 Q 100,12 114,28 Q 106,52 96,66" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
          <path d="M 104,38 Q 118,16 126,34 Q 114,58 104,70" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" />

          {/* Shiny Red Apple */}
          <circle cx="88" cy="84" r="18" fill="url(#redApple)" />
          <ellipse cx="85" cy="76" rx="5" ry="2.5" fill="#ffffff" opacity="0.6" />
          <path d="M 88,66 Q 92,58 96,62" stroke="#78350f" strokeWidth="2.5" fill="none" />
          <ellipse cx="96" cy="60" rx="5" ry="2.5" fill="#22c55e" />

          {/* Orange */}
          <circle cx="140" cy="88" r="16" fill="#fb923c" stroke="#ea580c" strokeWidth="2" />
        </svg>
      )}

      {type === 'movie' && (
        <svg viewBox="0 0 220 170" className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="ticketRed" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
            <linearGradient id="popcornStripes" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="75%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Cinema Popcorn Bucket */}
          <polygon points="68,68 152,68 140,145 80,145" fill="url(#popcornStripes)" stroke="#dc2626" strokeWidth="2" />
          <ellipse cx="110" cy="68" rx="42" ry="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />

          {/* Golden Buttery Popcorn Kernels */}
          {[-25, -15, 0, 15, 25, -8, 8].map((dx, i) => (
            <circle
              key={i}
              cx={110 + dx}
              cy={52 + (i % 2) * 6}
              r={11}
              fill="#fef08a"
              stroke="#facc15"
              strokeWidth="2"
            />
          ))}

          {/* Vintage Cinema Ticket Stub (Overlapping) */}
          <g transform="translate(122, 92) rotate(-18)">
            <rect x="0" y="0" width="75" height="38" rx="5" fill="url(#ticketRed)" stroke="#fbcfe8" strokeWidth="2" />
            <circle cx="0" cy="19" r="6" fill="#141b38" />
            <circle cx="75" cy="19" r="6" fill="#141b38" />
            <line x1="20" y1="5" x2="20" y2="33" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
            <text x="28" y="24" fill="#ffffff" fontSize="11" fontWeight="bold" letterSpacing="1">
              ADMIT 1
            </text>
          </g>
        </svg>
      )}

      {type === 'shoes' && (
        <svg viewBox="0 0 220 170" className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="sneakerUpper" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="sneakerSole" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>

          {/* Modern Pastel Designer Sneaker */}
          {/* Sole Cushion */}
          <path
            d="M 32,125 C 50,130 160,130 185,120 C 194,115 192,106 180,106 C 150,108 52,110 38,114 C 28,116 26,123 32,125 Z"
            fill="url(#sneakerSole)"
            stroke="#cbd5e1"
            strokeWidth="2"
          />

          {/* Upper Body */}
          <path
            d="M 38,114 C 45,92 72,86 92,80 C 115,74 135,54 158,58 C 170,60 175,80 180,106 C 150,108 52,110 38,114 Z"
            fill="url(#sneakerUpper)"
          />

          {/* Ankle Collar */}
          <ellipse cx="155" cy="60" rx="16" ry="9" fill="#1e1b4b" />

          {/* Crisp White Laces */}
          <path d="M 112,80 L 146,64" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <path d="M 106,90 L 138,74" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <path d="M 100,100 L 130,84" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

          {/* Iconic Curved Swoosh Stripe */}
          <path
            d="M 58,104 Q 110,98 162,72"
            stroke="#ffffff"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Neon Cyan Air Cushion Window */}
          <rect x="52" y="115" width="36" height="7" rx="3.5" fill="#38bdf8" opacity="0.9" />
        </svg>
      )}

      {type === 'metro' && (
        <svg viewBox="0 0 220 170" className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect x="35" y="40" width="150" height="95" rx="14" fill="url(#cardGrad)" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="75" cy="85" r="22" fill="#ffffff" opacity="0.15" />
          <rect x="135" y="55" width="35" height="12" rx="3" fill="#f8fafc" />
          <text x="55" y="88" fill="#ffffff" fontSize="16" fontWeight="bold">METRO</text>
          <text x="55" y="106" fill="#bae6fd" fontSize="10" fontWeight="semibold">UNLIMITED PASS</text>
        </svg>
      )}

      {type === 'books' && (
        <svg viewBox="0 0 220 170" className="w-full h-full object-contain filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.5)]">
          <rect x="45" y="95" width="130" height="28" rx="6" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
          <rect x="52" y="68" width="118" height="26" rx="6" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <rect x="60" y="44" width="102" height="24" rx="6" fill="#10b981" stroke="#047857" strokeWidth="2" />
          <polygon points="140,32 152,32 152,65 146,58 140,65" fill="#f59e0b" />
        </svg>
      )}
    </div>
  );
};
