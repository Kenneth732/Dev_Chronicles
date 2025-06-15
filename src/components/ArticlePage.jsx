import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import styles from '../styles/ArticlePage.module.css';

const ArticlePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const article = location.state?.article;
  const contentRef = useRef(null);
  const heroRef = useRef(null);
  const particlesRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Create interactive particles
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Particle system
    if (!particlesRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particleCount = isMobile ? 15 : 30;
    const particles = [];

    const resizeCanvas = () => {
      canvas.width = particlesRef.current.offsetWidth;
      canvas.height = particlesRef.current.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.1 + 0.05,
        targetX: 0,
        targetY: 0
      });
    }

    // Animation loop
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Move particles upward
        particle.y -= particle.speed;
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(79, 70, 229, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);

            // Highlight TOC item when section is visible
            if (entry.target.id) {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-100px 0px -100px 0px' }
    );

    // Observe all sections with IDs
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    if (heroRef.current) observer.observe(heroRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  // Parallax effect for hero image
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const hero = heroRef.current;
        const img = hero.querySelector('img');

        if (img) {
          img.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className={styles.articlePage}>
        <div className={styles.container}>
          <p>Article not found</p>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.articlePage}>
      {/* Interactive Particles Background */}
      <div ref={particlesRef} className={styles.particlesContainer}>
        <canvas ref={canvasRef} className={styles.particlesCanvas} />
      </div>

      {/* Dynamic Accent Color */}
      <div className={styles.luxuryAccent} style={{ '--accent-color': article.accentColor }}></div>

      {/* Hero Section */}
      <div className={styles.hero} ref={heroRef} style={{ '--accent-color': article.accentColor }}>
        <div className={styles.heroContent}>
          <span className={styles.categoryTag} style={{ backgroundColor: article.accentColor }}>
            {article.category}
          </span>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <div className={styles.articleMeta}>
            <span className={styles.readTime}>{article.readTime}</span>
            <span className={styles.date}>{article.date}</span>
            <span className={styles.author}>By Engineering Team</span>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src={article.image}
            alt={article.title}
            className={styles.articleImage}
          />
          <div className={styles.imageOverlay}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.container} ref={contentRef}>
        <div className={styles.contentWrapper}>
          <article className={styles.articleContent}>
            <p className={styles.articleExcerpt}>{article.excerpt}</p>

            <div className={styles.fullContent}>
              <section id="introduction">
                <h2>Introduction</h2>
                <p>This is where the full content of the article would appear. In a real application, this would be fetched from a database or CMS based on the article ID.</p>
                <p>Modern web development requires a deep understanding of both technical and design principles to create truly engaging experiences.</p>
              </section>

              <section id="detailed-analysis">
                <h2>Detailed Analysis</h2>
                <p>Here you would expand on the excerpt with detailed analysis, code examples, diagrams, etc.</p>
                <p>Performance optimization techniques can dramatically improve user experience and conversion rates. Let's examine some key strategies:</p>

                <div className={styles.codeBlockWrapper}>
                  <pre><code>{`// Performance optimization example
function optimizeComponent() {
  // Memoize expensive calculations
  const memoizedValue = useMemo(() => 
    computeExpensiveValue(props), 
    [props]
  );

  // Lazy load heavy components
  const HeavyComponent = React.lazy(() => 
    import('./HeavyComponent')
  );

  return (
    <Suspense fallback={<Loader />}>
      <HeavyComponent data={memoizedValue} />
    </Suspense>
  );
}`}</code></pre>
                  <button className={styles.copyButton}>Copy Code</button>
                </div>
              </section>

              <section id="key-takeaways">
                <h3>Key Takeaways</h3>
                <ul className={styles.keyPoints}>
                  <li className={styles.keyPointItem}>
                    <div className={styles.keyPointMarker}></div>
                    <div className={styles.keyPointContent}>
                      <strong>First key point about {article.title}</strong>
                      <p>Detailed explanation of why this point matters and how to implement it</p>
                    </div>
                  </li>
                  <li className={styles.keyPointItem}>
                    <div className={styles.keyPointMarker}></div>
                    <div className={styles.keyPointContent}>
                      <strong>Second important aspect</strong>
                      <p>Real-world examples and case studies demonstrating this concept</p>
                    </div>
                  </li>
                  <li className={styles.keyPointItem}>
                    <div className={styles.keyPointMarker}></div>
                    <div className={styles.keyPointContent}>
                      <strong>Practical applications</strong>
                      <p>Step-by-step guide for implementing these techniques in your projects</p>
                    </div>
                  </li>
                </ul>

                <div className={styles.quoteBlock}>
                  <div className={styles.quoteMark}>"</div>
                  <p className={styles.quoteText}>The most effective engineering solutions combine technical excellence with thoughtful design to create seamless user experiences.</p>
                  <div className={styles.quoteAuthor}>— Engineering Team</div>
                </div>
              </section>
            </div>
          </article>

          {/* Interactive Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarSection}>
              <h3>Table of Contents</h3>
              <nav className={styles.toc}>
                <ul>
                  <li className={activeSection === 'introduction' ? styles.active : ''}>
                    <Link to="#introduction">Introduction</Link>
                  </li>
                  <li className={activeSection === 'detailed-analysis' ? styles.active : ''}>
                    <Link to="#detailed-analysis">Detailed Analysis</Link>
                  </li>
                  <li className={activeSection === 'key-takeaways' ? styles.active : ''}>
                    <Link to="#key-takeaways">Key Takeaways</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className={styles.sidebarSection}>
              <h3>Related Articles</h3>
              <div className={styles.relatedArticles}>
                <Link to="#" className={styles.relatedArticle}>
                  <span className={styles.relatedArticleTitle}>Advanced React Patterns</span>
                  <span className={styles.relatedArticleMeta}>8 min read</span>
                </Link>
                <Link to="#" className={styles.relatedArticle}>
                  <span className={styles.relatedArticleTitle}>Performance Optimization</span>
                  <span className={styles.relatedArticleMeta}>12 min read</span>
                </Link>
                <Link href="#" className={styles.relatedArticle}>
                  <span className={styles.relatedArticleTitle}>CSS Architecture</span>
                  <span className={styles.relatedArticleMeta}>6 min read</span>
                </Link>
              </div>
            </div>

            <div className={styles.sidebarSection}>
              <h3>Share This Article</h3>
              <div className={styles.socialShare}>
                <button className={styles.socialButton}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" />
                  </svg>
                </button>
                <button className={styles.socialButton}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" fill="currentColor" />
                  </svg>
                </button>
                <button className={styles.socialButton}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="currentColor" />
                    <rect x="2" y="9" width="4" height="12" fill="currentColor" />
                    <circle cx="4" cy="4" r="2" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </div>

        <Link to="/" className={styles.backButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Articles
        </Link>
      </div>
    </div>
  );
};

export default ArticlePage;

