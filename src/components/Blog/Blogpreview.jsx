import { useState, useEffect } from "react";
import "./Blogpreview.css";

const blogPosts = [
  {
    id: 1,
    category: "Puberty",
    title: "Understanding Puberty in Young Girls",
    excerpt:
      "Puberty brings physical and emotional changes. Understanding these changes helps girls feel prepared and confident.",
    readTime: "4 min read",
    gradient: "linear-gradient(135deg,#8B0F1F,#C0162B)",
  },
  {
    id: 2,
    category: "Menstrual Health",
    title: "First Period: What Every Girl Should Know",
    excerpt:
      "Everything young girls need to know about their first period and menstrual hygiene.",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg,#C0162B,#D4845A)",
  },
  {
    id: 3,
    category: "For Parents",
    title: "Talking About Health With Your Daughter",
    excerpt:
      "Practical ways parents can create healthy and open conversations.",
    readTime: "4 min read",
    gradient: "linear-gradient(135deg,#7B1A2E,#C0162B,#e8855a)",
  },
  {
    id: 4,
    category: "Body Confidence",
    title: "Helping Girls Build Positive Body Image",
    excerpt:
      "Encouraging self-esteem and confidence during adolescence.",
    readTime: "4 min read",
    gradient: "linear-gradient(135deg,#C0162B,#8B0F1F)",
  },
  {
    id: 5,
    category: "Nutrition & Wellness",
    title: "Healthy Foods For Growing Girls",
    excerpt:
      "Nutrition tips that support growth, energy, and overall wellbeing.",
    readTime: "3 min read",
    gradient: "linear-gradient(135deg,#8B0F1F,#b5351f)",
  },
  {
    id: 6,
    category: "Prevention",
    title: "Simple Hygiene Habits That Prevent Illness",
    excerpt:
      "Healthy habits every young girl should practice daily.",
    readTime: "3 min read",
    gradient: "linear-gradient(135deg,#8B0F1F,#C0162B)",
  },
];

function BlogPage({ post, onBack }) {
  return (
    <div className="article-page">
      <button onClick={onBack} className="back-btn">
        ← Back
      </button>

      <div
        className="article-hero"
        style={{ background: post.gradient }}
      >
        <h1>{post.title}</h1>
      </div>

      <div className="article-content">
        <p>{post.excerpt}</p>

        <h3>Why It Matters</h3>

        <p>
          Understanding health topics early helps girls make informed
          decisions and develop healthy habits for life.
        </p>

        <h3>Key Takeaways</h3>

        <p>
          Parents, caregivers, and educators all play an important role
          in supporting healthy development.
        </p>

        <h3>Conclusion</h3>

        <p>
          Access to trusted health information empowers girls to grow
          with confidence and wellbeing.
        </p>
      </div>
    </div>
  );
}

export default function BlogSection() {
  const [posts] = useState(blogPosts);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

    const lastUpdate = localStorage.getItem("blog-update");

    if (
      !lastUpdate ||
      Date.now() - Number(lastUpdate) > TWO_DAYS
    ) {
      localStorage.setItem(
        "blog-update",
        Date.now().toString()
      );
    }
  }, []);

  if (selectedPost) {
    return (
      <BlogPage
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
      />
    );
  }

  return (
    <section className="blog-section">
      <div className="blog-header">
        <h2>Women's Health Blog</h2>
        <p>
          Health education for women, mothers, and young girls.
        </p>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <div
            key={post.id}
            className="blog-card"
            onClick={() => setSelectedPost(post)}
          >
            <div
              className="blog-card-top"
              style={{ background: post.gradient }}
            >
              <span>{post.category}</span>
            </div>

            <div className="blog-card-body">
              <h3>{post.title}</h3>

              <p>{post.excerpt}</p>

              <div className="blog-footer">
                <span>{post.readTime}</span>
                <span>Read More →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}