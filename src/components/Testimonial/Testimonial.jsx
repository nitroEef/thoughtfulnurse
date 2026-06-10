import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .testi {
    position: relative;
    padding: 100px 2.5rem;
    background: linear-gradient(160deg, #fff 60%, #fdf0f1 100%);
    overflow: hidden;
  }

  /* ── decorative background elements ── */
  .testi-bg-cross {
    position: absolute;
    top: 50%; left: -60px;
    transform: translateY(-50%);
    opacity: 0.03;
    pointer-events: none;
    animation: rotateSlow 40s linear infinite;
  }
  @keyframes rotateSlow {
    to { transform: translateY(-50%) rotate(360deg); }
  }

  .testi-bg-circle {
    position: absolute;
    top: -120px; right: -120px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.06), transparent 70%);
    pointer-events: none;
    animation: breathe 8s ease-in-out infinite;
  }
  @keyframes breathe {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.08); }
  }

  .testi-bg-circle-2 {
    position: absolute;
    bottom: -80px; left: 10%;
    width: 350px; height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.04), transparent 70%);
    pointer-events: none;
  }

  .testi-stripe {
    position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, #C0162B 30%, #D4A44C 60%, #C0162B 80%, transparent);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  /* ── header ── */
  .testi-inner { max-width: 1100px; margin: 0 auto; }

  .testi-header { text-align: center; margin-bottom: 3.5rem; }

  .testi-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #C0162B; margin-bottom: 1rem;
  }
  .testi-label-line {
    display: inline-block; width: 28px; height: 1.5px; background: #C0162B;
  }

  .testi-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 600; line-height: 1.2; color: #1a1a1a;
  }
  .testi-heading em { color: #C0162B; font-style: italic; }

  .testi-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.92rem; color: #777;
    margin-top: 0.8rem; line-height: 1.7;
  }

  /* ── tiktok badge ── */
  .tiktok-source {
    display: inline-flex; align-items: center; gap: 8px;
    background: #010101; color: white;
    border-radius: 30px; padding: 6px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    margin-top: 1rem;
  }
  .tiktok-source svg { width: 14px; height: 14px; }

  /* ── carousel track ── */
  .testi-carousel-wrap {
    position: relative;
    overflow: hidden;
    border-radius: 24px;
  }

  .testi-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  /* ── single card ── */
  .testi-card {
    flex: 0 0 100%;
    padding: 2.8rem 3rem;
    background: white;
    border: 1px solid rgba(192,22,43,0.1);
    border-radius: 24px;
    box-shadow: 0 20px 60px rgba(192,22,43,0.08);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    animation: none;
  }

  .testi-card-accent {
    position: absolute;
    top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, #C0162B, #D4A44C);
  }

  .testi-card-bg-quote {
    position: absolute;
    bottom: -20px; right: 20px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14rem; font-weight: 700;
    color: rgba(192,22,43,0.04);
    line-height: 1; pointer-events: none;
    user-select: none;
  }

  /* ── quote mark ── */
  .testi-quote-icon {
    width: 44px; height: 44px;
    background: #FDEAEC;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .testi-quote-icon svg { width: 20px; height: 20px; }

  /* ── text ── */
  .testi-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    font-weight: 400; font-style: italic;
    line-height: 1.75; color: #2a2a2a;
    position: relative; z-index: 1;
  }

  /* ── author row ── */
  .testi-author {
    display: flex; align-items: center; gap: 14px;
    padding-top: 1rem;
    border-top: 1px solid rgba(192,22,43,0.08);
    position: relative; z-index: 1;
  }

  .testi-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #C0162B, #8B0F1F);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 600;
    color: white; flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(192,22,43,0.25);
  }

  .testi-author-info { display: flex; flex-direction: column; gap: 3px; }

  .testi-author-name {
    font-family: 'Jost', sans-serif;
    font-size: 0.88rem; font-weight: 600;
    color: #1a1a1a;
  }

  .testi-author-meta {
    display: flex; align-items: center; gap: 8px;
  }

  .testi-author-platform {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #888;
  }

  .testi-liked-badge {
    display: inline-flex; align-items: center; gap: 4px;
    background: #FDEAEC;
    border-radius: 20px; padding: 2px 8px;
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem; font-weight: 600;
    color: #C0162B; letter-spacing: 0.06em;
  }

  .testi-heart { color: #C0162B; font-size: 0.8rem; }

  /* ── navigation ── */
  .testi-nav {
    display: flex; align-items: center; justify-content: center;
    gap: 1.2rem; margin-top: 2.2rem;
  }

  .testi-nav-btn {
    width: 46px; height: 46px;
    border-radius: 50%;
    border: 1.5px solid rgba(192,22,43,0.25);
    background: white;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 4px 14px rgba(192,22,43,0.08);
  }

  .testi-nav-btn:hover {
    background: #C0162B;
    border-color: #C0162B;
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(192,22,43,0.3);
  }

  .testi-nav-btn svg { width: 18px; height: 18px; stroke: #C0162B; transition: stroke 0.25s; }
  .testi-nav-btn:hover svg { stroke: white; }

  /* ── dots ── */
  .testi-dots {
    display: flex; align-items: center; gap: 8px;
  }

  .testi-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(192,22,43,0.2);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .testi-dot.active {
    background: #C0162B;
    width: 24px;
    border-radius: 4px;
  }

  /* ── counter ── */
  .testi-counter {
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem; font-weight: 500;
    color: #aaa; letter-spacing: 0.08em;
  }

  /* ── auto-play progress bar ── */
  .testi-progress {
    position: absolute;
    bottom: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #C0162B, #D4A44C);
    border-radius: 0 2px 2px 0;
    transition: width 0.1s linear;
  }

  /* ── floating hearts animation ── */
  .floating-hearts {
    position: absolute;
    bottom: 20px; right: 20px;
    pointer-events: none;
    z-index: 0;
  }

  .fheart {
    position: absolute;
    font-size: 1.2rem;
    opacity: 0;
    animation: floatHeart 4s ease-in-out infinite;
  }

  .fheart:nth-child(1) { animation-delay: 0s;   right: 0;  }
  .fheart:nth-child(2) { animation-delay: 1.3s; right: 20px; }
  .fheart:nth-child(3) { animation-delay: 2.6s; right: 10px; }

  @keyframes floatHeart {
    0%   { opacity: 0; transform: translateY(0) scale(0.5); }
    20%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(-80px) scale(1.2); }
  }

  /* ── slide-in animation on card change ── */
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .card-enter-right { animation: slideInRight 0.5s cubic-bezier(0.22,1,0.36,1) both; }
  .card-enter-left  { animation: slideInLeft  0.5s cubic-bezier(0.22,1,0.36,1) both; }

  /* ── thumbnail strip ── */
  .testi-thumbs {
    display: flex; gap: 10px; justify-content: center;
    flex-wrap: wrap; margin-top: 1.5rem;
  }

  .testi-thumb {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, #C0162B, #8B0F1F);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.85rem; font-weight: 600; color: white;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.25s ease;
    box-shadow: 0 2px 8px rgba(192,22,43,0.15);
    flex-shrink: 0;
  }

  .testi-thumb.active {
    border-color: #C0162B;
    transform: scale(1.15);
    box-shadow: 0 4px 14px rgba(192,22,43,0.35);
  }

  .testi-thumb:not(.active) { filter: grayscale(60%); opacity: 0.6; }
  .testi-thumb:hover { opacity: 1; filter: none; }

  @media (max-width: 768px) {
    .testi { padding: 70px 1.2rem; }
    .testi-card { padding: 2rem 1.6rem; }
    .testi-card-bg-quote { font-size: 8rem; }
  }

  @media (max-width: 480px) {
    .testi { padding: 60px 1rem; }
    .testi-card { padding: 1.6rem 1.2rem; }
    .testi-text { font-size: 1rem; }
    .testi-nav-btn { width: 38px; height: 38px; }
  }
`;

const testimonials = [
  {
    name: "y.as1_of_1",
    initials: "YA",
    likedByAuthor: true,
    platform: "TikTok",
    text: "How I love this page. I have an 11 year old who is perplexed about her period coming. One time she said mom my belly aches I think it's my uterus 😮, I couldn't keep my laughter! It was horrible! Who knew she had uterus in her vocab? 😂",
    timeAgo: "6 weeks ago",
  },
  {
    name: "thesportfeministgirl",
    initials: "TF",
    likedByAuthor: true,
    platform: "TikTok",
    text: "I love the fact that I keep learning new things on your page!",
    timeAgo: "4 weeks ago",
  },
  {
    name: "mirabelesosaenoma",
    initials: "MS",
    likedByAuthor: false,
    platform: "TikTok",
    text: "God bless U for this….had a teenager kids …all boys only one girl the smallest she gets too angry sometimes and cry afterwards very emotional, mood swings, and some signs — very helpful the right up.",
    timeAgo: "TikTok",
  },
  {
    name: "Sally",
    initials: "SL",
    likedByAuthor: false,
    platform: "TikTok",
    text: "Thank you so much for this video. It's so important to be prepared for this moment. My mother never talked about this to me and that left me so confused. Now I'm 38 and slowly understand that it all was not my fault. As a child I always felt guilty, like there was something wrong with me and I should not have it. Your daughter is blessed with a mother like you, who treats this topic with sensitivity and respect. Thank you so much 🥰",
    timeAgo: "TikTok",
  },
  {
    name: "Yazzie_Appiah",
    initials: "YP",
    likedByAuthor: false,
    platform: "TikTok",
    text: "Thank you mama for teaching me and preparing me for my daughter 💛",
    timeAgo: "TikTok",
  },
  {
    name: "courts🪬🤍",
    initials: "CT",
    likedByAuthor: false,
    platform: "TikTok",
    text: "I was only 8, my mum hadn't had the chance to have the talk with me yet & I started screaming saying I need an ambulance when I first saw it 😳 Thank you for sharing the signs — hopefully it prevents some poor girl panicking the way I did 🥺",
    timeAgo: "TikTok",
  },
  {
    name: "nabzjart",
    initials: "NJ",
    likedByAuthor: true,
    platform: "TikTok",
    text: "Thank you love this!!! I speak openly to my daughter about these things so she doesn't feel embarrassed or anything and the prompts I sent to my sis.",
    timeAgo: "3 weeks ago",
  },
];

const AUTOPLAY_MS = 5000;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const [animKey, setAnimKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(null);

  const goTo = (idx, dir = "right") => {
    setDirection(dir);
    setCurrent(idx);
    setAnimKey((k) => k + 1);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length, "left");
  const next = () => goTo((current + 1) % testimonials.length, "right");

  // Auto-play
  useEffect(() => {
    startTimeRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / AUTOPLAY_MS) * 100, 100);
      setProgress(pct);
      if (elapsed >= AUTOPLAY_MS) {
        setCurrent((c) => (c + 1) % testimonials.length);
        setAnimKey((k) => k + 1);
        setDirection("right");
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    };

    progressRef.current = setInterval(tick, 50);
    return () => clearInterval(progressRef.current);
  }, [current]);

  const t = testimonials[current];

  return (
    <>
      <style>{styles}</style>
      <section className="testi" id="community">
        <div className="testi-stripe" />
        <div className="testi-bg-circle" />
        <div className="testi-bg-circle-2" />

        {/* Decorative bg cross */}
        <div className="testi-bg-cross">
          <svg width="400" height="400" viewBox="0 0 100 100">
            <rect x="44" y="5" width="12" height="90" rx="4" fill="#C0162B"/>
            <rect x="5" y="44" width="90" height="12" rx="4" fill="#C0162B"/>
          </svg>
        </div>

        <div className="testi-inner">
          {/* Header */}
          <div className="testi-header">
            <div className="testi-label">
              <span className="testi-label-line" />
              Community Love
              <span className="testi-label-line" />
            </div>
            <h2 className="testi-heading">
              Real Words from <em>Real</em> Families
            </h2>
            <p className="testi-sub">
              These are comments from real parents, daughters, and women in our TikTok community — unfiltered, unscripted, and full of heart.
            </p>
            <div className="tiktok-source">
              <svg viewBox="0 0 24 24" fill="white">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-1-.43z"/>
              </svg>
              Comments from TikTok
            </div>
          </div>

          {/* Carousel */}
          <div className="testi-carousel-wrap">
            <div
              key={animKey}
              className={`testi-card ${direction === "right" ? "card-enter-right" : "card-enter-left"}`}
            >
              <div className="testi-card-accent" />
              <div className="testi-card-bg-quote">"</div>

              <div className="floating-hearts">
                <span className="fheart">❤️</span>
                <span className="fheart">❤️</span>
                <span className="fheart">❤️</span>
              </div>

              <div className="testi-quote-icon">
                <svg viewBox="0 0 24 24" fill="#C0162B">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              <p className="testi-text">"{t.text}"</p>

              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div className="testi-author-info">
                  <span className="testi-author-name">@{t.name}</span>
                  <div className="testi-author-meta">
                    <span className="testi-author-platform">{t.platform} · {t.timeAgo}</span>
                    {t.likedByAuthor && (
                      <span className="testi-liked-badge">
                        <span className="testi-heart">❤️</span> Liked by author
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="testi-progress" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Thumbnail avatars */}
          <div className="testi-thumbs">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testi-thumb ${i === current ? "active" : ""}`}
                onClick={() => goTo(i, i > current ? "right" : "left")}
                title={`@${t.name}`}
              >
                {t.initials}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="testi-nav">
            <button className="testi-nav-btn" onClick={prev} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <div className="testi-dots">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  className={`testi-dot ${i === current ? "active" : ""}`}
                  onClick={() => goTo(i, i > current ? "right" : "left")}
                />
              ))}
            </div>

            <button className="testi-nav-btn" onClick={next} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: "0.8rem" }}>
            <span className="testi-counter">{current + 1} / {testimonials.length}</span>
          </div>
        </div>
      </section>
    </>
  );
}