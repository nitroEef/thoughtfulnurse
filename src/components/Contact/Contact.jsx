import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── Replace these with your real EmailJS credentials ───────────────────────
const EMAILJS_SERVICE_ID  = "service_smhwo1q";
const EMAILJS_TEMPLATE_ID = "template_jpm6ho6";
const EMAILJS_PUBLIC_KEY  = "qz42kpBCXX2i2dmAR";
// ────────────────────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .contact {
    position: relative;
    padding: 100px 2.5rem;
    background: #fff;
    overflow: hidden;
  }

  .contact-bg-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, #C0162B 30%, #D4A44C 60%, #C0162B 80%, transparent);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }

  .contact-glow {
    position: absolute;
    top: -100px; right: -100px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.06), transparent 70%);
    pointer-events: none;
  }

  .contact-glow-2 {
    position: absolute;
    bottom: -80px; left: -80px;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(192,22,43,0.04), transparent 70%);
    pointer-events: none;
  }

  .contact-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 5rem;
    align-items: start;
  }

  /* ── LEFT INFO PANEL ── */
  .contact-info { display: flex; flex-direction: column; gap: 2rem; }

  .contact-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #C0162B;
  }

  .contact-label-line {
    display: inline-block;
    width: 28px; height: 1.5px;
    background: #C0162B;
  }

  .contact-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 600; line-height: 1.2;
    color: #1a1a1a;
  }

  .contact-heading em { color: #C0162B; font-style: italic; }

  .contact-body {
    font-family: 'Jost', sans-serif;
    font-size: 0.92rem; color: #666;
    line-height: 1.85;
  }

  /* Info rows */
  .contact-details { display: flex; flex-direction: column; gap: 14px; }

  .contact-detail-row {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 16px;
    border: 1px solid rgba(192,22,43,0.1);
    border-radius: 14px;
    transition: background 0.2s, transform 0.2s;
  }

  .contact-detail-row:hover { background: #FDEAEC; transform: translateX(4px); }

  .contact-detail-icon {
    width: 40px; height: 40px;
    background: #FDEAEC;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  .contact-detail-row:hover .contact-detail-icon { background: #C0162B; }
  .contact-detail-row:hover .contact-detail-icon svg { stroke: white; }
  .contact-detail-icon svg { width: 17px; height: 17px; stroke: #C0162B; transition: stroke 0.2s; }

  .contact-detail-text { display: flex; flex-direction: column; }

  .contact-detail-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #aaa;
  }

  .contact-detail-value {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem; font-weight: 500;
    color: #333; text-decoration: none;
  }

  .contact-detail-value:hover { color: #C0162B; }

  /* Social links */
  .contact-social-heading {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: #888; margin-bottom: 12px;
  }

  .contact-socials { display: flex; gap: 14px; }

  .contact-social-btn {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 20px;
    border-radius: 50px;
    text-decoration: none;
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.06em;
    transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s;
    position: relative; overflow: hidden;
  }

  .contact-social-btn::before {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .contact-social-btn:hover { transform: translateY(-3px); opacity: 0.92; }
  .contact-social-btn:hover::before { left: 100%; }

  .contact-social-btn svg { width: 18px; height: 18px; flex-shrink: 0; }

  .social-instagram {
    background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
    color: white;
    box-shadow: 0 6px 20px rgba(253,29,29,0.3);
  }

  .social-tiktok {
    background: #010101;
    color: white;
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  }

  /* ── RIGHT FORM ── */
  .contact-form-wrap {
    background: #fff;
    border: 1px solid rgba(192,22,43,0.1);
    border-radius: 28px;
    padding: 2.8rem;
    box-shadow: 0 20px 60px rgba(192,22,43,0.08);
    position: relative;
    overflow: hidden;
  }

  .contact-form-wrap::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #C0162B, #D4A44C, #C0162B);
  }

  .contact-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 600;
    color: #1a1a1a; margin-bottom: 0.4rem;
  }

  .contact-form-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; color: #888;
    margin-bottom: 2rem; line-height: 1.6;
  }

  .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }

  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  .form-group { display: flex; flex-direction: column; gap: 6px; }

  .form-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #777;
  }

  .form-input,
  .form-select,
  .form-textarea {
    font-family: 'Jost', sans-serif;
    font-size: 0.88rem; font-weight: 400;
    color: #333;
    background: #fdf8f8;
    border: 1.5px solid rgba(192,22,43,0.12);
    border-radius: 12px;
    padding: 12px 16px;
    outline: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s;
    width: 100%;
  }

  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    border-color: #C0162B;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(192,22,43,0.08);
  }

  .form-textarea { resize: vertical; min-height: 120px; }

  .form-select { appearance: none; cursor: pointer; }

  .form-submit {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: white;
    background: #C0162B;
    border: none;
    padding: 14px 36px;
    border-radius: 40px;
    cursor: pointer;
    position: relative; overflow: hidden;
    box-shadow: 0 6px 24px rgba(192,22,43,0.35);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    width: 100%;
    display: flex; align-items: center; justify-content: center; gap: 10px;
  }

  .form-submit::before {
    content: '';
    position: absolute; top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s ease;
  }

  .form-submit:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(192,22,43,0.45); }
  .form-submit:hover:not(:disabled)::before { left: 100%; }
  .form-submit:disabled { opacity: 0.7; cursor: not-allowed; }

  .form-submit svg { width: 16px; height: 16px; }

  /* Success / Error banners */
  .form-alert {
    padding: 12px 16px;
    border-radius: 12px;
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; font-weight: 500;
    display: flex; align-items: center; gap: 10px;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .form-alert.success {
    background: #f0fdf4;
    border: 1px solid #86efac;
    color: #166534;
  }

  .form-alert.error {
    background: #fff0f0;
    border: 1px solid rgba(192,22,43,0.3);
    color: #C0162B;
  }

  .form-alert svg { width: 16px; height: 16px; flex-shrink: 0; }

  /* Spinner */
  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 960px) {
    .contact-inner { grid-template-columns: 1fr; gap: 3rem; }
    .contact { padding: 70px 1.5rem; }
  }

  @media (max-width: 600px) {
    .contact { padding: 60px 1rem; }
    .form-row { grid-template-columns: 1fr; }
    .contact-form-wrap { padding: 1.8rem 1.4rem; }
    .contact-socials { flex-direction: column; }
    .contact-social-btn { justify-content: center; }
  }
`;

const INQUIRY_OPTIONS = [
  "Health Content Creation",
  "Brand Collaboration",
  "Sponsored Content",
  "Awareness Campaign",
  "Speaking / Workshop",
  "Other",
];

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    inquiry_type: "",
    organization: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ from_name: "", from_email: "", inquiry_type: "", organization: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <section className="contact" id="collaborate">
        <div className="contact-bg-top" />
        <div className="contact-glow" />
        <div className="contact-glow-2" />

        <div className="contact-inner">
          {/* ── LEFT ── */}
          <div className="contact-info">
            <div className="contact-label">
              <span className="contact-label-line" />
              Get In Touch
            </div>

            <h2 className="contact-heading">
              Let's Create Something <em>Impactful</em> Together
            </h2>

            <p className="contact-body">
              Whether you're a mum, dad, daughter, guardian, school, organisation, or parent looking for partnership or collaboration — I'd love to hear from you. Let's work together to make health information simple, relatable, and impactful for every family.
            </p>

            <div className="contact-details">
              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <span className="contact-detail-label">Email</span>
                  <a href="mailto:hello@thethoughtfulnurse.com" className="contact-detail-value">
                    thoughtfulnurse01@gmail.com 
                  </a>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <span className="contact-detail-label">Available</span>
                  <span className="contact-detail-value">Online</span>
                </div>
              </div>

              <div className="contact-detail-row">
                <div className="contact-detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <span className="contact-detail-label">Community</span>
                  <span className="contact-detail-value">more than 8,000+ followers across platforms</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="contact-social-heading">Find Me On</p>
              <div className="contact-socials">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/the_thoughtful_nurse?igsh=cnZ6c3l2bjBiOWY4&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn social-instagram"
                >
                  <svg viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@thoughtfulnurse?_r=1&_t=ZN-970hMShuuFa"
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn social-tiktok"
                >
                  <svg viewBox="0 0 24 24" fill="white">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.77 1.52V7.12a4.85 4.85 0 0 1-1-.43z"/>
                  </svg>
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT FORM ── */}
          <div className="contact-form-wrap">
            <div className="contact-form-title">Send a Message</div>
            <p className="contact-form-sub">
              Fill in the form below and I'll get back to you within 24 hours.
            </p>

            {status === "success" && (
              <div className="form-alert success" style={{ marginBottom: "1.2rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Message sent! Thoughtful Nurse will be in touch within 48 hours.
              </div>
            )}

            {status === "error" && (
              <div className="form-alert error" style={{ marginBottom: "1.2rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Something went wrong. Please try again or reach out via Instagram.
              </div>
            )}

            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="from_name">Full Name *</label>
                  <input
                    id="from_name"
                    name="from_name"
                    type="text"
                    className="form-input"
                    placeholder="Your full name pls"
                    value={form.from_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="from_email">Email Address *</label>
                  <input
                    id="from_email"
                    name="from_email"
                    type="email"
                    className="form-input"
                    placeholder="jane@example.com"
                    value={form.from_email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="inquiry_type">Inquiry Type *</label>
                  <select
                    id="inquiry_type"
                    name="inquiry_type"
                    className="form-select"
                    value={form.inquiry_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    {INQUIRY_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="organization">Organisation / Brand</label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    className="form-input"
                    placeholder="Company name (optional)"
                    value={form.organization}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell me about your project, campaign, or how you'd like to collaborate..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="form-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <div className="spinner" />
                    Sending...
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
