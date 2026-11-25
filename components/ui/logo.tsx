import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`logo ${light ? "logo-light" : ""}`} aria-label="Море чая — на главную">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M11 21h26c0 11-5 17-13 17S11 32 11 21Z" fill="currentColor" />
        <path d="M7 21c5-4 10 4 15 0s10 4 15 0 7 0 7 0" fill="none" stroke="var(--paper)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M19 15c-4-5 4-6 0-11M28 15c-4-5 4-6 0-11" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span>Море чая</span>
    </Link>
  );
}
