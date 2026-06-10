import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --red: #C0162B;
    --red-deep: #8B0F1F;
    --red-blush: #FDEAEC;
    --gold: #D4A44C;
    --white: #FFFFFF;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .tn-header {
    position: fixed;
    top: 0; left: 0; right: 0;
    background: var(--white);
    border-bottom: 1px solid #f0e0e2;
    padding: 0 2.5rem;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
    transition: box-shadow 0.3s ease, background 0.3s ease;
    overflow: visible;
  }

  .tn-header.scrolled {
    box-shadow: 0 4px 30px rgba(192,22,43,0.1);
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(12px);
  }

  .tn-shimmer-line {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent 0%, #C0162B 20%, #D4A44C 50%, #C0162B 80%, transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  .tn-logo {
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    animation: slideLeft 0.8s cubic-bezier(0.22,1,0.36,1) both;
  }

  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .tn-logo-icon {
    width: 48px; height: 48px;
    background: var(--red);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 4px 20px rgba(192,22,43,0.35);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .tn-logo-icon:hover {
    transform: scale(1.08) rotate(-3deg);
    box-shadow: 0 6px 28px rgba(192,22,43,0.5);
  }

  .tn-logo-text { display: flex; flex-direction: column; line-height: 1; }

  .tn-logo-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem; font-weight: 600;
    color: var(--red-deep);
    letter-spacing: 0.01em;
    white-space: nowrap;
  }

  .tn-logo-title span { color: var(--red); }

  .tn-logo-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem; font-weight: 500;
    color: #aaa; letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .tn-nav {
    display: flex; align-items: center; gap: 2rem;
    animation: slideRight 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s both;
  }

  @keyframes slideRight {
    from { opacity: 0; transform: translateX(30px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .tn-nav-link {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #555;
    text-decoration: none;
    position: relative;
    padding: 4px 0;
    display: flex; align-items: center; gap: 6px;
    transition: color 0.25s ease;
  }

  .tn-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1.5px;
    background: var(--red);
    transition: width 0.3s cubic-bezier(0.22,1,0.36,1);
  }

  .tn-nav-link:hover { color: var(--red); }
  .tn-nav-link:hover::after { width: 100%; }

  .tn-nav-link svg { width: 15px; height: 15px; flex-shrink: 0; }

  .tn-cta {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--white);
    background: var(--red);
    border: none;
    padding: 10px 22px;
    border-radius: 40px;
    cursor: pointer;
    text-decoration: none;
    position: relative; overflow: hidden;
    box-shadow: 0 4px 16px rgba(192,22,43,0.3);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .tn-cta::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    transition: left 0.5s ease;
  }

  .tn-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(192,22,43,0.42); }
  .tn-cta:hover::before { left: 100%; }

  .tn-hamburger {
    display: none;
    background: none; border: none;
    cursor: pointer; padding: 6px;
    border-radius: 50%;
    width: 42px; height: 42px;
    align-items: center; justify-content: center;
    transition: background 0.2s ease;
  }

  .tn-hamburger:hover { background: var(--red-blush); }
  .tn-hamburger svg { width: 28px; height: 28px; }

  .tn-mobile-nav {
    display: none;
    position: absolute;
    top: 100%; left: 0; right: 0;
    background: var(--white);
    border-top: 1px solid #f0e0e2;
    padding: 1.5rem 2rem;
    flex-direction: column;
    gap: 1.2rem;
    box-shadow: 0 20px 40px rgba(192,22,43,0.08);
    animation: slideDown 0.3s ease;
  }

  .tn-mobile-nav.open { display: flex; }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .tn-mobile-nav .tn-nav-link { font-size: 0.9rem; }

  .tn-mobile-cta {
    display: inline-block; text-align: center;
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: white; background: var(--red);
    padding: 12px 24px; border-radius: 40px;
    text-decoration: none;
    box-shadow: 0 4px 16px rgba(192,22,43,0.3);
  }

  @media (max-width: 900px) {
    .tn-nav { gap: 1.2rem; }
    .tn-nav-link { font-size: 0.72rem; }
  }

  @media (max-width: 768px) {
    .tn-header { padding: 0 1.2rem; min-height: 68px; }
    .tn-nav { display: none; }
    .tn-hamburger { display: flex; }
    .tn-logo-title { font-size: 1.1rem; }
    .tn-logo-sub { display: none; }
    .tn-logo-icon { width: 40px; height: 40px; }
  }

  @media (max-width: 480px) {
    .tn-header { padding: 0 1rem; }
    .tn-logo-title { font-size: 0.95rem; }
  }
`;

const navItems = [
  {
    label: "About",
    href: "#about",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    label: "Services",
    href: "#services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    label: "Blog",
    href: "/blog",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    label: "Community",
    href: "#community",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const StethoscopeIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="5" r="2" stroke="#C0162B" strokeWidth="2" fill="none"/>
    <circle cx="25" cy="5" r="2" stroke="#C0162B" strokeWidth="2" fill="none"/>
    <path d="M7 7 C7 13 10 15 16 15" stroke="#C0162B" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <path d="M25 7 C25 13 22 15 16 15" stroke="#C0162B" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <path d="M16 15 C16 20 20 22 20 26" stroke="#C0162B" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
    <circle cx="20" cy="27.5" r="2.5" fill="#C0162B"/>
    <circle cx="19.2" cy="26.8" r="0.6" fill="white"/>
  </svg>
);

const MedicalCrossLogo = () => (
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <rect x="11" y="3" width="6" height="22" rx="1.5" fill="white"/>
    <rect x="3" y="11" width="22" height="6" rx="1.5" fill="white"/>
    <path d="M14 17.2c-.2 0-3.5-2.2-3.5-4.4a2.1 2.1 0 0 1 3.5-1.6 2.1 2.1 0 0 1 3.5 1.6c0 2.2-3.3 4.4-3.5 4.4z" fill="#C0162B"/>
  </svg>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <header className={`tn-header ${scrolled ? "scrolled" : ""}`}>
        <div className="tn-shimmer-line" />

        <a href="#" className="tn-logo">
          <div className="tn-logo-icon">
            <MedicalCrossLogo />
          </div>
          <div className="tn-logo-text">
            <span className="tn-logo-title">
              The <span>Thoughtful</span> Nurse
            </span>
            <span className="tn-logo-sub">Health Education &amp; Empowerment</span>
          </div>
        </a>

        <nav className="tn-nav">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="tn-nav-link">
              {item.icon}
              {item.label}
            </a>
          ))}
          <a href="#collaborate" className="tn-cta">Let's Collaborate</a>
        </nav>

        <button
          className="tn-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <StethoscopeIcon />
        </button>

        <div className={`tn-mobile-nav ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="tn-nav-link" onClick={() => setMenuOpen(false)}>
              {item.icon}
              {item.label}
            </a>
          ))}
          <a href="#collaborate" className="tn-mobile-cta" onClick={() => setMenuOpen(false)}>
            Let's Collaborate
          </a>
        </div>
      </header>
    </>
  );
}