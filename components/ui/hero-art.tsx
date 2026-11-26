import { Gift, Leaf, ShoppingBag, Sparkles } from "lucide-react";

export function HeroArt() {
  return (
    <div className="hero-art" aria-label="Чашка чая, упаковка и чайные листья — декоративная композиция" role="img">
      <div className="hero-orbit hero-orbit-outer" />
      <div className="hero-orbit hero-orbit-inner" />

      <div className="hero-float hero-float-left">
        <span className="hero-float-icon"><Leaf size={19} strokeWidth={1.5} /></span>
        <strong>Чай под ваш ритм</strong>
        <span>Для утра, работы<br />и тихого вечера</span>
      </div>
      <div className="hero-float hero-float-right">
        <div className="hero-mini-icons" aria-hidden="true">
          <span><Leaf size={13} /></span><span><Gift size={13} /></span><span><ShoppingBag size={13} /></span>
        </div>
        <strong>Дома и в подарок</strong>
        <span>Соберите свой<br />чайный ритуал</span>
      </div>

      <div className="hero-seal" aria-hidden="true">
        <span>МОРЕ ЧАЯ · САНКТ-ПЕТЕРБУРГ ·</span>
        <Sparkles size={25} strokeWidth={1.1} />
      </div>

      <div className="hero-main-art">
        <svg viewBox="0 0 620 610" aria-hidden="true">
          <defs>
            <radialGradient id="hero-tea-surface" cx="38%" cy="28%" r="75%">
              <stop offset="0%" stopColor="#bca37c" />
              <stop offset="55%" stopColor="#746149" />
              <stop offset="100%" stopColor="#342d25" />
            </radialGradient>
            <linearGradient id="hero-porcelain" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#e6e4dd" />
              <stop offset="100%" stopColor="#c4c4bc" />
            </linearGradient>
            <linearGradient id="hero-package" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#b9c0b2" />
              <stop offset="55%" stopColor="#7d8d7d" />
              <stop offset="100%" stopColor="#4b6152" />
            </linearGradient>
            <filter id="hero-shadow" x="-30%" y="-30%" width="160%" height="180%">
              <feDropShadow dx="0" dy="22" stdDeviation="18" floodColor="#18231c" floodOpacity=".18" />
            </filter>
          </defs>

          <g className="hero-art-branches" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M126 511c61-77 82-176 76-289" />
            <path d="M188 378c-46-3-73-28-82-66 45-1 75 22 82 66Z" />
            <path d="M201 303c43-13 71-41 79-82-46 2-75 31-79 82Z" />
            <path d="M158 436c-40 0-68-20-82-55 41-6 70 14 82 55Z" />
            <path d="M454 495c-45-62-68-132-73-202" />
            <path d="M399 381c37-7 60-30 66-64-39 3-63 26-66 64Z" />
            <path d="M382 313c-34-11-56-34-63-66 35 3 58 25 63 66Z" />
          </g>

          <g filter="url(#hero-shadow)">
            <path d="M176 105h232l17 369H157Z" fill="url(#hero-package)" />
            <path d="M176 105h232l-10 29H183Z" fill="#d8ded1" opacity=".55" />
            <path d="M181 153h220M169 429h244" fill="none" stroke="#f4f3e8" strokeOpacity=".45" />
            <circle cx="291" cy="261" r="68" fill="none" stroke="#f5f2e7" strokeOpacity=".65" />
            <path d="M259 273c20-42 47-48 70-55-3 36-22 66-63 67m4-3c11-18 26-32 47-45" fill="none" stroke="#f5f2e7" strokeWidth="2" strokeLinecap="round" />
            <text x="291" y="363" fill="#fffdf5" fontFamily="Georgia, serif" fontSize="24" textAnchor="middle" letterSpacing="3">МОРЕ ЧАЯ</text>
          </g>

          <ellipse cx="323" cy="555" rx="181" ry="28" fill="#24372c" opacity=".14" />
          <g filter="url(#hero-shadow)">
            <path d="M162 351c5 137 58 201 151 201s143-64 148-201Z" fill="url(#hero-porcelain)" />
            <path d="M184 403c18 85 62 124 131 124 62 0 104-35 128-109-37 38-78 55-129 55-52 0-95-24-130-70Z" fill="#aeb0a8" opacity=".32" />
            <ellipse cx="312" cy="351" rx="150" ry="67" fill="#f8f7f1" />
            <ellipse cx="312" cy="351" rx="132" ry="54" fill="url(#hero-tea-surface)" />
            <ellipse cx="312" cy="351" rx="132" ry="54" fill="none" stroke="#b2a17f" strokeWidth="2" />
            <path d="M224 333c27-29 89-39 133-22" fill="none" stroke="#f5e2bd" strokeWidth="5" strokeLinecap="round" opacity=".28" />
            <path d="M450 379c67-24 93 18 71 65-16 35-49 51-84 40" fill="none" stroke="#d8d8d0" strokeWidth="19" strokeLinecap="round" />
          </g>
          <g className="hero-art-steam" fill="none" strokeLinecap="round">
            <path d="M260 279c-42-58 35-75-2-132" />
            <path d="M326 267c-34-47 27-66 0-112" />
            <path d="M386 285c-27-42 22-58 2-96" />
          </g>
        </svg>
      </div>

      <div className="hero-glass hero-glass-left">
        <span className="hero-glass-icon"><Leaf size={16} /></span>
        <span><strong>Для дома</strong><small>любимые сорта</small></span>
      </div>
      <div className="hero-glass hero-glass-right">
        <span className="hero-glass-icon hero-glass-icon-warm"><Gift size={16} /></span>
        <span><strong>В подарок</strong><small>чай и посуда</small></span>
      </div>

      <div className="hero-proof">
        <span className="hero-proof-line" />
        <span>Выбирайте чай<br />в своём темпе</span>
      </div>
      <div className="hero-art-note"><Sparkles size={16} /><span>Больше вкуса.<br />Меньше суеты.</span></div>
    </div>
  );
}
