export function LotusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" aria-hidden="true">
      <g fill="#F4C0D1" stroke="#D4537E" strokeWidth=".8">
        <path d="M30 26 Q14 22 8 12 Q22 10 30 26Z" />
        <path d="M30 26 Q46 22 52 12 Q38 10 30 26Z" />
        <path d="M30 26 Q18 16 17 5 Q29 8 30 26Z" />
        <path d="M30 26 Q42 16 43 5 Q31 8 30 26Z" />
      </g>
      <path d="M30 26 Q26 12 30 3 Q34 12 30 26Z" fill="#ED93B1" stroke="#D4537E" strokeWidth=".8" />
      <path d="M8 27 Q30 38 52 27 Q30 32 8 27Z" fill="#97C459" stroke="#3B6D11" strokeWidth=".8" />
    </svg>
  );
}

export function ArrowIcon({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg className={className} viewBox="0 0 24 26" aria-hidden="true">
      <polygon points="8.4,0 15.6,0 15.6,15 20,15 12,26 4,15 8.4,15" fill={fill} />
    </svg>
  );
}

export function FlipToIcon({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <polygon points="3,10.8 15,10.8 15,6.5 27,15 15,23.5 15,19.2 3,19.2" fill={fill} />
    </svg>
  );
}

export function BackBtnIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 3 L2.5 7 L6.5 11" />
      <path d="M2.5 7h7a4 4 0 0 1 0 8H7" />
    </svg>
  );
}

export function HindranceHandIcon() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true">
      <circle cx="15" cy="15" r="14" fill="var(--red-bg)" stroke="var(--red)" strokeWidth="1.6" />
      <path
        transform="translate(14.6 16) scale(0.46)"
        d="M0.5 21.0 C-5.5 21.0 -10.5 16.6 -11.6 10.6 C-12.6 5.2 -14.8 0.4 -17.6 -3.4
           C-19.6 -6.2 -15.4 -9.2 -13.4 -6.4 C-12.2 -4.8 -11.2 -3.2 -10.4 -1.8 L-10.4 -9.0
           C-10.4 -12.6 -5.2 -12.6 -5.2 -9.0 L-5.2 -2.6 L-3.9 -2.6 L-3.9 -15.4
           C-3.9 -19.0 1.3 -19.0 1.3 -15.4 L1.3 -2.6 L2.6 -2.6 L2.6 -16.6
           C2.6 -20.2 7.8 -20.2 7.8 -16.6 L7.8 -2.6 L9.1 -2.6 L9.1 -11.8
           C9.1 -15.2 14.2 -15.2 14.2 -11.8 L14.2 7.4 C14.2 15.0 8.3 21.0 0.5 21.0 Z"
        fill="var(--red-soft)"
        stroke="var(--red)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BloomIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 40" aria-hidden="true">
      <g fill="#F4C0D1" stroke="#D4537E" strokeWidth=".8">
        <path d="M30 26 Q14 22 8 12 Q22 10 30 26Z" />
        <path d="M30 26 Q46 22 52 12 Q38 10 30 26Z" />
        <path d="M30 26 Q18 16 17 5 Q29 8 30 26Z" />
        <path d="M30 26 Q42 16 43 5 Q31 8 30 26Z" />
      </g>
      <path d="M30 26 Q26 12 30 3 Q34 12 30 26Z" fill="#ED93B1" stroke="#D4537E" strokeWidth=".8" />
      <path d="M8 27 Q30 38 52 27 Q30 32 8 27Z" fill="#97C459" stroke="#3B6D11" strokeWidth=".8" />
    </svg>
  );
}

export function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 3 L5 8 L10 13" />
    </svg>
  );
}

export function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3 L11 8 L6 13" />
    </svg>
  );
}

export function BuddhaWheelIllustration() {
  return (
    <svg viewBox="0 0 160 160" style={{ display: "block", margin: "0 auto 4px", width: 150, height: 150 }} aria-label="The Buddha before a dhamma wheel">
      <circle cx="80" cy="72" r="54" fill="var(--amber-bg)" stroke="#BA7517" strokeWidth="2" />
      <g stroke="#BA7517" strokeWidth="1.5">
        <line x1="80" y1="18" x2="80" y2="126" />
        <line x1="26" y1="72" x2="134" y2="72" />
        <line x1="42" y1="34" x2="118" y2="110" />
        <line x1="118" y1="34" x2="42" y2="110" />
      </g>
      <circle cx="80" cy="72" r="8" fill="#BA7517" />
      <g fill="#F5C4B3" stroke="#B34A24" strokeWidth="1">
        <ellipse cx="80" cy="112" rx="29" ry="31" />
        <rect x="30" y="130" width="100" height="25" rx="12.5" />
        <circle cx="80" cy="76" r="17" />
      </g>
      <ellipse cx="80" cy="128" rx="13" ry="5.5" fill="#F0997B" stroke="#B34A24" strokeWidth="1" />
      <circle cx="80" cy="58" r="5.5" fill="#F0997B" stroke="#B34A24" strokeWidth="1" />
    </svg>
  );
}

export function WheelOfBecomingIllustration() {
  return (
    <svg viewBox="0 0 160 160" style={{ display: "block", margin: "0 auto 6px", width: 132, height: 132 }} aria-label="The wheel of becoming, twelve spokes">
      <circle cx="80" cy="80" r="56" fill="var(--amber-bg)" stroke="#BA7517" strokeWidth="2" />
      <g stroke="#BA7517" strokeWidth="1.2">
        <line x1="24.0" y1="80.0" x2="136.0" y2="80.0" />
        <line x1="31.5" y1="52.0" x2="128.5" y2="108.0" />
        <line x1="52.0" y1="31.5" x2="108.0" y2="128.5" />
        <line x1="80.0" y1="24.0" x2="80.0" y2="136.0" />
        <line x1="108.0" y1="31.5" x2="52.0" y2="128.5" />
        <line x1="128.5" y1="52.0" x2="31.5" y2="108.0" />
      </g>
      <path d="M84.0 42.2 A38.0 38.0 0 0 1 109.1 55.6" fill="none" stroke="#B34A24" strokeWidth="2.8" strokeLinecap="round" />
      <polygon points="114.6,62.1 112.8,52.5 105.4,58.7" fill="#B34A24" />
      <path d="M117.2 72.1 A38.0 38.0 0 0 1 112.2 100.1" fill="none" stroke="#B34A24" strokeWidth="2.8" strokeLinecap="round" />
      <polygon points="107.7,107.3 116.3,102.7 108.2,97.6" fill="#B34A24" />
      <path d="M99.0 112.9 A38.0 38.0 0 0 1 70.8 116.9" fill="none" stroke="#B34A24" strokeWidth="2.8" strokeLinecap="round" />
      <polygon points="62.6,114.8 69.6,121.5 72.0,112.2" fill="#B34A24" />
      <path d="M54.6 108.2 A38.0 38.0 0 0 1 42.1 82.7" fill="none" stroke="#B34A24" strokeWidth="2.8" strokeLinecap="round" />
      <polygon points="41.5,74.2 37.3,83.0 46.9,82.3" fill="#B34A24" />
      <path d="M45.3 64.5 A38.0 38.0 0 0 1 65.8 44.8" fill="none" stroke="#B34A24" strokeWidth="2.8" strokeLinecap="round" />
      <polygon points="73.6,41.6 64.0,40.3 67.6,49.2" fill="#B34A24" />
      <circle cx="80" cy="80" r="8" fill="#BA7517" />
    </svg>
  );
}
