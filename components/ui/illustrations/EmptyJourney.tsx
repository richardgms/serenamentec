/**
 * Empty Journey Illustration
 * SVG illustration para jornadas não iniciadas
 */

export function EmptyJourney({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Path */}
      <path
        d="M20 90C30 90 30 80 40 80C50 80 50 70 60 70C70 70 70 60 80 60C90 60 90 50 100 50"
        stroke="#84C2BE"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="5 5"
        opacity="0.3"
      />

      {/* Start flag */}
      <circle cx="20" cy="90" r="8" fill="#ACFFF9" stroke="#84C2BE" strokeWidth="2" />
      <path d="M20 82V72" stroke="#84C2BE" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 72L28 75L20 78Z" fill="#84C2BE" />

      {/* Middle markers */}
      <circle cx="60" cy="70" r="6" fill="#EFFFEA" stroke="#84C2BE" strokeWidth="2" opacity="0.5" />

      {/* End marker */}
      <circle cx="100" cy="50" r="10" fill="none" stroke="#84C2BE" strokeWidth="2" strokeDasharray="3 3" opacity="0.4" />
      <circle cx="100" cy="50" r="4" fill="#84C2BE" opacity="0.4" />

      {/* Question mark */}
      <text x="92" y="42" fontSize="16" fill="#84C2BE" fontWeight="bold">?</text>
    </svg>
  );
}
