const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .hero {
    position: relative;
    min-height: 100vh;
    background: #fff;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 120px 2.5rem 80px;
  }

  .hero-bg-circle-1 {
    position: absolute;
    top: -120px; right: -120px;
    width: 550px; height: 550px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.07) 0%, transparent 70%);
    animation: floatA 8s ease-in-out infinite;
    pointer-events: none;
  }

  .hero-bg-circle-2 {
    position: absolute;
    bottom: -80px; left: -80px;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.05) 0%, transparent 70%);
    animation: floatB 10s ease-in-out infinite;
    pointer-events: none;
  }

  .hero-cross-bg {
    position: absolute;
    top: 50%; right: 6%;
    transform: translateY(-50%);
    opacity: 0.04;
    pointer-events: none;
    animation: rotateSlow 30s linear infinite;
  }

  @keyframes rotateSlow {
    from { transform: translateY(-50%) rotate(0deg); }
    to   { transform: translateY(-50%) rotate(360deg); }
  }

  @keyframes floatA {
    0%, 100% { transform: translate(0, 0); }
    50%       { transform: translate(-20px, 20px); }
  }

  @keyframes floatB {
    0%, 100% { transform: translate(0, 0); }
    50%       { transform: translate(20px, -20px); }
  }

  .hero-inner {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .hero-left { display: flex; flex-direction: column; gap: 1.8rem; }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #FDEAEC;
    border: 1px solid rgba(192,22,43,0.2);
    border-radius: 40px;
    padding: 6px 16px;
    width: fit-content;
    animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both;
  }

  .hero-badge-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #C0162B;
    animation: pulseDot 2s ease-in-out infinite;
  }

  @keyframes pulseDot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.4); opacity: 0.7; }
  }

  .hero-badge span {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #C0162B;
  }

  .hero-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 4.5vw, 3.8rem);
    font-weight: 600;
    line-height: 1.15;
    color: #1a1a1a;
    animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }

  .hero-heading .accent { color: #C0162B; font-style: italic; }

  .hero-sub {
    font-family: 'Jost', sans-serif;
    font-size: 1rem; font-weight: 400;
    color: #666; line-height: 1.8;
    animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }

  .hero-roles {
    display: flex; flex-wrap: wrap; gap: 10px;
    animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both;
  }

  .hero-role-tag {
    display: flex; align-items: center; gap: 6px;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem; font-weight: 500;
    color: #8B0F1F;
    background: #fff;
    border: 1px solid rgba(192,22,43,0.25);
    border-radius: 30px;
    padding: 5px 14px;
    transition: background 0.2s, transform 0.2s;
  }

  .hero-role-tag:hover { background: #FDEAEC; transform: translateY(-2px); }
  .hero-role-tag svg { width: 13px; height: 13px; }

  .hero-cta-row {
    display: flex; align-items: center; gap: 1.2rem; flex-wrap: wrap;
    animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.45s both;
  }

  .hero-btn-primary {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: white; background: #C0162B;
    border: none; padding: 14px 32px;
    border-radius: 40px; cursor: pointer;
    text-decoration: none;
    position: relative; overflow: hidden;
    box-shadow: 0 6px 24px rgba(192,22,43,0.35);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .hero-btn-primary::before {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .hero-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(192,22,43,0.45); }
  .hero-btn-primary:hover::before { left: 100%; }

  .hero-btn-secondary {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #C0162B; background: transparent;
    border: 1.5px solid rgba(192,22,43,0.4);
    padding: 13px 28px; border-radius: 40px;
    cursor: pointer; text-decoration: none;
    transition: all 0.25s ease;
  }

  .hero-btn-secondary:hover {
    background: #FDEAEC;
    border-color: #C0162B;
    transform: translateY(-2px);
  }

  .hero-stat-row {
    display: flex; align-items: center; gap: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(192,22,43,0.1);
    animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s both;
  }

  .hero-stat { display: flex; flex-direction: column; }

  .hero-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 600;
    color: #C0162B; line-height: 1;
  }

  .hero-stat-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem; font-weight: 500;
    color: #999; letter-spacing: 0.1em;
    text-transform: uppercase; margin-top: 4px;
  }

  .hero-stat-divider {
    width: 1px; height: 40px;
    background: rgba(192,22,43,0.15);
  }

  /* Right side visual card */
  .hero-right {
    position: relative;
    display: flex; align-items: center; justify-content: center;
    animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s both;
  }

  .hero-card {
    background: linear-gradient(145deg, #fff 60%, #FDEAEC 100%);
    border: 1px solid rgba(192,22,43,0.12);
    border-radius: 24px;
    padding: 2.5rem;
    box-shadow: 0 20px 60px rgba(192,22,43,0.1), 0 4px 20px rgba(0,0,0,0.04);
    width: 100%;
    max-width: 420px;
    position: relative;
    overflow: hidden;
  }

  .hero-card::before {
    content: '';
    position: absolute;
    top: -40px; right: -40px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.08), transparent 70%);
  }

  .hero-card-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 1.8rem;
  }

  .hero-card-avatar {
    width: 60px; height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #C0162B, #8B0F1F);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 600;
    color: white;
    box-shadow: 0 6px 20px rgba(192,22,43,0.3);
    flex-shrink: 0;
  }

  .hero-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; font-weight: 600;
    color: #1a1a1a;
  }

  .hero-card-title {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem; font-weight: 500;
    color: #C0162B; letter-spacing: 0.08em;
    text-transform: uppercase; margin-top: 2px;
  }

  .hero-card-pillars {
    display: flex; flex-direction: column; gap: 10px;
  }

  .hero-card-pillar {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px;
    background: white;
    border-radius: 12px;
    border: 1px solid rgba(192,22,43,0.08);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .hero-card-pillar:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 16px rgba(192,22,43,0.08);
  }

  .hero-card-pillar-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #C0162B;
    flex-shrink: 0;
  }

  .hero-card-pillar span {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem; font-weight: 500;
    color: #444;
  }

  .hero-floating-badge {
    position: absolute;
    bottom: -18px; left: -18px;
    background: white;
    border: 1px solid rgba(192,22,43,0.15);
    border-radius: 16px;
    padding: 12px 18px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.08);
    display: flex; align-items: center; gap: 10px;
    animation: floatBadge 4s ease-in-out infinite;
  }

  @keyframes floatBadge {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }

  .hero-floating-badge-icon {
    width: 36px; height: 36px;
    background: #FDEAEC;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
  }

  .hero-floating-badge-icon svg { width: 18px; height: 18px; }

  .hero-floating-badge-text { display: flex; flex-direction: column; }

  .hero-floating-badge-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; font-weight: 600;
    color: #C0162B; line-height: 1;
  }

  .hero-floating-badge-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem; color: #888;
    letter-spacing: 0.08em; text-transform: uppercase;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
    .hero-right { order: -1; }
    .hero-card { max-width: 100%; }
    .hero { padding: 100px 1.5rem 60px; }
    .hero-cross-bg { display: none; }
  }

  @media (max-width: 480px) {
    .hero { padding: 90px 1rem 50px; }
    .hero-stat-row { gap: 1.2rem; }
    .hero-cta-row { flex-direction: column; align-items: flex-start; }
    .hero-btn-primary, .hero-btn-secondary { width: 100%; text-align: center; }
  }
`;

const pillars = [
  "Period Education for Girls",
  "Puberty Education",
  "Parent Guidance",
  "Women's Health",
  "Menstrual Hygiene",
  "Health Literacy",
];

const roles = [
  {
    label: "Health Educator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    label: "Registered Nurse",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="11" y="3" width="2" height="18" rx="1"/>
        <rect x="3" y="11" width="18" height="2" rx="1"/>
      </svg>
    ),
  },
  {
    label: "Mum",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    label: "Content Creator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <>
      <style>{styles}</style>
      <section className="hero" id="home">
        <div className="hero-bg-circle-1" />
        <div className="hero-bg-circle-2" />

        {/* Giant decorative cross */}
        <div className="hero-cross-bg">
          <svg width="500" height="500" viewBox="0 0 100 100">
            <rect x="42" y="5" width="16" height="90" rx="4" fill="#C0162B"/>
            <rect x="5" y="42" width="90" height="16" rx="4" fill="#C0162B"/>
          </svg>
        </div>

        <div className="hero-inner">
          {/* LEFT */}
          <div className="hero-left">
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              <span>Health Education &amp; Empowerment</span>
            </div>

            <h1 className="hero-heading">
              Helping Girls Understand Their Bodies{" "}
              <span className="accent">Before</span> Their First Period
            </h1>

            <p className="hero-sub">
              Join a growing community of over <strong>4,000 people</strong> across Instagram and TikTok
              who believe every girl deserves to understand her body with confidence.
            </p>

            <div className="hero-roles">
              {roles.map((r) => (
                <div key={r.label} className="hero-role-tag">
                  {r.icon}
                  {r.label}
                </div>
              ))}
            </div>

            <div className="hero-cta-row">
              <a href="#collaborate" className="hero-btn-primary">Work With Me</a>
              <a href="#about" className="hero-btn-secondary">Learn More</a>
            </div>

            <div className="hero-stat-row">
              <div className="hero-stat">
                <span className="hero-stat-num">4K+</span>
                <span className="hero-stat-label">Community</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">2</span>
                <span className="hero-stat-label">Platforms</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">7</span>
                <span className="hero-stat-label">Content Pillars</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right">
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hero-card-avatar">AJ</div>
                <div>
                  <div className="hero-card-name">Abiodun Jelilat Salaudeen</div>
                  <div className="hero-card-title">The Thoughtful Nurse</div>
                </div>
              </div>

              <div className="hero-card-pillars">
                {pillars.map((p) => (
                  <div key={p} className="hero-card-pillar">
                    <div className="hero-card-pillar-dot" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-floating-badge">
              <div className="hero-floating-badge-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div className="hero-floating-badge-text">
                <span className="hero-floating-badge-num">4,000+</span>
                <span className="hero-floating-badge-label">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}