const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .footer {
    position: relative;
    background: #0a0a0a;
    color: white;
    overflow: hidden;
  }

  /* ── animated top border ── */
  .footer-stripe {
    position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, #C0162B 20%, #D4A44C 50%, #C0162B 80%, transparent);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  /* ── decorative glows ── */
  .footer-glow-left {
    position: absolute;
    bottom: -100px; left: -100px;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.08), transparent 70%);
    pointer-events: none;
    animation: breathe 8s ease-in-out infinite;
  }
  .footer-glow-right {
    position: absolute;
    top: -80px; right: -80px;
    width: 350px; height: 350px; border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.06), transparent 70%);
    pointer-events: none;
    animation: breathe 10s ease-in-out infinite reverse;
  }
  @keyframes breathe {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.1); }
  }

  /* ── decorative bg cross ── */
  .footer-bg-cross {
    position: absolute;
    right: 5%; top: 50%;
    transform: translateY(-50%);
    opacity: 0.025; pointer-events: none;
    animation: rotateSlow 50s linear infinite;
  }
  @keyframes rotateSlow { to { transform: translateY(-50%) rotate(360deg); } }

  /* ── CTA banner ── */
  .footer-cta-band {
    position: relative;
    background: linear-gradient(135deg, #8B0F1F 0%, #C0162B 50%, #8B0F1F 100%);
    padding: 3.5rem 2.5rem;
    text-align: center;
    overflow: hidden;
  }

  .footer-cta-band::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='15'/%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }

  .footer-cta-band::after {
    content: '';
    position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    animation: scanBand 4s ease-in-out infinite;
  }
  @keyframes scanBand {
    0%   { left: -60%; }
    100% { left: 160%; }
  }

  .footer-cta-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.6); margin-bottom: 0.8rem;
  }

  .footer-cta-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 600; color: white; line-height: 1.25;
    margin-bottom: 1.4rem;
  }

  .footer-cta-heading em { font-style: italic; color: #D4A44C; }

  .footer-cta-btns {
    display: flex; align-items: center; justify-content: center;
    gap: 1rem; flex-wrap: wrap;
  }

  .footer-cta-btn-primary {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #C0162B; background: white;
    border: none; padding: 12px 28px;
    border-radius: 40px; cursor: pointer;
    text-decoration: none;
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    position: relative; overflow: hidden;
  }

  .footer-cta-btn-primary::before {
    content: '';
    position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(192,22,43,0.08), transparent);
    transition: left 0.5s;
  }

  .footer-cta-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(0,0,0,0.3); }
  .footer-cta-btn-primary:hover::before { left: 100%; }

  .footer-cta-btn-outline {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: white; background: transparent;
    border: 1.5px solid rgba(255,255,255,0.4);
    padding: 11px 28px; border-radius: 40px;
    cursor: pointer; text-decoration: none;
    transition: all 0.25s ease;
  }

  .footer-cta-btn-outline:hover {
    background: rgba(255,255,255,0.1);
    border-color: white; transform: translateY(-3px);
  }

  /* ── main footer grid ── */
  .footer-main {
    padding: 5rem 2.5rem 3rem;
    max-width: 1200px; margin: 0 auto;
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1fr;
    gap: 3rem;
    position: relative; z-index: 1;
  }

  /* ── brand column ── */
  .footer-brand { display: flex; flex-direction: column; gap: 1.4rem; }

  .footer-logo {
    display: flex; align-items: center; gap: 12px;
    text-decoration: none;
  }

  .footer-logo-icon {
    width: 44px; height: 44px;
    background: #C0162B; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(192,22,43,0.4);
    flex-shrink: 0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .footer-logo-icon:hover {
    transform: scale(1.08) rotate(-3deg);
    box-shadow: 0 6px 24px rgba(192,22,43,0.6);
  }

  .footer-logo-icon svg { width: 24px; height: 24px; }

  .footer-logo-text { display: flex; flex-direction: column; line-height: 1; }

  .footer-logo-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; font-weight: 600;
    color: white; white-space: nowrap;
  }

  .footer-logo-title span { color: #C0162B; }

  .footer-logo-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.58rem; font-weight: 500;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.15em; text-transform: uppercase; margin-top: 3px;
  }

  .footer-brand-desc {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; color: rgba(255,255,255,0.45);
    line-height: 1.8;
  }

  /* social icons */
  .footer-socials { display: flex; gap: 10px; }

  .footer-social {
    width: 38px; height: 38px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center;
    text-decoration: none;
    transition: all 0.25s ease;
    position: relative; overflow: hidden;
  }

  .footer-social svg { width: 16px; height: 16px; fill: rgba(255,255,255,0.5); transition: fill 0.25s; position: relative; z-index: 1; }

  .footer-social.instagram:hover { background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045); border-color: transparent; }
  .footer-social.tiktok:hover    { background: #010101; border-color: #69C9D0; }
  .footer-social:hover svg { fill: white; }
  .footer-social:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(192,22,43,0.25); }

  /* disclaimer */
  .footer-disclaimer {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; color: rgba(255,255,255,0.25);
    line-height: 1.7;
    padding: 1rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 10px;
  }

  /* ── link columns ── */
  .footer-col { display: flex; flex-direction: column; gap: 1rem; }

  .footer-col-title {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .footer-links { display: flex; flex-direction: column; gap: 0.7rem; }

  .footer-link {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; font-weight: 400;
    color: rgba(255,255,255,0.45);
    text-decoration: none;
    display: flex; align-items: center; gap: 8px;
    transition: color 0.2s ease, transform 0.2s ease;
    width: fit-content;
  }

  .footer-link:hover { color: white; transform: translateX(4px); }

  .footer-link-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #C0162B; flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .footer-link:hover .footer-link-dot { opacity: 1; }

  /* badge for new items */
  .footer-link-badge {
    font-family: 'Jost', sans-serif;
    font-size: 0.55rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    background: #C0162B; color: white;
    border-radius: 20px; padding: 2px 7px;
    animation: badgePulse 2s ease-in-out infinite;
  }

  @keyframes badgePulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.7; }
  }

  /* contact info rows in footer */
  .footer-contact-item {
    display: flex; align-items: flex-start; gap: 10px;
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem; color: rgba(255,255,255,0.4);
    line-height: 1.5;
  }

  .footer-contact-item svg { width: 14px; height: 14px; stroke: #C0162B; flex-shrink: 0; margin-top: 2px; }

  .footer-contact-item a { color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
  .footer-contact-item a:hover { color: white; }

  /* ── newsletter strip ── */
  .footer-newsletter {
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 2rem 2.5rem;
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center;
    justify-content: space-between; gap: 2rem;
    flex-wrap: wrap;
    position: relative; z-index: 1;
  }

  .footer-newsletter-text { display: flex; flex-direction: column; gap: 4px; }

  .footer-newsletter-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; font-weight: 600; color: white;
  }

  .footer-newsletter-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem; color: rgba(255,255,255,0.35);
  }

  .footer-newsletter-form {
    display: flex; gap: 0; border-radius: 40px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    flex: 0 0 auto;
  }

  .footer-newsletter-input {
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem; color: white;
    background: transparent; border: none; outline: none;
    padding: 11px 18px;
    width: 220px;
  }

  .footer-newsletter-input::placeholder { color: rgba(255,255,255,0.25); }

  .footer-newsletter-btn {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    background: #C0162B; color: white;
    border: none; padding: 11px 20px;
    cursor: pointer;
    transition: background 0.25s ease;
    white-space: nowrap;
  }

  .footer-newsletter-btn:hover { background: #8B0F1F; }

  /* ── bottom bar ── */
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 1.5rem 2.5rem;
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center;
    justify-content: space-between; gap: 1rem;
    flex-wrap: wrap;
    position: relative; z-index: 1;
  }

  .footer-bottom-left {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem; color: rgba(255,255,255,0.25);
    display: flex; align-items: center; gap: 6px;
  }

  .footer-bottom-left span { color: #C0162B; }

  .footer-bottom-right {
    display: flex; gap: 1.5rem;
  }

  .footer-bottom-link {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; color: rgba(255,255,255,0.25);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-bottom-link:hover { color: rgba(255,255,255,0.6); }

  /* nurse credential badge */
  .footer-credential {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(192,22,43,0.12);
    border: 1px solid rgba(192,22,43,0.25);
    border-radius: 30px; padding: 5px 14px;
    width: fit-content;
  }

  .footer-credential-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #C0162B;
    animation: credPulse 2s ease-in-out infinite;
  }

  @keyframes credPulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50%      { transform: scale(1.3); opacity: 0.6; }
  }

  .footer-credential span {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  /* ── responsive ── */
  @media (max-width: 1024px) {
    .footer-main { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
  }

  @media (max-width: 640px) {
    .footer-main { grid-template-columns: 1fr; gap: 2rem; padding: 3rem 1.2rem 2rem; }
    .footer-cta-band { padding: 2.5rem 1.2rem; }
    .footer-newsletter { flex-direction: column; align-items: flex-start; padding: 1.5rem 1.2rem; }
    .footer-newsletter-form { width: 100%; }
    .footer-newsletter-input { width: 100%; flex: 1; }
    .footer-bottom { flex-direction: column; align-items: center; text-align: center; padding: 1.2rem; }
    .footer-bottom-right { flex-wrap: wrap; justify-content: center; gap: 1rem; }
  }
`;

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-1-.43z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const MedicalCross = () => (
  <svg viewBox="0 0 28 28" fill="none" width="24" height="24">
    <rect x="11" y="3" width="6" height="22" rx="1.5" fill="white"/>
    <rect x="3" y="11" width="22" height="6" rx="1.5" fill="white"/>
    <path d="M14 17.2c-.2 0-3.5-2.2-3.5-4.4a2.1 2.1 0 0 1 3.5-1.6 2.1 2.1 0 0 1 3.5 1.6c0 2.2-3.3 4.4-3.5 4.4z" fill="#C0162B"/>
  </svg>
);

export default function Footer() {
  return (
    <>
      <style>{styles}</style>
      <footer className="footer">
        <div className="footer-stripe" />
        <div className="footer-glow-left" />
        <div className="footer-glow-right" />

        {/* Decorative cross */}
        <div className="footer-bg-cross">
          <svg width="420" height="420" viewBox="0 0 100 100">
            <rect x="44" y="5" width="12" height="90" rx="4" fill="#C0162B"/>
            <rect x="5" y="44" width="90" height="12" rx="4" fill="#C0162B"/>
          </svg>
        </div>

        {/* ── CTA BAND ── */}
        <div className="footer-cta-band">
          <p className="footer-cta-label">Ready to Make an Impact?</p>
          <h2 className="footer-cta-heading">
            Let's Educate, <em>Empower</em> & Inspire Together
          </h2>
          <div className="footer-cta-btns">
            <a href="#collaborate" className="footer-cta-btn-primary">Work With Me</a>
            <a href="#services"    className="footer-cta-btn-outline">View Services</a>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="footer-main">

          {/* Brand column */}
          <div className="footer-brand">
            <a href="#" className="footer-logo">
              <div className="footer-logo-icon"><MedicalCross /></div>
              <div className="footer-logo-text">
                <span className="footer-logo-title">The <span>Thoughtful</span> Nurse</span>
                <span className="footer-logo-sub">Health Education & Empowerment</span>
              </div>
            </a>

            <div className="footer-credential">
              <div className="footer-credential-dot" />
              <span>Registered Nurse · RN Verified</span>
            </div>

            <p className="footer-brand-desc">
              Evidence-based health education with a heart. Helping girls understand their bodies, supporting parents, and empowering families — one conversation at a time.
            </p>

            <div className="footer-socials">
              <a href="
https://www.instagram.com/the_thoughtful_nurse?igsh=cnZ6c3l2bjBiOWY4&utm_source=qr" target="_blank" rel="noreferrer" className="footer-social instagram" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.tiktok.com/@thoughtfulnurse?_r=1&_t=ZN-970hMShuuFa" target="_blank" rel="noreferrer" className="footer-social tiktok" aria-label="TikTok">
                <TikTokIcon />
              </a>
            </div>

            <div className="footer-disclaimer">
              ⚕️ <strong>Medical Disclaimer:</strong> Content on this platform is for educational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional for personal health concerns.
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <div className="footer-col-title">Quick Links</div>
            <div className="footer-links">
              {[
                { label: "Home",        href: "#home" },
                { label: "About Me",    href: "#about" },
                { label: "Services",    href: "#services" },
                { label: "Community",   href: "#community" },
                { label: "Blog",        href: "#blog",        badge: "New" },
                { label: "Collaborate", href: "#collaborate" },
              ].map((l) => (
                <a key={l.label} href={l.href} className="footer-link">
                  <div className="footer-link-dot" />
                  {l.label}
                  {l.badge && <span className="footer-link-badge">{l.badge}</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="footer-col">
            <div className="footer-col-title">Services</div>
            <div className="footer-links">
              {[
                { label: "Health Content Creation", href: "#services" },
                { label: "Brand Collaborations",    href: "#services" },
                { label: "Puberty Education",       href: "#services" },
                { label: "Period Education",        href: "#services" },
                { label: "Awareness Campaigns",     href: "#services" },
                { label: "Health Articles",         href: "#blog" },
              ].map((l) => (
                <a key={l.label} href={l.href} className="footer-link">
                  <div className="footer-link-dot" />
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <div className="footer-col-title">Contact</div>
            <div className="footer-links" style={{ gap: "1rem" }}>
              <div className="footer-contact-item">
                <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="thoughtfulnurse01@gmail.com">thoughtfulnurse01@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Available Worldwide
              </div>
              <div className="footer-contact-item">
                <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="11" y="3" width="2" height="18" rx="1"/>
                  <rect x="3" y="11" width="18" height="2" rx="1"/>
                </svg>
                Collaboration & Partnerships
              </div>
              <div className="footer-contact-item">
                <svg fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                8,000+ Community Members
              </div>
            </div>
          </div>
        </div>

        {/* ── NEWSLETTER ── */}
 

        {/* ── BOTTOM BAR ── */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            © {new Date().getFullYear()} The Thoughtful Nurse · Made with <span>❤️</span> for every girl & her mum
          </div>
         
        </div>

      </footer>
    </>
  );
}