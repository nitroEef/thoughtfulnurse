// ─────────────────────────────────────────────────────────────────
//  ResourceSection.jsx  —  The Thoughtful Nurse
//  Drop this into your homepage wherever you want it.
//
//  ⬇ Replace the two constants below before going live:
// ─────────────────────────────────────────────────────────────────
const DRIVE_LINK = "https://drive.google.com/your-link-here"; // ← your Google Drive URL
const VIDEO_SRC  = "/videos/resource-bg.mp4";                 // ← your video file path
//                  (or use a public CDN URL if you prefer)
// ─────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

  /* ── SECTION SHELL ── */
  .resource-section {
    position: relative;
    min-height: 88vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    isolation: isolate;
  }

  /* ── VIDEO BACKGROUND ── */
  .resource-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 0;
    transform: scale(1.04);          /* slight over-scale prevents edge flicker */
    transition: transform 8s ease;
  }

  .resource-section:hover .resource-video {
    transform: scale(1);             /* slow Ken-Burns-style breathe on hover */
  }

  /* ── LAYERED OVERLAY ── */
  /* Bottom layer: rich dark base */
  .resource-overlay-base {
    position: absolute;
    inset: 0;
    background: rgba(10, 5, 5, 0.62);
    z-index: 1;
  }

  /* Middle layer: diagonal crimson wash from bottom-left */
  .resource-overlay-wash {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(192, 22, 43, 0.45) 0%,
      transparent 55%
    );
    z-index: 2;
  }

  /* Top layer: soft vignette around edges */
  .resource-overlay-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 80% 80% at 50% 50%,
      transparent 40%,
      rgba(0, 0, 0, 0.55) 100%
    );
    z-index: 3;
  }

  /* ── SHIMMER BORDER TOP ── */
  .resource-shimmer-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      #C0162B 25%,
      #D4A44C 50%,
      #C0162B 75%,
      transparent
    );
    background-size: 200% 100%;
    animation: resShimmer 3.5s linear infinite;
    z-index: 10;
  }

  .resource-shimmer-bottom {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent,
      #D4A44C 25%,
      #C0162B 50%,
      #D4A44C 75%,
      transparent
    );
    background-size: 200% 100%;
    animation: resShimmer 3.5s linear infinite reverse;
    z-index: 10;
  }

  @keyframes resShimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  /* ── CONTENT CARD ── */
  .resource-content {
    position: relative;
    z-index: 5;
    max-width: 780px;
    margin: 0 auto;
    padding: 4.5rem 3rem;
    text-align: center;
  }

  /* ── DECORATIVE QUOTE MARK  — the signature element ── */
  .resource-deco-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(7rem, 18vw, 14rem);
    font-weight: 300;
    font-style: italic;
    line-height: 0.6;
    color: rgba(192, 22, 43, 0.22);
    display: block;
    margin-bottom: -1.5rem;         /* pulls headline up into the open glyph */
    user-select: none;
    pointer-events: none;
    letter-spacing: -0.04em;
  }

  /* ── EYEBROW LABEL ── */
  .resource-label {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #D4A44C;
    margin-bottom: 1.4rem;
  }

  .resource-label-line {
    display: inline-block;
    width: 28px;
    height: 1.5px;
    background: #D4A44C;
  }

  /* ── HEADLINE ── */
  .resource-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.1rem, 5vw, 3.6rem);
    font-weight: 600;
    line-height: 1.15;
    color: #ffffff;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }

  .resource-heading em {
    font-style: italic;
    color: #D4A44C;
  }

  /* ── GOLD RULE ── */
  .resource-rule {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 1.6rem auto;
  }

  .resource-rule-line {
    width: 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, #D4A44C);
  }

  .resource-rule-line:last-child {
    background: linear-gradient(90deg, #D4A44C, transparent);
  }

  .resource-rule-diamond {
    width: 6px;
    height: 6px;
    background: #D4A44C;
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* ── BODY TEXT ── */
  .resource-body {
    font-family: 'Jost', sans-serif;
    font-size: clamp(0.88rem, 1.5vw, 1rem);
    font-weight: 300;
    line-height: 1.95;
    color: rgba(255, 255, 255, 0.82);
    max-width: 600px;
    margin: 0 auto 2.4rem;
  }

  .resource-body strong {
    color: #fff;
    font-weight: 500;
  }

  /* ── READ MORE BUTTON ── */
  .resource-cta {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    position: relative;
    padding: 16px 44px;
    border-radius: 50px;
    overflow: hidden;
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #fff;
    /* layered border: outer gold + inner crimson fill */
    background: linear-gradient(135deg, #C0162B 0%, #8B0F1E 100%);
    border: 1.5px solid rgba(212, 164, 76, 0.5);
    box-shadow:
      0 8px 32px rgba(192, 22, 43, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition:
      transform 0.3s cubic-bezier(.34,1.56,.64,1),
      box-shadow 0.3s ease,
      border-color 0.3s ease;
  }

  /* Shimmer sweep on hover */
  .resource-cta::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.18),
      transparent
    );
    transition: left 0.55s ease;
  }

  /* Gold ring reveal on hover */
  .resource-cta::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 52px;
    border: 1.5px solid transparent;
    background: linear-gradient(135deg, #D4A44C, transparent, #D4A44C) border-box;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .resource-cta:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow:
      0 16px 48px rgba(192, 22, 43, 0.6),
      0 4px 16px rgba(212, 164, 76, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    border-color: rgba(212, 164, 76, 0.9);
  }

  .resource-cta:hover::before { left: 100%; }
  .resource-cta:hover::after  { opacity: 1; }

  .resource-cta:active { transform: translateY(-1px) scale(1); }

  .resource-cta-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
  }

  .resource-cta:hover .resource-cta-icon {
    transform: translateX(4px);
  }

  /* ── STAT PILLS ── */
  .resource-pills {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 3rem;
    padding-top: 2.5rem;
    border-top: 1px solid rgba(255,255,255,0.1);
  }

  .resource-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50px;
    backdrop-filter: blur(8px);
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.06em;
    transition: background 0.2s, border-color 0.2s;
  }

  .resource-pill:hover {
    background: rgba(192, 22, 43, 0.2);
    border-color: rgba(192, 22, 43, 0.4);
    color: #fff;
  }

  .resource-pill-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #D4A44C;
    flex-shrink: 0;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .resource-content {
      padding: 4rem 1.5rem;
    }
    .resource-deco-quote {
      font-size: clamp(5rem, 22vw, 8rem);
    }
    .resource-cta {
      padding: 14px 32px;
    }
  }

  @media (max-width: 480px) {
    .resource-section { min-height: 95vh; }
    .resource-pills { gap: 0.6rem; }
    .resource-pill { font-size: 0.65rem; padding: 7px 13px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .resource-shimmer-top,
    .resource-shimmer-bottom { animation: none; }
    .resource-section:hover .resource-video { transform: scale(1.04); }
  }
`;

export default function ResourceSection() {
  return (
    <>
      <style>{styles}</style>

      <section className="resource-section" aria-label="Health Resource for Mothers">

        {/* ── VIDEO ── */}
        <video
          className="resource-video"
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />

        {/* ── OVERLAYS ── */}
        <div className="resource-overlay-base"   aria-hidden="true" />
        <div className="resource-overlay-wash"   aria-hidden="true" />
        <div className="resource-overlay-vignette" aria-hidden="true" />

        {/* ── SHIMMER BORDERS ── */}
        <div className="resource-shimmer-top"    aria-hidden="true" />
        <div className="resource-shimmer-bottom" aria-hidden="true" />

        {/* ── CONTENT ── */}
        <div className="resource-content">

          {/* Giant decorative quote — the signature element */}
          <span className="resource-deco-quote" aria-hidden="true">"</span>

          {/* Eyebrow */}
          <div className="resource-label">
            <span className="resource-label-line" />
            Free Resource
            <span className="resource-label-line" />
          </div>

          {/* Headline */}
          <h2 className="resource-heading">
            What Every Mother Should Know<br />
            for Her <em>Daughter's</em> Early Health
          </h2>

          {/* Gold divider */}
          <div className="resource-rule" aria-hidden="true">
            <span className="resource-rule-line" />
            <span className="resource-rule-diamond" />
            <span className="resource-rule-line" />
          </div>

          {/* Body copy */}
          <p className="resource-body">
            From puberty to emotional wellbeing, the early years are a window of opportunity
            that every mother deserves to understand. This guide — written from the heart
            of a nurse and a fellow woman — walks you through the <strong>key conversations,
            health checks, and habits</strong> that set your daughter up for a lifetime of
            confidence and wellness. Simple. Honest. Actionable.
          </p>

         
{/* CTA */}
<a
  href="https://docs.google.com/document/d/14pMdU3w4iYP_tP6qddV0_ZSMKU9tfhz8tICsrXtYoEA/edit?usp=drivesdk"
  target="_blank"
  rel="noopener noreferrer"
  className="resource-cta"
  aria-label="Read the full guide on Google Drive"
>
  <span>Read the Full Guide</span>

  <svg
    className="resource-cta-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
</a>

          {/* Trust pills */}
          <div className="resource-pills">
            <div className="resource-pill">
              <span className="resource-pill-dot" />
              Free to Read
            </div>
            <div className="resource-pill">
              <span className="resource-pill-dot" />
              Written by a Nurse
            </div>
            <div className="resource-pill">
              <span className="resource-pill-dot" />
              No Sign-up Required
            </div>
            <div className="resource-pill">
              <span className="resource-pill-dot" />
              Shareable with Other Mums
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

