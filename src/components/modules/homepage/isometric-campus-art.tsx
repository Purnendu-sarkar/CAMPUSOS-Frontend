export default function IsometricCampusArt() {
  return (
    <svg
      viewBox="0 0 640 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full select-none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="iso-bg-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.32" />
          <stop offset="55%" stopColor="#0EA5E9" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#07132E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="iso-platform-top" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#162E63" />
          <stop offset="100%" stopColor="#0D1D42" />
        </linearGradient>
        <linearGradient id="iso-building-light" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="iso-building-side" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="iso-amber-path" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Ambient Glow */}
      <rect width="640" height="460" fill="url(#iso-bg-glow)" />

      {/* Outer Isometric Fiber Pathways */}
      <g opacity="0.85">
        <path
          d="M320 230 L130 135"
          stroke="#F59E0B"
          strokeWidth="2"
          className="animate-campus-dash"
        />
        <path
          d="M320 230 L510 135"
          stroke="#38BDF8"
          strokeWidth="2"
          className="animate-campus-dash"
        />
        <path
          d="M320 230 L130 330"
          stroke="#38BDF8"
          strokeWidth="2"
          className="animate-campus-dash"
        />
        <path
          d="M320 230 L510 330"
          stroke="#F59E0B"
          strokeWidth="2"
          className="animate-campus-dash"
        />
        <path
          d="M320 230 L320 75"
          stroke="#60A5FA"
          strokeWidth="1.6"
          className="animate-campus-dash"
        />
        <path
          d="M320 230 L320 390"
          stroke="#60A5FA"
          strokeWidth="1.6"
          className="animate-campus-dash"
        />
      </g>

      {/* 4 Satellite Isometric Module Pads */}
      {/* Top-Left Pad */}
      <g transform="translate(86, 102)">
        <polygon points="44,0 88,22 44,44 0,22" fill="#17336D" stroke="#38BDF8" strokeOpacity="0.45" />
        <polygon points="0,22 44,44 44,54 0,32" fill="#0E2048" />
        <polygon points="88,22 44,44 44,54 88,32" fill="#12295A" />
        <rect x="30" y="8" width="28" height="16" rx="4" fill="#38BDF8" fillOpacity="0.25" stroke="#7DD3FC" strokeOpacity="0.7" />
      </g>

      {/* Top-Right Pad */}
      <g transform="translate(466, 102)">
        <polygon points="44,0 88,22 44,44 0,22" fill="#17336D" stroke="#F59E0B" strokeOpacity="0.45" />
        <polygon points="0,22 44,44 44,54 0,32" fill="#0E2048" />
        <polygon points="88,22 44,44 44,54 88,32" fill="#12295A" />
        <rect x="30" y="8" width="28" height="16" rx="4" fill="#F59E0B" fillOpacity="0.25" stroke="#FCD34D" strokeOpacity="0.7" />
      </g>

      {/* Bottom-Left Pad */}
      <g transform="translate(86, 298)">
        <polygon points="44,0 88,22 44,44 0,22" fill="#17336D" stroke="#F59E0B" strokeOpacity="0.45" />
        <polygon points="0,22 44,44 44,54 0,32" fill="#0E2048" />
        <polygon points="88,22 44,44 44,54 88,32" fill="#12295A" />
        <rect x="30" y="8" width="28" height="16" rx="4" fill="#F59E0B" fillOpacity="0.25" stroke="#FCD34D" strokeOpacity="0.7" />
      </g>

      {/* Bottom-Right Pad */}
      <g transform="translate(466, 298)">
        <polygon points="44,0 88,22 44,44 0,22" fill="#17336D" stroke="#38BDF8" strokeOpacity="0.45" />
        <polygon points="0,22 44,44 44,54 0,32" fill="#0E2048" />
        <polygon points="88,22 44,44 44,54 88,32" fill="#12295A" />
        <rect x="30" y="8" width="28" height="16" rx="4" fill="#38BDF8" fillOpacity="0.25" stroke="#7DD3FC" strokeOpacity="0.7" />
      </g>

      {/* Central Isometric Campus Platform */}
      <g transform="translate(150, 125)">
        {/* Shadow Base */}
        <polygon points="170,15 340,105 170,195 0,105" fill="#040B1D" fillOpacity="0.65" transform="translate(0, 18)" />
        {/* Main Diamond Base */}
        <polygon points="170,10 340,100 170,190 0,100" fill="url(#iso-platform-top)" stroke="#38BDF8" strokeOpacity="0.4" strokeWidth="1.5" />
        <polygon points="0,100 170,190 170,206 0,116" fill="#0B193B" />
        <polygon points="340,100 170,190 170,206 340,116" fill="#102554" />

        {/* Cross Courtyard Glowing Roads */}
        <line x1="85" y1="55" x2="255" y2="145" stroke="url(#iso-amber-path)" strokeWidth="4" strokeOpacity="0.75" />
        <line x1="255" y1="55" x2="85" y2="145" stroke="url(#iso-amber-path)" strokeWidth="4" strokeOpacity="0.75" />

        {/* Courtyard Green Lawns */}
        <polygon points="170,32 215,56 170,80 125,56" fill="#10B981" fillOpacity="0.28" stroke="#34D399" strokeOpacity="0.35" />
        <polygon points="170,120 215,144 170,168 125,144" fill="#10B981" fillOpacity="0.28" stroke="#34D399" strokeOpacity="0.35" />

        {/* Left Academic Building */}
        <g transform="translate(65, 62)">
          <polygon points="36,0 72,18 36,36 0,18" fill="#F1F5F9" />
          <polygon points="0,18 36,36 36,64 0,46" fill="#94A3B8" />
          <polygon points="72,18 36,36 36,64 72,46" fill="#64748B" />
          <line x1="10" y1="30" x2="28" y2="39" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="10" y1="39" x2="28" y2="48" stroke="#F59E0B" strokeWidth="2.5" />
        </g>

        {/* Right Innovation Building */}
        <g transform="translate(203, 62)">
          <polygon points="36,0 72,18 36,36 0,18" fill="#F1F5F9" />
          <polygon points="0,18 36,36 36,64 0,46" fill="#94A3B8" />
          <polygon points="72,18 36,36 36,64 72,46" fill="#475569" />
          <line x1="44" y1="39" x2="62" y2="30" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="44" y1="48" x2="62" y2="39" stroke="#F59E0B" strokeWidth="2.5" />
        </g>

        {/* Central Circular CampusOS Tower / Library */}
        <g transform="translate(126, 34)">
          <ellipse cx="44" cy="64" rx="44" ry="24" fill="#1E3A8A" stroke="#60A5FA" strokeOpacity="0.5" />
          <path d="M0 38 V64 A44 24 0 0 0 88 64 V38 Z" fill="url(#iso-building-side)" />
          <ellipse cx="44" cy="38" rx="44" ry="24" fill="url(#iso-building-light)" />
          {/* Glowing Ring Tier 2 */}
          <ellipse cx="44" cy="34" rx="32" ry="17" fill="#0F172A" />
          <path d="M12 18 V34 A32 17 0 0 0 76 34 V18 Z" fill="#3B82F6" fillOpacity="0.85" />
          <ellipse cx="44" cy="18" rx="32" ry="17" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
          <ellipse cx="44" cy="18" rx="14" ry="7.5" fill="#2563EB" />
        </g>

        {/* Small Stylized Campus Trees */}
        <circle cx="114" cy="128" r="7" fill="#10B981" fillOpacity="0.85" />
        <circle cx="228" cy="128" r="7" fill="#10B981" fillOpacity="0.85" />
        <circle cx="170" cy="48" r="6" fill="#34D399" fillOpacity="0.85" />
      </g>
    </svg>
  );
}
