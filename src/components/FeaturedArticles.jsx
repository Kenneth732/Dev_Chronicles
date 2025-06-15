
// 
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/FeaturedArticles.module.css'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const FeaturedArticles = () => {
  const sectionRef = useRef(null);
  const articleRefs = useRef([]);
  const [hoveredArticle, setHoveredArticle] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transitionDelay = `${index * 0.1}s`;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    articleRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, []);

  const articles = [
    {
      id: 1,
      title: "Scaling Microservices with Rust & Kubernetes",
      excerpt: "Learn how to optimize performance in distributed systems using Rust's concurrency model with zero-cost abstractions.",
      category: "Backend",
      readTime: "8 min read",
      date: "May 15, 2024",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      accentColor: "#4f46e5"
    },
    {
      id: 2,
      title: "React 19: Concurrent Rendering Deep Dive",
      excerpt: "Explore the new concurrent features in React 19 and how they revolutionize rendering performance in modern web apps.",
      category: "Frontend",
      readTime: "6 min read",
      date: "April 28, 2024",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      accentColor: "#10b981"
    },
    {
      id: 3,
      title: "PostgreSQL vs MongoDB: Architectural Showdown",
      excerpt: "A detailed comparison of relational and document databases for modern applications at enterprise scale.",
      category: "Database",
      readTime: "10 min read",
      date: "April 10, 2024",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      accentColor: "#4f46e5"
    },
    {
      id: 4,
      title: "The Future of WebAssembly in Edge Computing",
      excerpt: "How WebAssembly is enabling near-native performance for compute-intensive tasks at the network edge.",
      category: "Web Development",
      readTime: "7 min read",
      date: "June 2, 2024",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      accentColor: "#f59e0b"
    },
    {
      id: 5,
      title: "Building AI-Powered Search with Vector Databases",
      excerpt: "Implement semantic search capabilities using Pinecone and OpenAI's embeddings for next-gen applications.",
      category: "AI/ML",
      readTime: "9 min read",
      date: "May 22, 2024",
      image: "https://media.licdn.com/dms/image/v2/D5612AQHmP2rZbPHX_A/article-cover_image-shrink_720_1280/B56Zag6LQ5GkAQ-/0/1746456328026?e=2147483647&v=beta&t=XF40BKDwzdDzBaE8BhxJuL9q2bzF7NZ_t9vH7n615Wk",
      accentColor: "#ef4444"
    },
    {
      id: 6,
      title: "CSS Container Queries: The New Responsive Design",
      excerpt: "Move beyond media queries - learn how container queries give components true responsive independence.",
      category: "Frontend",
      readTime: "5 min read",
      date: "May 5, 2024",
      image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      accentColor: "#3b82f6"
    },
    {
      id: 7,
      title: "Golang for Cloud-Native Development",
      excerpt: "Why Go's simplicity and built-in concurrency make it ideal for building cloud-native microservices.",
      category: "Backend",
      readTime: "8 min read",
      date: "April 18, 2024",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      accentColor: "#10b981"
    },
    {
      id: 8,
      title: "DevOps 2024: The Rise of Platform Engineering",
      excerpt: "How platform teams are abstracting infrastructure complexity with internal developer platforms.",
      category: "DevOps",
      readTime: "11 min read",
      date: "March 30, 2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      accentColor: "#8b5cf6"
    }
  ];

  return (
    <section id="featured" className={styles.section} ref={sectionRef}>
      {/* Luxury decorative elements */}
      <div className={styles.luxuryAccent}></div>
      <div className={styles.particlesContainer}></div>

      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.titleLine}>Featured</span>
              <span className={styles.titleLine}>Articles</span>
            </h2>
            <div className={styles.titleUnderline}></div>
          </div>
          <p className={styles.sectionSubtitle}>
            Premium technical insights from our engineering team
          </p>
          <div className={styles.sectionDecoration}></div>
        </div>

        <div className={styles.articlesGrid}>
          {articles.map((article, index) => (
            <article
              key={article.id}
              ref={(el) => (articleRefs.current[index] = el)}
              className={styles.articleCard}
              onMouseEnter={() => setHoveredArticle(article.id)}
              onMouseLeave={() => setHoveredArticle(null)}
              style={{
                '--accent-color': article.accentColor,
                '--hover-glow': `${article.accentColor}20`
              }}
            >
              <div className={styles.articleVisual}>
                <div className={styles.imageContainer}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles.articleImage}
                  />
                  <div className={styles.imageOverlay}></div>
                </div>
                <span className={styles.categoryTag}>
                  {article.category}
                </span>
                {hoveredArticle === article.id && (
                  <div className={styles.articleGlow}></div>
                )}
              </div>

              <div className={styles.articleContent}>
                <div className={styles.articleHeader}>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                  <div className={styles.articleMeta}>
                    <span className={styles.readTime}>{article.readTime}</span>
                    <span className={styles.date}>{article.date}</span>
                  </div>
                </div>
                <p className={styles.articleExcerpt}>{article.excerpt}</p>

                <Link
                  to={`/article/${article.id}`}
                  className={styles.readMore}
                  state={{ article }} // Pass the entire article data as state
                >
                  <span>Read Full Analysis</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

              </div>
            </article>
          ))}
        </div>

        <Link to="/articles" className={styles.viewAll}>
          <span>Explore All Articles</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArticles;


