import "./Aboutus.css";
import popo from "../../assets/popo.jpeg";

const credentials = [
  {
    label: "Registered Nurse",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round">
        <rect x="11" y="3" width="2" height="18" rx="1" />
        <rect x="3" y="11" width="18" height="2" rx="1" />
      </svg>
    ),
  },
  {
    label: "Evidence-Based Health Educator",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    label: "Mum & Authentic Storyteller",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: "Content Creator — Instagram & TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#C0162B" strokeWidth="2" strokeLinecap="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <>
      <section className="about" id="about">
        <div className="about-bg-stripe" />
        <div className="about-bg-shape" />

        <div className="about-inner">
          {/* LEFT */}
          <div className="about-visual">
            <div className="about-img-frame-bg" />
            <div className="about-img-dots" />

            <div className="about-float-stat">
              <div className="about-float-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <div className="about-float-stat-text">
                <span className="about-float-stat-num">4,000+</span>
                <span className="about-float-stat-label">Community</span>
              </div>
            </div>

            {/* PHOTO */}
            <div className="about-img-wrap">
              <img src={popo} alt="Abiodun Jelilat Salaudeen" />

              <div className="about-img-overlay">
                <div>
                  <div className="about-img-caption-name">
                    Abiodun Jelilat Salaudeen
                  </div>

                  <div className="about-img-caption-role">
                    RN · Health Educator · Content Creator
                  </div>
                </div>
              </div>
            </div>

            <div className="about-float-quote">
              <div className="about-float-quote-mark">"</div>

              <p className="about-float-quote-text">
                Every girl deserves to understand her body before her period starts.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="about-content">
            <div className="about-label">
              <span className="about-label-line" />
              Meet the Thoughtful Nurse
            </div>

            <h2 className="about-heading">
              Where Nursing Expertise Meets <em>Heartfelt</em> Storytelling
            </h2>

            <p className="about-body">
              I am <strong>Abiodun Jelilat Salaudeen</strong> — a registered nurse,
              mum, and the health content creator behind{" "}
              <strong>The Thoughtful Nurse</strong>. Through storytelling and
              evidence-based education, I help parents, young girls, and health
              brands communicate health information with clarity, confidence,
              and care.
            </p>

            <p className="about-body">
              What started as a simple conversation with my own daughter has
              grown into a thriving community dedicated to one important belief:
              every girl deserves to understand her body before her period starts.
            </p>

            <div className="about-mission">
              My mission is to simplify health education by making menstrual
              health and puberty conversations{" "}
              <strong>
                easy to understand, relatable, and accessible
              </strong>{" "}
              for every family.
            </div>

            <div className="about-creds">
              {credentials.map((c) => (
                <div key={c.label} className="about-cred">
                  <div className="about-cred-icon">{c.icon}</div>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}