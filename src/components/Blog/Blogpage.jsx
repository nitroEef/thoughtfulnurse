import { useState, useEffect, useCallback } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .blog-page { min-height: 100vh; background: #fafafa; font-family: 'Jost', sans-serif; }

  /* ── HERO ── */
  .blog-hero {
    position: relative;
    background: linear-gradient(135deg, #8B0F1F 0%, #C0162B 60%, #7B1A2E 100%);
    padding: 90px 2.5rem 70px;
    overflow: hidden;
  }
  .blog-hero-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }
  .blog-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
  .blog-hero-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.68rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.7); margin-bottom: 1rem;
  }
  .blog-hero-label-line { display: inline-block; width: 28px; height: 1.5px; background: rgba(255,255,255,0.5); }
  .blog-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 600; line-height: 1.15;
    color: white; margin: 0 0 1rem;
  }
  .blog-hero-title em { font-style: italic; color: #F5C6CC; }
  .blog-hero-sub { font-size: 0.95rem; color: rgba(255,255,255,0.72); line-height: 1.7; max-width: 500px; margin: 0 0 2rem; }
  .blog-search-wrap { position: relative; max-width: 440px; }
  .blog-search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; stroke: rgba(255,255,255,0.5); }
  .blog-search {
    width: 100%; background: rgba(255,255,255,0.12); border: 1.5px solid rgba(255,255,255,0.2);
    border-radius: 50px; padding: 11px 18px 11px 40px;
    font-family: 'Jost', sans-serif; font-size: 0.87rem; color: white; outline: none;
    transition: background 0.2s, border-color 0.2s;
  }
  .blog-search::placeholder { color: rgba(255,255,255,0.45); }
  .blog-search:focus { background: rgba(255,255,255,0.18); border-color: rgba(255,255,255,0.4); }

  /* ── MAIN LAYOUT ── */
  .blog-main {
    max-width: 1100px; margin: 0 auto; padding: 3.5rem 2.5rem 5rem;
    display: grid; grid-template-columns: 1fr 300px; gap: 3rem; align-items: start;
  }

  /* ── CATEGORY PILLS ── */
  .blog-cats { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 2.5rem; }
  .blog-cat-pill {
    font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    border: 1.5px solid rgba(192,22,43,0.2); border-radius: 50px;
    padding: 7px 18px; cursor: pointer; transition: all 0.2s;
    background: white; color: #666;
  }
  .blog-cat-pill:hover { border-color: #C0162B; color: #C0162B; }
  .blog-cat-pill.active { background: #C0162B; border-color: #C0162B; color: white; }

  /* ── POSTS GRID ── */
  .blog-posts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.6rem; }
  .blog-post-card {
    background: white; border-radius: 18px; border: 1px solid rgba(192,22,43,0.07);
    overflow: hidden; display: flex; flex-direction: column; cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .blog-post-card:hover { transform: translateY(-5px); box-shadow: 0 16px 45px rgba(192,22,43,0.1); }
  .blog-post-card-thumb {
    height: 150px; position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .blog-post-card-thumb-icon {
    width: 46px; height: 46px;
    background: rgba(255,255,255,0.18); border: 1.5px solid rgba(255,255,255,0.3);
    border-radius: 14px; display: flex; align-items: center; justify-content: center;
  }
  .blog-post-card-thumb-icon svg { width: 22px; height: 22px; }
  .blog-post-card-cat {
    position: absolute; top: 12px; left: 12px;
    font-size: 0.6rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.28);
    color: white; padding: 3px 9px; border-radius: 20px;
  }
  .blog-post-card-body { padding: 1.1rem 1.2rem; flex: 1; display: flex; flex-direction: column; gap: 0.6rem; }
  .blog-post-card-title {
    font-family: 'Cormorant Garamond', serif; font-size: 1.08rem; font-weight: 600;
    line-height: 1.3; color: #1a1a1a; margin: 0;
  }
  .blog-post-card-excerpt { font-size: 0.78rem; color: #777; line-height: 1.7; flex: 1; margin: 0; }
  .blog-post-card-footer {
    padding: 0 1.2rem 1rem;
    display: flex; justify-content: space-between; align-items: center;
  }
  .blog-post-card-read {
    font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: #C0162B; display: flex; align-items: center; gap: 5px;
  }
  .blog-post-card-read svg { width: 12px; height: 12px; transition: transform 0.2s; }
  .blog-post-card:hover .blog-post-card-read svg { transform: translateX(3px); }
  .blog-post-card-time { font-size: 0.67rem; color: #bbb; }

  /* ── SKELETON ── */
  .blog-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
    background-size: 200% 100%; animation: blog-shimmer 1.5s infinite; border-radius: 6px;
  }
  @keyframes blog-shimmer { 0%{ background-position: 200% 0; } 100%{ background-position: -200% 0; } }

  /* ── LOAD MORE ── */
  .blog-load-more { margin-top: 2.5rem; text-align: center; }
  .blog-load-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'Jost', sans-serif; font-size: 0.8rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #C0162B; background: white; border: 1.5px solid #C0162B;
    border-radius: 50px; padding: 11px 28px; cursor: pointer; transition: all 0.2s;
  }
  .blog-load-btn:hover { background: #C0162B; color: white; }
  .blog-load-btn svg { width: 14px; height: 14px; }
  .blog-load-btn:disabled { opacity: 0.5; cursor: default; }

  /* ── SIDEBAR ── */
  .blog-sidebar { display: flex; flex-direction: column; gap: 2rem; position: sticky; top: 2rem; }
  .blog-sidebar-card { background: white; border: 1px solid rgba(192,22,43,0.08); border-radius: 18px; padding: 1.5rem; }
  .blog-sidebar-title {
    font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 600;
    color: #1a1a1a; margin: 0 0 1.2rem; padding-bottom: 0.8rem;
    border-bottom: 1px solid rgba(192,22,43,0.1);
  }
  .blog-sidebar-topics { display: flex; flex-direction: column; gap: 10px; }
  .blog-sidebar-topic {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 0.82rem; color: #444; cursor: pointer; padding: 7px 10px;
    border-radius: 10px; transition: background 0.15s;
  }
  .blog-sidebar-topic:hover { background: #FDEAEC; color: #C0162B; }
  .blog-sidebar-topic-count {
    font-size: 0.68rem; font-weight: 600;
    background: #FDEAEC; color: #C0162B; border-radius: 20px; padding: 2px 9px;
  }
  .blog-newsletter {
    background: linear-gradient(135deg, #8B0F1F 0%, #C0162B 100%);
    border-radius: 18px; padding: 1.5rem;
  }
  .blog-newsletter-title {
    font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 600;
    color: white; margin: 0 0 0.5rem;
  }
  .blog-newsletter-sub { font-size: 0.77rem; color: rgba(255,255,255,0.72); line-height: 1.6; margin: 0 0 1.2rem; }
  .blog-newsletter-input {
    width: 100%; background: rgba(255,255,255,0.14); border: 1.5px solid rgba(255,255,255,0.25);
    border-radius: 10px; padding: 9px 12px; font-family: 'Jost', sans-serif;
    font-size: 0.82rem; color: white; outline: none; margin-bottom: 10px; box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .blog-newsletter-input::placeholder { color: rgba(255,255,255,0.4); }
  .blog-newsletter-input:focus { border-color: rgba(255,255,255,0.5); }
  .blog-newsletter-btn {
    width: 100%; background: white; color: #C0162B; border: none; border-radius: 10px;
    padding: 10px; font-family: 'Jost', sans-serif; font-size: 0.8rem; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s;
  }
  .blog-newsletter-btn:hover { opacity: 0.88; }

  /* ── ARTICLE VIEW ── */
  .blog-article-wrap { max-width: 1100px; margin: 0 auto; padding: 3rem 2.5rem 5rem; }
  .blog-article-back {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.78rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
    color: #C0162B; cursor: pointer; margin-bottom: 2.5rem;
    background: none; border: none; padding: 0; font-family: 'Jost', sans-serif; transition: opacity 0.2s;
  }
  .blog-article-back:hover { opacity: 0.7; }
  .blog-article-back svg { width: 14px; height: 14px; }
  .blog-article-hero {
    height: 300px; border-radius: 24px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 2.5rem; position: relative; overflow: hidden;
  }
  .blog-article-hero-icon {
    width: 70px; height: 70px; background: rgba(255,255,255,0.18);
    border: 2px solid rgba(255,255,255,0.3); border-radius: 22px;
    display: flex; align-items: center; justify-content: center;
  }
  .blog-article-hero-icon svg { width: 34px; height: 34px; }
  .blog-article-hero-cat {
    position: absolute; top: 20px; left: 20px;
    font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
    color: white; padding: 5px 14px; border-radius: 20px;
  }
  .blog-article-layout { display: grid; grid-template-columns: 1fr 280px; gap: 3rem; align-items: start; }
  .blog-article-meta { display: flex; align-items: center; gap: 12px; font-size: 0.72rem; color: #aaa; margin-bottom: 1rem; }
  .blog-article-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: #C0162B; }
  .blog-article-title {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 600; line-height: 1.2; color: #1a1a1a; margin: 0 0 2rem;
  }
  .blog-article-body { font-size: 0.95rem; color: #444; line-height: 1.9; }
  .blog-article-body p { margin: 0 0 1.3rem; }
  .blog-article-body h3 {
    font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 600;
    color: #1a1a1a; margin: 2rem 0 0.8rem;
  }
  .blog-article-body strong { color: #1a1a1a; font-weight: 600; }
  .blog-article-body blockquote {
    background: #FDEAEC; border-left: 3px solid #C0162B; border-radius: 0 12px 12px 0;
    padding: 1rem 1.2rem; margin: 1.5rem 0;
    font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-style: italic; color: #8B0F1F;
  }
  .blog-article-loading { display: flex; flex-direction: column; gap: 12px; margin-top: 1rem; }
  .blog-article-aside { position: sticky; top: 2rem; }
  .blog-article-author-card {
    background: white; border: 1px solid rgba(192,22,43,0.08); border-radius: 18px; padding: 1.4rem;
  }
  .blog-article-author-avatar {
    width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg, #8B0F1F, #C0162B);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 600;
    color: white; margin-bottom: 0.8rem;
  }
  .blog-article-author-name { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 600; color: #1a1a1a; margin: 0 0 2px; }
  .blog-article-author-role { font-size: 0.7rem; color: #aaa; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 0.9rem; }
  .blog-article-author-bio { font-size: 0.8rem; color: #666; line-height: 1.7; margin: 0; }

  /* AI dots */
  .blog-ai-dots { display: inline-flex; gap: 4px; align-items: center; margin-left: 8px; }
  .blog-ai-dots span {
    width: 5px; height: 5px; border-radius: 50%; background: #C0162B; display: inline-block;
    animation: blog-dot-bounce 1.2s infinite;
  }
  .blog-ai-dots span:nth-child(2) { animation-delay: 0.2s; }
  .blog-ai-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blog-dot-bounce { 0%,100%{transform:translateY(0);opacity:0.4;} 50%{transform:translateY(-5px);opacity:1;} }

  .blog-ai-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.62rem; font-weight: 500; color: #C0162B;
    background: #FDEAEC; border: 1px solid rgba(192,22,43,0.15); border-radius: 20px; padding: 3px 10px;
  }

  @media (max-width: 900px) {
    .blog-main { grid-template-columns: 1fr; }
    .blog-sidebar { position: static; }
    .blog-article-layout { grid-template-columns: 1fr; }
    .blog-article-aside { position: static; }
    .blog-hero { padding: 70px 1.5rem 50px; }
  }
  @media (max-width: 640px) {
    .blog-posts-grid { grid-template-columns: 1fr; }
    .blog-main { padding: 2.5rem 1.2rem 4rem; }
    .blog-article-wrap { padding: 2rem 1.2rem 4rem; }
  }
`;

const CATEGORIES = ["All","Puberty","Menstrual Health","For Parents","Body Confidence","Nutrition & Wellness"];

const TOPIC_CONFIGS = [
  {
    category: "Puberty",
    gradient: "linear-gradient(135deg,#8B0F1F,#C0162B)",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 3.25 2.17 6 5.19 6.84L12 22l1.81-6.16C16.83 15 19 12.25 19 9c0-3.87-3.13-7-7-7z"/></svg>,
    previewPrompt: "Write a blog post title and 2-sentence excerpt about helping young girls navigate early puberty changes, written by a nurse mum. Return ONLY JSON: {\"title\":\"...\",\"excerpt\":\"...\",\"readTime\":\"X min read\"}",
    fullPrompt: (t) => `Write a warm, evidence-based blog article titled "${t}" for parents of girls going through puberty. Include an intro, 3 sections with ### headings, a blockquote, and conclusion. Voice: caring nurse-mum. Use <p><h3><blockquote><strong> only. Return ONLY HTML content.`,
  },
  {
    category: "Menstrual Health",
    gradient: "linear-gradient(135deg,#C0162B,#D4845A)",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    previewPrompt: "Write a blog post title and 2-sentence excerpt about understanding periods and menstrual care for young girls. Return ONLY JSON: {\"title\":\"...\",\"excerpt\":\"...\",\"readTime\":\"X min read\"}",
    fullPrompt: (t) => `Write an evidence-based blog article titled "${t}" about menstrual health for young girls. Include intro, 3 sections (### headings), blockquote, conclusion. Voice: registered nurse. Use <p><h3><blockquote><strong> only. Return ONLY HTML.`,
  },
  {
    category: "For Parents",
    gradient: "linear-gradient(135deg,#7B1A2E,#C0162B,#e8855a)",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    previewPrompt: "Write a blog post title and 2-sentence excerpt about how parents can have open health conversations with their daughters. Return ONLY JSON: {\"title\":\"...\",\"excerpt\":\"...\",\"readTime\":\"X min read\"}",
    fullPrompt: (t) => `Write a practical blog article titled "${t}" for parents supporting daughters through puberty. Include intro, 3 actionable sections (### headings), blockquote, conclusion. Voice: warm clinical expert. Use <p><h3><blockquote><strong> only. Return ONLY HTML.`,
  },
  {
    category: "Body Confidence",
    gradient: "linear-gradient(135deg,#C0162B,#8B0F1F)",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
    previewPrompt: "Write a blog post title and 2-sentence excerpt about building body confidence in young girls. Return ONLY JSON: {\"title\":\"...\",\"excerpt\":\"...\",\"readTime\":\"X min read\"}",
    fullPrompt: (t) => `Write an uplifting blog article titled "${t}" about body confidence for young girls. Include intro, 3 empowering sections (### headings), blockquote, conclusion. Voice: nurse author. Use <p><h3><blockquote><strong> only. Return ONLY HTML.`,
  },
  {
    category: "Nutrition & Wellness",
    gradient: "linear-gradient(135deg,#8B0F1F,#b5351f)",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    previewPrompt: "Write a blog post title and 2-sentence excerpt about nutrition tips for girls going through puberty. Return ONLY JSON: {\"title\":\"...\",\"excerpt\":\"...\",\"readTime\":\"X min read\"}",
    fullPrompt: (t) => `Write an evidence-based blog article titled "${t}" about nutrition for girls during puberty. Include intro, 3 practical sections (### headings), blockquote, conclusion. Voice: nurse. Use <p><h3><blockquote><strong> only. Return ONLY HTML.`,
  },
];

async function callClaude(prompt, maxTokens = 300) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.content?.map((b) => b.text || "").join("") || "";
}

function SkeletonPostCard() {
  return (
    <div className="blog-post-card" style={{ pointerEvents: "none" }}>
      <div style={{ height: 150, background: "#f0e8e9" }} />
      <div className="blog-post-card-body">
        <div className="blog-skeleton" style={{ height: 11, width: "35%" }} />
        <div className="blog-skeleton" style={{ height: 18, width: "88%" }} />
        <div className="blog-skeleton" style={{ height: 13, width: "95%" }} />
        <div className="blog-skeleton" style={{ height: 13, width: "70%" }} />
      </div>
    </div>
  );
}

// ─── ARTICLE VIEW ──────────────────────────────────────────────────────────────
function ArticleView({ post, onBack }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setContent("");
    const config = TOPIC_CONFIGS.find((t) => t.category === post.category) || TOPIC_CONFIGS[0];
    callClaude(config.fullPrompt(post.title), 900)
      .then((raw) => {
        if (!cancelled) { setContent(raw.replace(/```html|```/g,"").trim()); setLoading(false); }
      })
      .catch(() => {
        if (!cancelled) { setContent("<p>This article is generating — please try again in a moment.</p>"); setLoading(false); }
      });
    return () => { cancelled = true; };
  }, [post]);

  const config = TOPIC_CONFIGS.find((t) => t.category === post.category) || TOPIC_CONFIGS[0];
  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="blog-article-wrap">
      <button className="blog-article-back" onClick={onBack}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back to Blog
      </button>

      <div className="blog-article-hero" style={{ background: post.gradient || config.gradient }}>
        <div className="blog-article-hero-icon">{config.icon}</div>
        <div className="blog-article-hero-cat">{post.category}</div>
      </div>

      <div className="blog-article-layout">
        <div>
          <div className="blog-article-meta">
            <span>{today}</span>
            <span className="blog-article-meta-dot" />
            <span>{post.readTime}</span>
            <span className="blog-article-meta-dot" />
            <span className="blog-ai-badge">✦ AI-generated</span>
          </div>
          <h1 className="blog-article-title">{post.title}</h1>

          {loading ? (
            <div className="blog-article-loading">
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.85rem", color:"#aaa", display:"flex", alignItems:"center" }}>
                Writing your article
                <span className="blog-ai-dots"><span /><span /><span /></span>
              </p>
              {[...Array(6)].map((_,i) => (
                <div key={i} className="blog-skeleton" style={{ height: 14, width: `${72 + (i%3)*9}%` }} />
              ))}
            </div>
          ) : (
            <div className="blog-article-body" dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>

        <div className="blog-article-aside">
          <div className="blog-article-author-card">
            <div className="blog-article-author-avatar">AJ</div>
            <p className="blog-article-author-name">Abiodun Jelilat Salaudeen</p>
            <p className="blog-article-author-role">RN · Health Educator</p>
            <p className="blog-article-author-bio">
              A registered nurse, mum, and health educator dedicated to making health conversations easy, relatable, and accessible for every family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BLOG PAGE ─────────────────────────────────────────────────────────────────
// Props:
//   initialPost   – if passed from BlogSection click, auto-opens this post
//   onBack        – called when user leaves BlogPage (e.g. back to homepage)
export default function BlogPage({ initialPost = null, onBack }) {
  const [posts, setPosts]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch]       = useState("");
  const [openPost, setOpenPost]   = useState(initialPost);   // ← key wiring

  // Sync if parent passes a new initialPost (e.g. user clicked a different card)
  useEffect(() => { setOpenPost(initialPost); }, [initialPost]);

  const loadBatch = useCallback(async (append = false) => {
    if (append) setLoadingMore(true); else setLoading(true);
    const shuffled = [...TOPIC_CONFIGS].sort(() => Math.random() - 0.5).slice(0, 4);
    const results = await Promise.allSettled(
      shuffled.map((t) =>
        callClaude(t.previewPrompt, 250).then((raw) => {
          const clean = raw.replace(/```json|```/g, "").trim();
          return { ...JSON.parse(clean), category: t.category, gradient: t.gradient };
        })
      )
    );
    const newPosts = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
    if (append) { setPosts((p) => [...p, ...newPosts]); setLoadingMore(false); }
    else { setPosts(newPosts); setLoading(false); }
  }, []);

  useEffect(() => { loadBatch(); }, []);

  const displayed = posts.filter((p) => {
    const catOk = activeCategory === "All" || p.category === activeCategory;
    const searchOk = !search || p.title?.toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  // ── Article detail ─────────────────────────────────────────────────────────
  if (openPost) {
    return (
      <>
        <style>{styles}</style>
        <div className="blog-page">
          <ArticleView post={openPost} onBack={() => setOpenPost(null)} />
        </div>
      </>
    );
  }

  // ── Blog listing ──────────────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>
      <div className="blog-page">

        {/* HERO */}
        <div className="blog-hero">
          <div className="blog-hero-dots" />
          <div className="blog-hero-inner">
            {/* Back to homepage link */}
            {onBack && (
              <button
                onClick={onBack}
                style={{
                  display:"inline-flex", alignItems:"center", gap:8,
                  background:"rgba(255,255,255,0.12)", border:"1.5px solid rgba(255,255,255,0.2)",
                  borderRadius:50, padding:"7px 18px", marginBottom:"1.5rem",
                  fontFamily:"'Jost',sans-serif", fontSize:"0.75rem", fontWeight:600,
                  letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.8)",
                  cursor:"pointer", transition:"background 0.2s",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="13" height="13">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Back to Home
              </button>
            )}
            <div className="blog-hero-label">
              <span className="blog-hero-label-line" />
              The Thoughtful Nurse Blog
            </div>
            <h1 className="blog-hero-title">Health Stories,<br /><em>Simply Told</em></h1>
            <p className="blog-hero-sub">
              Evidence-based health education for parents and young girls — written with clarity, care, and the heart of a nurse mum.
            </p>
            <div className="blog-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                className="blog-search"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="blog-main">
          <div>
            {/* Category filter */}
            <div className="blog-cats">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={`blog-cat-pill${activeCategory === c ? " active" : ""}`}
                  onClick={() => setActiveCategory(c)}
                >{c}</button>
              ))}
            </div>

            {/* Grid */}
            <div className="blog-posts-grid">
              {loading
                ? [...Array(4)].map((_,i) => <SkeletonPostCard key={i} />)
                : displayed.length === 0
                  ? (
                    <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"3rem 0", color:"#aaa", fontFamily:"'Jost',sans-serif", fontSize:"0.9rem" }}>
                      No posts found. Try a different search or category.
                    </div>
                  )
                  : displayed.map((post, i) => {
                    const cfg = TOPIC_CONFIGS.find((t) => t.category === post.category) || TOPIC_CONFIGS[0];
                    return (
                      <div className="blog-post-card" key={i} onClick={() => setOpenPost(post)}>
                        <div className="blog-post-card-thumb" style={{ background: post.gradient || cfg.gradient }}>
                          <div className="blog-post-card-thumb-icon">{cfg.icon}</div>
                          <div className="blog-post-card-cat">{post.category}</div>
                        </div>
                        <div className="blog-post-card-body">
                          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.67rem", color:"#bbb" }}>{today}</div>
                          <h3 className="blog-post-card-title">{post.title}</h3>
                          <p className="blog-post-card-excerpt">{post.excerpt}</p>
                        </div>
                        <div className="blog-post-card-footer">
                          <span className="blog-post-card-read">
                            Read article
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </span>
                          <span className="blog-post-card-time">{post.readTime}</span>
                        </div>
                      </div>
                    );
                  })
              }
              {loadingMore && [...Array(4)].map((_,i) => <SkeletonPostCard key={`more-${i}`} />)}
            </div>

            {/* Load more */}
            {!loading && !loadingMore && (
              <div className="blog-load-more">
                <button className="blog-load-btn" onClick={() => loadBatch(true)} disabled={loadingMore}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12l7 7 7-7"/>
                  </svg>
                  Load more articles
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="blog-sidebar">
            <div className="blog-sidebar-card">
              <h3 className="blog-sidebar-title">Browse Topics</h3>
              <div className="blog-sidebar-topics">
                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                  <div key={c} className="blog-sidebar-topic" onClick={() => setActiveCategory(c)}>
                    <span>{c}</span>
                    <span className="blog-sidebar-topic-count">
                      {posts.filter((p) => p.category === c).length || "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="blog-newsletter">
              <h3 className="blog-newsletter-title">Stay in the Loop</h3>
              <p className="blog-newsletter-sub">Get the latest health education articles delivered straight to your inbox.</p>
              <input className="blog-newsletter-input" placeholder="Your email address" type="email" />
              <button className="blog-newsletter-btn">Subscribe</button>
            </div>

            <div className="blog-sidebar-card">
              <h3 className="blog-sidebar-title">About the Author</h3>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"0.9rem" }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#8B0F1F,#C0162B)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontWeight:600, color:"white", flexShrink:0 }}>
                  AJ
                </div>
                <div>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", fontWeight:600, color:"#1a1a1a", margin:0 }}>Abiodun Jelilat</p>
                  <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.67rem", color:"#aaa", letterSpacing:"0.08em", textTransform:"uppercase", margin:0 }}>RN · Health Educator</p>
                </div>
              </div>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.78rem", color:"#666", lineHeight:1.7, margin:0 }}>
                Registered nurse, mum, and health content creator behind The Thoughtful Nurse — making health education clear, caring, and accessible.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
