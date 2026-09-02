export function SectionDivider() {
  return (
    <div className="flex justify-center bg-paper py-6" aria-hidden="true">
      <svg width="160" height="16" viewBox="0 0 160 16" className="text-accent-500">
        <line x1="0" y1="8" x2="65" y2="8" stroke="currentColor" strokeWidth="1" />
        <rect
          x="76"
          y="4"
          width="8"
          height="8"
          transform="rotate(45 80 8)"
          fill="currentColor"
        />
        <line x1="95" y1="8" x2="160" y2="8" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
