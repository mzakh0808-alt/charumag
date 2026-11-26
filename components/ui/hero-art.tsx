export function HeroArt() {
  return (
    <div className="hero-art" aria-label="Чаша чая и чайная ветвь — авторская декоративная иллюстрация" role="img">
      <svg viewBox="0 0 600 690" aria-hidden="true">
        <defs>
          <radialGradient id="tea-surface" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#c6a36a" />
            <stop offset="55%" stopColor="#8d623e" />
            <stop offset="100%" stopColor="#513728" />
          </radialGradient>
          <linearGradient id="porcelain" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fffdf5" />
            <stop offset="100%" stopColor="#d9d2c0" />
          </linearGradient>
        </defs>
        <circle className="art-orbit" cx="300" cy="314" r="196" />
        <circle className="art-orbit art-orbit-inner" cx="300" cy="314" r="154" />
        <g className="art-steam" fill="none" strokeLinecap="round">
          <path d="M252 178c-42-58 35-75-2-132" />
          <path d="M318 166c-34-47 27-66 0-112" />
          <path d="M378 184c-27-42 22-58 2-96" />
        </g>
        <g className="art-branch" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M90 525c78-66 97-154 95-241" />
          <path d="M153 425c-43-3-67-24-76-60 42-1 69 19 76 60Z" />
          <path d="M175 363c39-11 67-37 76-76-43 1-70 27-76 76Z" />
          <path d="M116 477c-37 0-62-17-75-48 37-6 64 12 75 48Z" />
          <path d="M178 316c-28-10-44-31-46-59 31 4 48 26 46 59Z" />
          <path d="M421 507c45-59 70-120 76-185" />
          <path d="M470 403c-34-7-55-28-61-59 36 2 58 24 61 59Z" />
          <path d="M493 342c31-10 50-31 57-60-33 1-53 23-57 60Z" />
        </g>
        <ellipse cx="304" cy="531" rx="150" ry="25" fill="#0e1e17" opacity=".22" />
        <path d="M166 340c5 129 53 188 139 188s132-62 136-188Z" fill="url(#porcelain)" />
        <path d="M184 388c17 79 57 115 121 115 57 0 96-33 118-101-34 35-72 51-119 51-48 0-88-22-120-65Z" fill="#c7c1b1" opacity=".38" />
        <ellipse cx="304" cy="340" rx="140" ry="63" fill="#f7f3e8" />
        <ellipse cx="304" cy="340" rx="123" ry="50" fill="url(#tea-surface)" />
        <ellipse cx="304" cy="340" rx="123" ry="50" fill="none" stroke="#b39761" strokeWidth="2" />
        <path d="M224 324c25-27 83-37 124-21" fill="none" stroke="#f5deb0" strokeWidth="5" strokeLinecap="round" opacity=".3" />
        <path d="M432 366c62-22 86 17 66 61-15 32-45 47-77 37" fill="none" stroke="#ded7c7" strokeWidth="18" strokeLinecap="round" />
      </svg>
      <div className="hero-art-note">
        <span>Санкт-Петербург</span>
        <span>чай для дома и в подарок</span>
      </div>
    </div>
  );
}
