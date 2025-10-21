/**
 * No Data Illustration
 * SVG illustration para dados não encontrados
 */

export function NoData({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Document */}
      <rect
        x="30"
        y="20"
        width="60"
        height="80"
        rx="4"
        fill="#EFFFEA"
        stroke="#84C2BE"
        strokeWidth="2"
      />

      {/* Lines */}
      <line x1="40" y1="35" x2="70" y2="35" stroke="#84C2BE" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <line x1="40" y1="45" x2="80" y2="45" stroke="#84C2BE" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <line x1="40" y1="55" x2="65" y2="55" stroke="#84C2BE" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

      {/* Search icon */}
      <circle
        cx="60"
        cy="70"
        r="12"
        fill="none"
        stroke="#ACFFF9"
        strokeWidth="2"
      />
      <line
        x1="68"
        y1="78"
        x2="75"
        y2="85"
        stroke="#ACFFF9"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sad face in circle */}
      <circle cx="55" cy="68" r="1.5" fill="#84C2BE" />
      <circle cx="65" cy="68" r="1.5" fill="#84C2BE" />
      <path
        d="M55 74C55 74 57 72 60 72C63 72 65 74 65 74"
        stroke="#84C2BE"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
