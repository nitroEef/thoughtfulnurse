const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .services {
    position: relative;
    padding: 100px 2.5rem;
    background: #fdf8f8;
    overflow: hidden;
  }

  .services-bg {
    position: absolute;
    bottom: -150px; left: -150px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.05), transparent 70%);
    pointer-events: none;
  }

  .services-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .services-header { text-align: center; }

  .services-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #C0162B; margin-bottom: 1rem;
  }

  .services-label-line {
    display: inline-block;
    width: 28px; height: 1.5px;
    background: #C0162B;
  }

  .services-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 600; line-height: 1.2;
    color: #1a1a1a;
  }

  .services-heading em { color: #C0162B; font-style: italic; }

  .services-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.95rem; color: #666;
    line-height: 1.8; max-width: 560px;
    margin: 1rem auto 0;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  .service-card {
    background: white;
    border: 1px solid rgba(192,22,43,0.1);
    border-radius: 24px;
    padding: 2.4rem;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .service-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #C0162B, #D4A44C);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  .service-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(192,22,43,0.12);
    border-color: rgba(192,22,43,0.25);
  }

  .service-card:hover::before { transform: scaleX(1); }

  .service-card-icon {
    width: 52px; height: 52px;
    background: #FDEAEC;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.4rem;
    transition: background 0.3s, transform 0.3s;
  }

  .service-card:hover .service-card-icon {
    background: #C0162B;
    transform: scale(1.05);
  }

  .service-card-icon svg { width: 22px; height: 22px; transition: stroke 0.3s; }
  .service-card:hover .service-card-icon svg { stroke: white; }

  .service-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem; font-weight: 600;
    color: #1a1a1a; margin-bottom: 0.6rem;
    transition: color 0.3s;
  }

  .service-card:hover .service-card-title { color: #C0162B; }

  .service-card-desc {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem; color: #666;
    line-height: 1.75; margin-bottom: 1.2rem;
  }

  .service-items { display: flex; flex-direction: column; gap: 8px; }

  .service-item {
    display: flex; align-items: center; gap: 10px;
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem; color: #444;
  }

  .service-item-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #C0162B;
    flex-shrink: 0;
  }

  /* Why Work With Me */
  .why-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .why-card {
    background: white;
    border: 1px solid rgba(192,22,43,0.1);
    border-radius: 18px;
    padding: 1.8rem 1.4rem;
    text-align: center;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .why-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(192,22,43,0.1);
  }

  .why-card-icon {
    width: 48px; height: 48px;
    background: #FDEAEC;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem;
  }

  .why-card-icon svg { width: 20px; height: 20px; }

  .why-card-title {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem; font-weight: 600;
    color: #1a1a1a; letter-spacing: 0.04em;
  }

  @media (max-width: 900px) {
    .services-grid { grid-template-columns: 1fr; }
    .why-grid { grid-template-columns: repeat(2, 1fr); }
    .services { padding: 70px 1.5rem; }
  }

  @media (max-width: 480px) {
    .services { padding: 60px 1rem; }
    .why-grid { grid-template-columns: 1fr; }
  }
`;

const services = [
  {
    title: "Health Content Creation",
    desc: "I create educational and engaging health content that simplifies complex medical topics for everyday families, young girls, and parents.",
    items: [
      "Menstrual health education",
      "Puberty education for girls",
      "Health storytelling",
      "Awareness campaigns",
      "Health articles and blog posts",
      "Simple health information for families",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    title: "Brand Collaborations",
    desc: "I partner with health organizations and wellness brands to create impactful campaigns that resonate with families and young women.",
    items: [
      "Health and wellness campaigns",
      "Sponsored educational content",
      "Product reviews aligned with my values",
      "Advocacy and awareness initiatives",
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

const whyItems = [
  {
    label: "Registered Nursing Expertise",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round"><rect x="11" y="3" width="2" height="18" rx="1"/><rect x="3" y="11" width="18" height="2" rx="1"/></svg>,
  },
  {
    label: "Evidence-Based Education",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    label: "Authentic Storytelling",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  },
  {
    label: "Family-Friendly Communication",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    label: "Trusted Online Community",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    label: "Passionate Girl Empowerment Advocate",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  },
];

export default function Services() {
  return (
    <>
      <style>{styles}</style>
      <section className="services" id="services">
        <div className="services-bg" />
        <div className="services-inner">

          <div className="services-header">
            <div className="services-label">
              <span className="services-label-line" />
              What I Offer
              <span className="services-label-line" />
            </div>
            <h2 className="services-heading">
              Services Built on <em>Expertise</em> & Care
            </h2>
            <p className="services-sub">
              Ready to collaborate or educate your audience? Let's work together to make health information simple, relatable, and impactful.
            </p>
          </div>

          <div className="services-grid">
            {services.map((s) => (
              <div key={s.title} className="service-card">
                <div className="service-card-icon">{s.icon}</div>
                <div className="service-card-title">{s.title}</div>
                <p className="service-card-desc">{s.desc}</p>
                <div className="service-items">
                  {s.items.map((item) => (
                    <div key={item} className="service-item">
                      <div className="service-item-dot" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="services-header" style={{ marginBottom: "2rem" }}>
              <div className="services-label">
                <span className="services-label-line" />
                Why Work With Me
                <span className="services-label-line" />
              </div>
            </div>
            <div className="why-grid">
              {whyItems.map((w) => (
                <div key={w.label} className="why-card">
                  <div className="why-card-icon">{w.icon}</div>
                  <div className="why-card-title">{w.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}