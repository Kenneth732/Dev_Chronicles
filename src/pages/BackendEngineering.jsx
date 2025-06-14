import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/BackendEngineering.module.css';

const BackendEngineering = () => {
  const [activeTab, setActiveTab] = useState('languages');
  const [animatedStats, setAnimatedStats] = useState({
    apis: 0,
    databases: 0,
    microservices: 0
  });

  // Animate statistics
  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimatedStats({
        apis: Math.floor(progress * 300),
        databases: Math.floor(progress * 25),
        microservices: Math.floor(progress * 50)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  const languages = [
    {
      name: "Node.js",
      logo: "https://i.pinimg.com/736x/61/15/fd/6115fdd66b649d2f99ee6eb0fb801d88.jpg",
      description: "JavaScript runtime for building scalable network applications",
      strengths: ["High I/O throughput", "Large ecosystem", "Full-stack consistency"],
      expertise: "Expert"
    },
    {
      name: "Python",
      logo: "https://i.pinimg.com/736x/1c/86/84/1c8684b06bc7ad1e1f6b7b0099d87300.jpg",
      description: "Versatile language for data-intensive and scientific computing",
      strengths: ["AI/ML integration", "Rapid development", "Rich libraries"],
      expertise: "Advanced"
    },
    {
      name: "Go",
      logo: "https://i.pinimg.com/736x/75/3d/5d/753d5db730310a5037a9128bb12d6132.jpg",
      description: "Statically typed compiled language for high-performance services",
      strengths: ["Concurrency model", "Small footprint", "Fast execution"],
      expertise: "Advanced"
    }
  ];

  const technologies = [
    {
      name: "GraphQL",
      logo: "https://i.pinimg.com/736x/01/73/a8/0173a847c9c60f727212798711d1ba08.jpg",
      description: "Query language for APIs that enables declarative data fetching",
      useCase: "Complex data requirements with flexible queries"
    },
    {
      name: "Kubernetes",
      logo: "https://images.seeklogo.com/logo-png/44/1/google-kubernetes-engine-gke-logo-png_seeklogo-447023.png",
      description: "Container orchestration system for automating deployment",
      useCase: "Scalable microservices architectures"
    },
    {
      name: "Redis",
      logo: "https://cdn4.iconfinder.com/data/icons/redis-2/1451/Untitled-2-512.png",
      description: "In-memory data structure store used as cache and message broker",
      useCase: "High-performance caching and real-time features"
    }
  ];

  const architectures = [
    {
      title: "Microservices",
      description: "Decoupled services communicating via APIs for independent scaling",
      icon: "🧩",
      benefits: ["Improved scalability", "Technology flexibility", "Faster deployments"]
    },
    {
      title: "Event-Driven",
      description: "Systems that communicate through events for loose coupling",
      icon: "⚡",
      benefits: ["Real-time processing", "High scalability", "Resilient failures"]
    },
    {
      title: "Serverless",
      description: "Cloud-native execution model without managing infrastructure",
      icon: "☁️",
      benefits: ["Reduced ops overhead", "Auto-scaling", "Cost efficiency"]
    }
  ];

  return (
    <div className={styles.backendPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Backend</span>
            <span className={styles.titleLine}>
              <span className={styles.titleAccent}>Engineering</span>
              <span className={styles.titleDot}>.</span>
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            Building scalable, secure, and high-performance server-side systems that power modern applications
          </p>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.apis}+</span>
              <span className={styles.statLabel}>APIs Built</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.databases}+</span>
              <span className={styles.statLabel}>Database Systems</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.microservices}+</span>
              <span className={styles.statLabel}>Microservices</span>
            </div>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <img src="https://media.licdn.com/dms/image/v2/D4E12AQHpgd2khI2L8g/article-cover_image-shrink_720_1280/B4EZcpytn_H0AM-/0/1748752850989?e=2147483647&v=beta&t=-zqGSgeeczY0OJN1Ts2O9xqi38zoUhtcqIMYp4_xPO0" alt="Backend engineering" />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Backend Stack</h2>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'languages' ? styles.active : ''}`}
              onClick={() => setActiveTab('languages')}
            >
              Languages
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'technologies' ? styles.active : ''}`}
              onClick={() => setActiveTab('technologies')}
            >
              Technologies
            </button>
          </div>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'languages' && (
            <div className={styles.techGrid}>
              {languages.map((lang, index) => (
                <div key={index} className={styles.techCard}>
                  <div className={styles.techHeader}>
                    <img src={lang.logo} alt={lang.name} className={styles.techLogo} />
                    <span className={`${styles.expertiseBadge} ${styles[lang.expertise.toLowerCase()]}`}>
                      {lang.expertise}
                    </span>
                  </div>
                  <h3 className={styles.techName}>{lang.name}</h3>
                  <p className={styles.techDescription}>{lang.description}</p>
                  <div className={styles.strengthsList}>
                    <h4 className={styles.strengthsTitle}>Strengths:</h4>
                    <ul>
                      {lang.strengths.map((strength, i) => (
                        <li key={i} className={styles.strengthItem}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={`/case-studies/${lang.name.toLowerCase()}`} className={styles.caseStudyLink}>
                    View Case Studies →
                  </Link>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'technologies' && (
            <div className={styles.techGrid}>
              {technologies.map((tech, index) => (
                <div key={index} className={styles.techCard}>
                  <div className={styles.techHeader}>
                    <img src={tech.logo} alt={tech.name} className={styles.techLogo} />
                  </div>
                  <h3 className={styles.techName}>{tech.name}</h3>
                  <p className={styles.techDescription}>{tech.description}</p>
                  <div className={styles.useCase}>
                    <span className={styles.useCaseLabel}>Ideal For:</span>
                    {tech.useCase}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Architecture Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Architecture Approaches</h2>
        <p className={styles.sectionSubtitle}>Proven patterns for building robust backend systems</p>
        
        <div className={styles.architecturesGrid}>
          {architectures.map((arch, index) => (
            <div key={index} className={styles.architectureCard}>
              <div className={styles.architectureIcon}>{arch.icon}</div>
              <h3 className={styles.architectureTitle}>{arch.title}</h3>
              <p className={styles.architectureDescription}>{arch.description}</p>
              <div className={styles.benefitsList}>
                <h4 className={styles.benefitsTitle}>Key Benefits:</h4>
                <ul>
                  {arch.benefits.map((benefit, i) => (
                    <li key={i} className={styles.benefitItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Backend Engineering Projects</h2>
          <Link to="/case-studies" className={styles.viewAllLink}>
            View All Case Studies →
          </Link>
        </div>
        
        <div className={styles.caseStudiesGrid}>
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImage}>
              <img src="https://www.akana.com/sites/default/files/image/2019-06/image-blog-apis-inside-enterprise-600x400.jpg" alt="API Platform" />
              <div className={styles.techStack}>
                <span>Node.js</span>
                <span>GraphQL</span>
                <span>MongoDB</span>
              </div>
            </div>
            <div className={styles.caseStudyContent}>
              <h3 className={styles.caseStudyTitle}>Enterprise API Platform</h3>
              <p className={styles.caseStudyDescription}>
                Scalable API gateway handling 50M+ requests daily with 99.99% uptime and advanced rate limiting.
              </p>
              <div className={styles.results}>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>50ms</span>
                  <span className={styles.resultLabel}>Avg Response Time</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>99.99%</span>
                  <span className={styles.resultLabel}>Uptime</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImage}>
              <img src="https://estuary.dev/static/912ef28fa67caee0ed7952e0e04683cd/9bd89/2af0bb_02_build_data_pipeline_show_to_build_a_data_pipeline_d1513222f9.png" alt="Data Pipeline" />
              <div className={styles.techStack}>
                <span>Python</span>
                <span>Kafka</span>
                <span>Spark</span>
              </div>
            </div>
            <div className={styles.caseStudyContent}>
              <h3 className={styles.caseStudyTitle}>Real-time Data Pipeline</h3>
              <p className={styles.caseStudyDescription}>
                Processing 2TB of IoT data daily with stream processing and real-time analytics dashboards.
              </p>
              <div className={styles.results}>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>2TB/day</span>
                  <span className={styles.resultLabel}>Data Processed</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>200ms</span>
                  <span className={styles.resultLabel}>End-to-End Latency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Backend Resources</h2>
        <p className={styles.sectionSubtitle}>Deep dives into backend engineering concepts</p>
        
        <div className={styles.resourcesGrid}>
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Guide</div>
            <h3 className={styles.resourceTitle}>API Design Best Practices</h3>
            <p className={styles.resourceDescription}>
              Comprehensive guide to designing RESTful and GraphQL APIs for scalability and maintainability.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>30 min read</span>
              <span className={styles.resourceLevel}>Intermediate</span>
            </div>
          </div>
          
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Tutorial</div>
            <h3 className={styles.resourceTitle}>Microservices Patterns</h3>
            <p className={styles.resourceDescription}>
              Practical patterns for decomposing monoliths and implementing microservices.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>45 min read</span>
              <span className={styles.resourceLevel}>Advanced</span>
            </div>
          </div>
          
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Video</div>
            <h3 className={styles.resourceTitle}>Database Optimization</h3>
            <p className={styles.resourceDescription}>
              Techniques for optimizing SQL and NoSQL database performance at scale.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>1h 15m</span>
              <span className={styles.resourceLevel}>Intermediate</span>
            </div>
          </div>
        </div>
        
        <div className={styles.ctaContainer}>
          <Link to="/resources/backend" className={styles.primaryButton}>
            Explore All Resources
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Need Robust Backend Solutions?</h2>
          <p className={styles.ctaText}>
            Our backend engineers can design and implement systems that scale with your business needs.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              Discuss Your Project
            </Link>
            <Link to="/hire-backend-developers" className={styles.secondaryButton}>
              Hire Backend Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BackendEngineering;