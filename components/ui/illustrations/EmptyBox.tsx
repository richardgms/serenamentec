/**
 * Empty Box Illustration
 * SVG illustration para listas vazias
 */

export function EmptyBox({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Box */}
      <path
        d="M30 45L60 30L90 45V75L60 90L30 75V45Z"
        fill="#EFFFEA"
        stroke="#84C2BE"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Box lid */}
      <path
        d="M30 45L60 30L90 45L60 60L30 45Z"
        fill="#ACFFF9"
        stroke="#84C2BE"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Center line */}
      <path
        d="M60 60V90"
        stroke="#84C2BE"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Dots */}
      <circle cx="45" cy="60" r="2" fill="#84C2BE" opacity="0.5" />
      <circle cx="55" cy="65" r="2" fill="#84C2BE" opacity="0.5" />
      <circle cx="65" cy="65" r="2" fill="#84C2BE" opacity="0.5" />
      <circle cx="75" cy="60" r="2" fill="#84C2BE" opacity="0.5" />
    </svg>
  );
}
