export default function Logo({ className = "size-10" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-label="CampusOS Logo"
    >
      <defs>
        <linearGradient
          id="campusos-grad-main"
          x1="6"
          y1="10"
          x2="42"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient
          id="campusos-grad-cap"
          x1="12"
          y1="4"
          x2="38"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      {/* Graduation Cap */}
      <path
        d="M24 5L8 12.5L24 20L40 12.5L24 5Z"
        fill="url(#campusos-grad-cap)"
      />
      <path
        d="M36 14.5V21.5"
        stroke="#93C5FD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="36" cy="22.5" r="1.6" fill="#38BDF8" />

      {/* Glowing C-Shield / Workspace Mark */}
      <path
        d="M32.5 23.2C30.4 20.9 27.4 19.5 24 19.5C17.6 19.5 12.5 24.6 12.5 31C12.5 37.4 17.6 42.5 24 42.5C27.5 42.5 30.6 41 32.7 38.6"
        stroke="url(#campusos-grad-main)"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      {/* Inner Book / Campus Node */}
      <path
        d="M21 28.5C21 27.67 21.67 27 22.5 27H29C29.83 27 30.5 27.67 30.5 28.5V33.5C30.5 34.33 29.83 35 29 35H22.5C21.67 35 21 34.33 21 33.5V28.5Z"
        fill="#E0F2FE"
        fillOpacity="0.92"
      />
      <circle cx="25.75" cy="31" r="1.5" fill="#2563EB" />
    </svg>
  );
}
