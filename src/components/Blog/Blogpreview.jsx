import { useState, useEffect, useRef } from "react";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&family=Lato:wght@300;400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --teal: #1b4f4a;
  --teal-mid: #2a7068;
  --teal-light: #e6f4f1;
  --rose: #c2606a;
  --rose-light: #f9ecee;
  --blush: #f4d4d8;
  --cream: #fdf8f5;
  --ink: #1c1c1c;
  --muted: #5e6e6c;
  --border: rgba(27,79,74,0.12);
}

body { background: var(--cream); }

.root {
  min-height: 100vh;
  font-family: 'Lato', sans-serif;
  color: var(--ink);
  background: var(--cream);
  position: relative;
  overflow-x: hidden;
}

/* ── PETALS ── */
.petals-layer {
  position: fixed; inset: 0; z-index: 0;
  pointer-events: none; overflow: hidden;
}
.petal {
  position: absolute;
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  opacity: 0;
  animation: petalFall linear infinite;
}
@keyframes petalFall {
  0%   { opacity: 0; transform: translateY(-40px) rotate(0deg) scale(0.6); }
  10%  { opacity: 0.55; }
  90%  { opacity: 0.3; }
  100% { opacity: 0; transform: translateY(110vh) rotate(380deg) scale(1); }
}

/* ── PAGE ── */
.page {
  position: relative; z-index: 1;
  max-width: 800px; margin: 0 auto;
  padding: 3.5rem 1.5rem 6rem;
}

/* ── HERO ── */
.hero {
  text-align: center;
  margin-bottom: 3rem;
  padding: 0;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 16px;
  border-radius: 40px;
  border: 1px solid var(--blush);
  background: var(--rose-light);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--rose);
  margin-bottom: 1.3rem;
  max-width: 90%;
  white-space: normal;
  text-align: center;
  line-height: 1.5;
  opacity: 0;
  animation: riseIn 0.7s 0.2s ease forwards;
}
.badge-dot {
  width: 6px; height: 6px; flex-shrink: 0;
  border-radius: 50%; background: var(--rose);
  animation: breathe 2.2s ease-in-out infinite;
}
@keyframes breathe {
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.6); opacity: 0.4; }
}

.hero-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 5.5vw, 3.4rem);
  font-weight: 700;
  line-height: 1.18;
  color: var(--teal);
  margin-bottom: 1rem;
  word-break: normal;
  overflow-wrap: break-word;
  opacity: 0;
  animation: riseIn 0.9s 0.4s ease forwards;
}
.hero-title span {
  display: block;
  font-style: italic;
  color: var(--rose);
}

.hero-lead {
  font-size: clamp(0.93rem, 2.4vw, 1.05rem);
  color: var(--muted);
  line-height: 1.78;
  max-width: 520px;
  margin: 0 auto;
  opacity: 0;
  animation: riseIn 0.8s 0.7s ease forwards;
}

/* ── HEARTBEAT ── */
.hb-wrap {
  margin: 1.8rem 0 2.2rem;
  opacity: 0;
  animation: riseIn 0.7s 1s ease forwards;
  overflow: hidden;
}
.hb-path {
  stroke-dasharray: 900; stroke-dashoffset: 900;
  animation: drawHb 2.6s 1.2s ease forwards;
}
@keyframes drawHb { to { stroke-dashoffset: 0; } }
.hb-heart {
  opacity: 0;
  animation: popIn 0.5s 3.8s cubic-bezier(0.34,1.56,0.64,1) forwards;
}
@keyframes popIn {
  from { opacity:0; transform: scale(0.3); }
  to   { opacity:1; transform: scale(1); }
}

/* ── CARD ── */
.card {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: 0 10px 50px rgba(27,79,74,0.08), 0 2px 8px rgba(27,79,74,0.04);
  overflow: hidden;
  opacity: 0;
  animation: riseIn 1s 1.3s ease forwards;
}
.card-accent {
  height: 5px;
  background: linear-gradient(90deg, var(--teal) 0%, var(--teal-mid) 40%, var(--rose) 100%);
}
.card-body {
  padding: 2.2rem 2.4rem;
}

/* ── INTRO ── */
.intro-quote {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.4rem, 6vw, 3.4rem);
  line-height: 0.65;
  color: var(--blush);
  float: left;
  margin-right: 5px;
  margin-top: 8px;
  user-select: none;
}
.intro-text {
  font-size: clamp(0.93rem, 2.3vw, 1rem);
  line-height: 1.9;
  color: #2a2a2a;
}
.intro-text strong { color: var(--teal); font-weight: 700; }

/* ── READ MORE ── */
.readmore-btn {
  display: inline-flex; align-items: center; gap: 10px;
  margin-top: 1.6rem; background: none; border: none;
  cursor: pointer; padding: 0; font-family: 'Lato', sans-serif;
}
.readmore-label {
  font-size: 0.88rem; font-weight: 700; color: var(--teal);
  letter-spacing: 0.06em; border-bottom: 2px solid var(--blush);
  padding-bottom: 2px; transition: color 0.25s, border-color 0.25s;
}
.readmore-btn:hover .readmore-label { color: var(--rose); border-color: var(--rose); }
.readmore-icon {
  width: 28px; height: 28px; border-radius: 50%; background: var(--teal);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: background 0.3s, transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
}
.readmore-btn:hover .readmore-icon { background: var(--rose); }
.readmore-icon.flipped { transform: rotate(180deg); }

/* ── EXPAND ── */
.expand-wrap { max-height: 0; overflow: hidden; transition: max-height 1.1s cubic-bezier(0.4,0,0.2,1); }
.expand-wrap.open { max-height: 4000px; }
.expand-inner { padding-top: 2rem; }

/* ── SECTION HEADER ── */
.section-header {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 1rem; margin-top: 2rem; flex-wrap: nowrap;
}
.section-header:first-child { margin-top: 0; }
.section-icon {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 0.9rem;
}
.section-icon.teal { background: var(--teal-light); }
.section-icon.rose { background: var(--rose-light); }
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1rem, 3vw, 1.15rem);
  font-weight: 700; color: var(--teal);
  flex-shrink: 1; min-width: 0;
}
.section-line {
  flex: 1; min-width: 16px; height: 1px;
  background: linear-gradient(90deg, var(--border), transparent);
}

/* ── PARAGRAPHS ── */
.para { font-size: 0.97rem; line-height: 1.9; color: #333; margin-bottom: 1.1rem; }
.para:last-child { margin-bottom: 0; }
.para strong { color: var(--teal); font-weight: 700; }
.para em { color: var(--rose); font-style: italic; }

/* ── GLOW BOX ── */
.glow-box {
  position: relative; border-radius: 16px;
  padding: 1.8rem; margin: 1.6rem 0; overflow: hidden;
  background: linear-gradient(145deg, #f0faf7 0%, #fceef0 100%);
  border: 1px solid rgba(192,96,106,0.18);
}
.glow-box::before {
  content: ''; position: absolute; top: -60px; right: -60px;
  width: 160px; height: 160px; border-radius: 50%;
  background: radial-gradient(circle, rgba(244,212,216,0.5), transparent 70%);
  pointer-events: none;
}
.glow-box-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(0.95rem, 3vw, 1.15rem);
  font-weight: 700; color: var(--teal); margin-bottom: 1.1rem;
  display: flex; align-items: flex-start; gap: 10px;
  line-height: 1.4;
}
.glow-box-icon {
  width: 36px; height: 36px; min-width: 36px; background: white;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  border: 1.5px solid var(--blush); font-size: 1.1rem; flex-shrink: 0;
  margin-top: 1px;
}
.glow-box p { font-size: 0.97rem; line-height: 1.88; color: #333; margin-bottom: 0.9rem; }
.glow-box p:last-child { margin-bottom: 0; }
.glow-box p strong { color: var(--teal); font-weight: 700; }
.glow-box p em { color: var(--rose); font-style: italic; }

/* ── PILLS ── */
.pills-wrap { display: flex; flex-wrap: wrap; gap: 8px; margin: 1.1rem 0; }
.pill {
  padding: 5px 13px; border-radius: 30px;
  font-size: 0.78rem; font-weight: 700; letter-spacing: 0.03em; border: 1px solid;
  opacity: 0; transform: translateY(10px);
  animation: pillPop 0.5s ease forwards;
  white-space: nowrap;
}
.pill.teal { background: var(--teal-light); color: var(--teal); border-color: rgba(27,79,74,0.2); }
.pill.rose { background: var(--rose-light); color: var(--rose); border-color: rgba(194,96,106,0.2); }
@keyframes pillPop { to { opacity: 1; transform: translateY(0); } }

/* ── MOM BOX ── */
.mom-box {
  display: flex; gap: 1rem; background: white;
  border-radius: 14px; padding: 1.4rem 1.6rem;
  border: 1px solid var(--border); margin: 1.6rem 0; align-items: flex-start;
}
.mom-box-icons {
  display: flex; flex-direction: column; align-items: center;
  gap: 0; flex-shrink: 0; padding-top: 2px;
}
.mom-icon { font-size: 1.7rem; line-height: 1.2; }
.mom-connect { width: 2px; height: 18px; background: linear-gradient(180deg, var(--blush), var(--rose)); border-radius: 2px; margin: 2px 0; }
.girl-icon { font-size: 1.4rem; line-height: 1.2; }
.mom-box-title { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: var(--teal); margin-bottom: 0.6rem; }
.mom-box-body { font-size: 0.94rem; line-height: 1.85; color: #444; }
.mom-box-body strong { color: var(--teal); font-weight: 700; }
.mom-box-body em { color: var(--rose); font-style: italic; }

/* ── CAUTION ── */
.caution-box {
  background: var(--teal-light); border-left: 4px solid var(--teal);
  border-radius: 0 12px 12px 0; padding: 1.3rem 1.4rem; margin: 1.6rem 0;
}
.caution-box p { font-size: 0.94rem; line-height: 1.82; color: #2a3a38; }
.caution-box p strong { color: var(--teal); font-weight: 700; }

/* ── CLOSING ── */
.closing {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: clamp(0.95rem, 2.5vw, 1.05rem); color: var(--muted); text-align: center;
  margin-top: 1.8rem; padding-top: 1.6rem;
  border-top: 1px dashed rgba(27,79,74,0.18); line-height: 1.75;
}
.closing strong { color: var(--rose); font-style: normal; font-weight: 700; }

/* ── FOOTER ── */
.footer-note {
  text-align: center; font-size: 0.78rem; color: var(--muted);
  font-style: italic; margin-top: 2.5rem; padding: 0 1rem;
  opacity: 0; animation: riseIn 0.6s 2s ease forwards;
}

/* ── ANIMATIONS ── */
@keyframes riseIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.visible { opacity: 1; transform: none; }

/* ── TABLET (max 768px) ── */
@media (max-width: 768px) {
  .page { padding: 2.8rem 1.4rem 5rem; }
  .card-body { padding: 2rem 2rem; }
  .hero { margin-bottom: 2.4rem; }
  .glow-box { padding: 1.6rem 1.5rem; }
  .mom-box { padding: 1.3rem 1.4rem; }
}

/* ── MOBILE (max 540px) ── */
@media (max-width: 540px) {
  .page { padding: 2.2rem 1.1rem 4.5rem; }

  /* Hero */
  .hero { margin-bottom: 2rem; }
  .badge {
    font-size: 0.62rem;
    letter-spacing: 0.07em;
    padding: 6px 14px;
    max-width: 100%;
  }
  .hero-title {
    font-size: clamp(1.65rem, 7.5vw, 2.2rem);
    line-height: 1.22;
  }
  .hero-title br { display: none; }
  .hero-lead { font-size: 0.92rem; line-height: 1.72; }
  .hb-wrap { margin: 1.4rem 0 1.8rem; }

  /* Card */
  .card { border-radius: 16px; }
  .card-body { padding: 1.5rem 1.3rem; }
  .intro-quote { font-size: 2.4rem; margin-right: 4px; margin-top: 6px; }
  .intro-text { font-size: 0.93rem; line-height: 1.85; }

  /* Sections */
  .section-header { gap: 8px; margin-top: 1.8rem; }
  .section-icon { width: 30px; height: 30px; font-size: 0.85rem; }
  .section-title { font-size: 0.97rem; }
  .section-line { display: none; }

  /* Glow box */
  .glow-box { padding: 1.3rem 1.2rem; border-radius: 14px; margin: 1.4rem 0; }
  .glow-box-title { font-size: 0.96rem; gap: 8px; flex-wrap: nowrap; align-items: flex-start; }
  .glow-box-icon { width: 32px; height: 32px; min-width: 32px; font-size: 1rem; }
  .glow-box p { font-size: 0.92rem; line-height: 1.82; }

  /* Pills */
  .pills-wrap { gap: 6px; margin: 1rem 0; }
  .pill { font-size: 0.75rem; padding: 5px 11px; white-space: normal; }

  /* Mom box */
  .mom-box { flex-direction: row; padding: 1.1rem 1.1rem; gap: 0.9rem; border-radius: 12px; margin: 1.4rem 0; }
  .mom-box-title { font-size: 0.95rem; }
  .mom-box-body { font-size: 0.89rem; line-height: 1.8; }

  /* Paragraphs */
  .para { font-size: 0.92rem; line-height: 1.86; }

  /* Caution */
  .caution-box { padding: 1.1rem 1.2rem; }
  .caution-box p { font-size: 0.9rem; }

  /* Closing & footer */
  .closing { font-size: 0.92rem; line-height: 1.7; }
  .footer-note { font-size: 0.75rem; margin-top: 2rem; }

  /* Read more btn */
  .readmore-btn { margin-top: 1.4rem; }
  .readmore-label { font-size: 0.85rem; }
  .expand-inner { padding-top: 1.5rem; }
}

/* ── VERY SMALL (max 380px) ── */
@media (max-width: 380px) {
  .page { padding: 1.8rem 0.9rem 4rem; }
  .card-body { padding: 1.3rem 1.1rem; }
  .badge { font-size: 0.59rem; padding: 5px 12px; letter-spacing: 0.06em; }
  .hero-title { font-size: 1.55rem; line-height: 1.25; }
  .hero-lead { font-size: 0.88rem; }
  .glow-box { padding: 1.1rem 1rem; }
  .mom-box { padding: 1rem 0.9rem; }
  .pill { font-size: 0.72rem; padding: 4px 10px; }
}
`;

const petalConfig = [
  { left:'8%',  delay:'0s',   dur:'9s',  size:14, color:'#f4d4d8' },
  { left:'20%', delay:'2.5s', dur:'12s', size:10, color:'#e6f4f1' },
  { left:'35%', delay:'1s',   dur:'10s', size:16, color:'#fce8ea' },
  { left:'52%', delay:'4s',   dur:'8s',  size:12, color:'#c2e8df' },
  { left:'65%', delay:'0.5s', dur:'13s', size:9,  color:'#f4d4d8' },
  { left:'78%', delay:'3s',   dur:'11s', size:15, color:'#e6f4f1' },
  { left:'90%', delay:'1.8s', dur:'9.5s',size:11, color:'#fce8ea' },
  { left:'45%', delay:'6s',   dur:'10s', size:8,  color:'#f4c2c8' },
  { left:'15%', delay:'7s',   dur:'14s', size:13, color:'#d4ede8' },
  { left:'70%', delay:'5s',   dur:'11s', size:10, color:'#f4d4d8' },
];

const topics = [
  { label: 'Menstrual health', type: 'teal' },
  { label: 'Body changes & puberty', type: 'rose' },
  { label: 'Reproductive awareness', type: 'teal' },
  { label: 'Hormones & mood', type: 'rose' },
  { label: 'Personal hygiene', type: 'teal' },
  { label: 'Emotional wellbeing', type: 'rose' },
  { label: 'Consent & boundaries', type: 'teal' },
  { label: 'Nutrition for girls', type: 'rose' },
  { label: 'Safe conversations', type: 'teal' },
  { label: 'When to seek help', type: 'rose' },
];

export default function NursePortfolioNote() {
  const [open, setOpen] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(false);
  const revealRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setPillsVisible(true), 500);
    return () => clearTimeout(t);
  }, [open]);

  const r = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); };

  return (
    <>
      <style>{css}</style>
      <div className="root">
        <div className="petals-layer">
          {petalConfig.map((p, i) => (
            <div key={i} className="petal" style={{
              left: p.left, top: '-40px',
              width: p.size + 'px', height: Math.round(p.size * 1.3) + 'px',
              background: p.color, animationDelay: p.delay, animationDuration: p.dur,
            }} />
          ))}
        </div>

        <div className="page">
          <div className="hero">
            <div className="badge">
              <span className="badge-dot" />
              The Thoughtful Nurse · Portfolio Note
            </div>
            <h1 className="hero-title">
              A Safe Space{' '}
              <span>Starts With a Conversation</span>
            </h1>
            <p className="hero-lead">
              What every young girl deserves to know — and what every mother should feel empowered to say.
            </p>
            <div className="hb-wrap">
              <svg width="100%" viewBox="0 0 700 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="hbg" x1="0" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1b4f4a" />
                    <stop offset="55%" stopColor="#2a7068" />
                    <stop offset="100%" stopColor="#c2606a" />
                  </linearGradient>
                </defs>
                <path className="hb-path"
                  d="M0 31 L80 31 L95 31 L105 12 L118 54 L131 8 L144 50 L157 31 L260 31 L272 31 L282 14 L294 52 L306 10 L318 49 L330 31 L430 31 L442 31 L453 10 L467 55 L481 7 L495 50 L509 31 L700 31"
                  stroke="url(#hbg)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                />
                <text className="hb-heart" x="350" y="26" textAnchor="middle" fontSize="18" fill="#c2606a">♥</text>
              </svg>
            </div>
          </div>

          <div className="card">
            <div className="card-accent" />
            <div className="card-body">
              <p className="intro-text">
                <span className="intro-quote">"</span>
                This portfolio is more than credentials on a screen. It is a
                <strong> deliberate act of care</strong> — built for young girls who are growing,
                changing, and searching for answers; and for the mothers who love them fiercely
                but sometimes don't know where to begin. You will find honesty here. You will find
                warmth. And you will find the words that make hard conversations feel a little more possible.
              </p>

              <button className="readmore-btn" onClick={() => setOpen(v => !v)} aria-expanded={open}>
                <span className="readmore-label">{open ? 'Read less' : 'Read more'}</span>
                <span className={`readmore-icon${open ? ' flipped' : ''}`}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2.5 4.5L6.5 8.5L10.5 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <div className={`expand-wrap${open ? ' open' : ''}`}>
                <div className="expand-inner">

                  <div className="section-header reveal" ref={r}>
                    <div className="section-icon teal">🌿</div>
                    <span className="section-title">What This Space Is</span>
                    <span className="section-line" />
                  </div>
                  <p className="para reveal" ref={r}>
                    This is a <strong>health education space</strong> rooted in nursing knowledge and
                    genuine human empathy. You won't find clinical coldness here. What you'll find are
                    clear, honest, age-appropriate explanations of what it means to grow into a woman's
                    body — the changes that come, the feelings they bring, and the questions that don't
                    always have easy answers.
                  </p>
                  <p className="para reveal" ref={r}>
                    I built this because too many young girls navigate some of the most significant
                    moments of their physical lives <em>alone</em> — armed with half-truths from friends,
                    confusing internet searches, or the quiet of a home where bodies were never discussed.
                    That silence is what this space exists to break.
                  </p>

                  <div className="glow-box reveal" ref={r}>
                    <div className="glow-box-title">
                      <div className="glow-box-icon">🌸</div>
                      Young Girls' Bodies — What Every Girl Deserves to Know
                    </div>
                    <p>
                      A young girl's body is not a mystery to be feared or a topic to be whispered about.
                      <strong> It is her home.</strong> The more she understands it, the more confidently
                      and safely she can live in it. From the first signs of puberty — the tenderness
                      in her chest, the new curves, the emotions that arrive without warning — to
                      understanding her menstrual cycle, to knowing that discharge is normal and cramps
                      can be managed: <em>this knowledge is not optional. It is essential.</em>
                    </p>
                    <p>
                      No girl should learn that her period has arrived by being frightened and alone.
                      No girl should feel shame about her changing shape. No girl should guess why her
                      mood swings with her hormones, or wonder in silence whether something happening
                      to her body is normal. <strong>She deserves clear, warm, honest answers</strong> —
                      and this portfolio exists to provide them.
                    </p>
                    <p>Topics you will find here include:</p>
                    {pillsVisible && (
                      <div className="pills-wrap">
                        {topics.map((t, i) => (
                          <span key={t.label} className={`pill ${t.type}`} style={{ animationDelay: `${i * 0.07}s` }}>
                            {t.label}
                          </span>
                        ))}
                      </div>
                    )}
                    <p>
                      Because a girl who understands her body is a girl who can protect it —
                      speak up for it — and love it. <strong>That is not a privilege. That is a right.</strong>
                    </p>
                  </div>

                  <div className="section-header reveal" ref={r} style={{marginTop:'2.2rem'}}>
                    <div className="section-icon rose">💛</div>
                    <span className="section-title">Mama, This Is Also For You</span>
                    <span className="section-line" />
                  </div>

                  <div className="mom-box reveal" ref={r}>
                    <div className="mom-box-icons">
                      <span className="mom-icon">👩</span>
                      <div className="mom-connect" />
                      <span className="girl-icon">👧</span>
                    </div>
                    <div className="mom-box-content">
                      <div className="mom-box-title">The conversation that changes everything</div>
                      <p className="mom-box-body">
                        A mother doesn't need to have all the answers. She needs to be
                        the person her daughter <strong>knows she can come to</strong> — without
                        fear of embarrassment, dismissal, or shame. <em>That open door is
                        worth more than any textbook.</em>
                      </p>
                    </div>
                  </div>

                  <p className="para reveal" ref={r}>
                    Many mothers want to have these conversations — but were never given the language,
                    the permission, or the confidence to start. Maybe your own mother never spoke openly
                    with you. Maybe bodies in your home were treated as private to the point of silence.
                    Maybe you worry about saying the wrong thing, or saying too much, or not enough.
                    <strong> That anxiety is understandable. And that cycle can stop with you.</strong>
                  </p>
                  <p className="para reveal" ref={r}>
                    Your daughter doesn't need a perfect speech. She needs a mother who
                    <em> stays in the room</em> when things get uncomfortable. Who says "I don't know,
                    but let's find out together." Who notices when something has changed — in her body,
                    in her mood, in her confidence — and asks <em>gently</em> rather than assuming. Who
                    normalises the word "period" and the word "vulva" and the word "feelings" so that
                    her daughter grows up knowing those words belong to her, not to shame.
                    <strong> That presence is a form of healthcare.</strong>
                  </p>
                  <p className="para reveal" ref={r}>
                    This portfolio will help you find the words. What to say when your daughter gets her
                    first period. How to explain that her changing shape is not something to hide or fix.
                    How to talk about emotional health without making her feel broken. How to create the
                    kind of relationship where she comes to you first — before the internet, before friends,
                    before silence swallows the question whole.
                  </p>

                  <div className="section-header reveal" ref={r} style={{marginTop:'2.2rem'}}>
                    <div className="section-icon teal">🛡️</div>
                    <span className="section-title">Every Girl Needs a Safe Place</span>
                    <span className="section-line" />
                  </div>
                  <p className="para reveal" ref={r}>
                    Girls who can speak openly with a trusted adult about their bodies <strong>make safer
                    decisions, seek help earlier, and carry a stronger sense of self</strong> through
                    adolescence and beyond. Safety in a relationship doesn't mean that nothing difficult
                    is ever discussed. It means that difficult things can be discussed <em>without fear</em> —
                    without shame, without ridicule, without consequence.
                  </p>
                  <p className="para reveal" ref={r}>
                    A young girl's safe place might be her mother, her aunt, an older sister, a trusted
                    school nurse. But it must be <em>someone</em>. Someone who will not laugh at her
                    questions. Someone who will not make her feel dirty for being curious about her own
                    body. Someone who will look her in the eye and say — plainly, warmly, without a flinch:
                    <strong> "You can always come to me. Your body is not something to be ashamed of."</strong>
                  </p>
                  <p className="para reveal" ref={r}>
                    If you are a mother reading this — that someone can be you. Not a perfect mother.
                    Not an all-knowing nurse. Just a woman who decided that her daughter would grow up
                    knowing she was never alone in her body. This space will help you become that person —
                    with knowledge, with language, and with the quiet confidence to hold space for questions
                    that matter.
                  </p>

                  <div className="caution-box reveal" ref={r}>
                    <p>
                      <strong>A note of care:</strong> The content in this portfolio is educational —
                      designed to support informed conversations between caregivers and young girls,
                      not to replace the guidance of a qualified healthcare provider. If your daughter
                      experiences unusual pain, irregular or absent periods, emotional distress beyond
                      ordinary adolescence, or anything that concerns you — please take her to a
                      professional. Early attention to a young girl's health can make a lifelong difference.
                    </p>
                  </div>

                  <p className="closing reveal" ref={r}>
                    To every girl still figuring it out —{' '}
                    <strong>you are not alone.</strong>
                    <br />
                    To every mother who wants to do better than what she was given —{' '}
                    <strong>you already are.</strong>
                    <br /><br />
                    Welcome. This space was made for both of you.
                  </p>

                </div>
              </div>
            </div>
          </div>

          <p className="footer-note">
            ✦ This portfolio reflects the professional perspective of its author and is for educational purposes only.
          </p>
        </div>
      </div>
    </>
  );
}
