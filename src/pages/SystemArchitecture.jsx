import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/SystemArchitecture.module.css';

const SystemArchitecture = () => {
  const [activeTab, setActiveTab] = useState('patterns');
  const [animatedStats, setAnimatedStats] = useState({
    systems: 0,
    performance: 0,
    uptime: 0
  });

  // Animate statistics
  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimatedStats({
        systems: Math.floor(progress * 120),
        performance: Math.floor(progress * 20),
        uptime: (99.9 + progress * 0.099).toFixed(3)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  const patterns = [
    {
      name: "Microservices",
      icon: "🧩",
      description: "Decoupled services communicating via APIs for independent scaling",
      benefits: ["Technology flexibility", "Team autonomy", "Granular scaling"],
      complexity: "Medium-High"
    },
    {
      name: "Event-Driven",
      icon: "⚡",
      description: "Systems that communicate through events for loose coupling",
      benefits: ["Real-time processing", "High scalability", "Resilient failures"],
      complexity: "High"
    },
    {
      name: "Serverless",
      icon: "☁️",
      description: "Cloud-native execution model without managing infrastructure",
      benefits: ["Reduced ops overhead", "Auto-scaling", "Cost efficiency"],
      complexity: "Low-Medium"
    }
  ];

  const methodologies = [
    {
      name: "Domain-Driven Design",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDK4F91srtXpacQcAtCG0VfZXS4jJMWte-LQ&s",
      description: "Aligning software architecture with business domains",
      phases: ["Strategic Design", "Tactical Design", "Implementation"],
      expertise: "Advanced"
    },
    {
      name: "C4 Model",
      logo: "https://infostart.ru/upload/iblock/50d/50dd77ec284cca1070600cf82822c5ca.png",
      description: "Hierarchical abstractions for visualizing architecture",
      phases: ["Context", "Containers", "Components", "Code"],
      expertise: "Intermediate"
    },
    {
      name: "TOGAF",
      logo: "https://images.credly.com/images/fc27924a-9f1b-4d6b-9b16-e58de1e868eb/blob",
      description: "Enterprise architecture framework for large organizations",
      phases: ["ADM", "Architecture Vision", "Implementation"],
      expertise: "Expert"
    }
  ];

  const principles = [
    {
      title: "Scalability",
      description: "Design systems to handle growth in users, data, and traffic",
      icon: "📈",
      techniques: ["Horizontal scaling", "Caching", "Database sharding"]
    },
    {
      title: "Reliability",
      description: "Ensure systems operate correctly under expected conditions",
      icon: "🛡️",
      techniques: ["Redundancy", "Circuit breakers", "Self-healing"]
    },
    {
      title: "Maintainability",
      description: "Design for ease of modification and extension",
      icon: "🔧",
      techniques: ["Modular design", "Documentation", "Standardization"]
    }
  ];

  return (
    <div className={styles.architecturePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>System</span>
            <span className={styles.titleLine}>
              <span className={styles.titleAccent}>Architecture</span>
              <span className={styles.titleDot}>.</span>
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            Designing the structural foundations of digital systems for scalability, reliability, and performance
          </p>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.systems}+</span>
              <span className={styles.statLabel}>Systems Designed</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.performance}x</span>
              <span className={styles.statLabel}>Performance Gains</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.uptime}%</span>
              <span className={styles.statLabel}>Average Uptime</span>
            </div>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <img src="https://static.vecteezy.com/system/resources/previews/026/746/560/non_2x/development-architecture-computer-systems-of-a-smart-building-design-modern-building-construction-with-ai-controls-project-smart-house-construction-with-artificial-intelligence-generate-ai-free-photo.jpg" alt="System architecture" />
        </div>
      </section>

      {/* Patterns & Methodologies Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Architecture Approaches</h2>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'patterns' ? styles.active : ''}`}
              onClick={() => setActiveTab('patterns')}
            >
              Patterns
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'methodologies' ? styles.active : ''}`}
              onClick={() => setActiveTab('methodologies')}
            >
              Methodologies
            </button>
          </div>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'patterns' && (
            <div className={styles.patternsGrid}>
              {patterns.map((pattern, index) => (
                <div key={index} className={styles.patternCard}>
                  <div className={styles.patternIcon}>{pattern.icon}</div>
                  <h3 className={styles.patternName}>{pattern.name}</h3>
                  <p className={styles.patternDescription}>{pattern.description}</p>
                  <div className={styles.complexity}>
                    <span className={styles.complexityLabel}>Complexity:</span>
                    <span className={styles.complexityValue}>{pattern.complexity}</span>
                  </div>
                  <div className={styles.benefitsList}>
                    <h4 className={styles.benefitsTitle}>Key Benefits:</h4>
                    <ul>
                      {pattern.benefits.map((benefit, i) => (
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
          )}

          {activeTab === 'methodologies' && (
            <div className={styles.methodologiesGrid}>
              {methodologies.map((method, index) => (
                <div key={index} className={styles.methodologyCard}>
                  <div className={styles.methodologyHeader}>
                    <img src={method.logo} alt={method.name} className={styles.methodologyLogo} />
                    <span className={`${styles.expertiseBadge} ${styles[method.expertise.toLowerCase()]}`}>
                      {method.expertise}
                    </span>
                  </div>
                  <h3 className={styles.methodologyName}>{method.name}</h3>
                  <p className={styles.methodologyDescription}>{method.description}</p>
                  <div className={styles.phases}>
                    <h4 className={styles.phasesTitle}>Implementation Phases:</h4>
                    <ul>
                      {method.phases.map((phase, i) => (
                        <li key={i} className={styles.phaseItem}>
                          <span className={styles.phaseNumber}>{i + 1}</span>
                          {phase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Principles Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Architecture Principles</h2>
        <p className={styles.sectionSubtitle}>Foundational guidelines for building robust systems</p>
        
        <div className={styles.principlesGrid}>
          {principles.map((principle, index) => (
            <div key={index} className={styles.principleCard}>
              <div className={styles.principleIcon}>{principle.icon}</div>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleDescription}>{principle.description}</p>
              <div className={styles.techniques}>
                <h4 className={styles.techniquesTitle}>Implementation Techniques:</h4>
                <ul>
                  {principle.techniques.map((technique, i) => (
                    <li key={i} className={styles.techniqueItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {technique}
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
          <h2 className={styles.sectionTitle}>Architecture Transformations</h2>
          <Link to="/case-studies" className={styles.viewAllLink}>
            View All Case Studies →
          </Link>
        </div>
        
        <div className={styles.caseStudiesGrid}>
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImage}>
              <img src="https://blog.sparkfabrik.com/hs-fs/hubfs/Blog/monolothic-microservices-image-articles.png?width=1391&name=monolothic-microservices-image-articles.png" alt="Monolith to Microservices" />
              <div className={styles.techStack}>
                <span>Domain Analysis</span>
                <span>Kubernetes</span>
                <span>Event Sourcing</span>
              </div>
            </div>
            <div className={styles.caseStudyContent}>
              <h3 className={styles.caseStudyTitle}>Monolith to Microservices</h3>
              <p className={styles.caseStudyDescription}>
                Incremental decomposition of a 10-year-old monolith into domain-driven microservices.
              </p>
              <div className={styles.results}>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>5x</span>
                  <span className={styles.resultLabel}>Deployment Frequency</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>70%</span>
                  <span className={styles.resultLabel}>Reduced Incidents</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImage}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTToIo6qo0p4yF4a25uqHCzFfgoD71SEv4-Q&s" alt="Global Architecture" />
              <div className={styles.techStack}>
                <span>Multi-Region</span>
                <span>Active-Active</span>
                <span>Event-Driven</span>
              </div>
            </div>
            <div className={styles.caseStudyContent}>
              <h3 className={styles.caseStudyTitle}>Global Platform Architecture</h3>
              <p className={styles.caseStudyDescription}>
                Designed a multi-region active-active architecture for a financial platform serving 15 countries.
              </p>
              <div className={styles.results}>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>50ms</span>
                  <span className={styles.resultLabel}>Global Latency</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>99.99%</span>
                  <span className={styles.resultLabel}>Availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Architecture Resources</h2>
        <p className={styles.sectionSubtitle}>Guides and references for mastering system design</p>
        
        <div className={styles.resourcesGrid}>
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Guide</div>
            <h3 className={styles.resourceTitle}>Microservices Decomposition</h3>
            <p className={styles.resourceDescription}>
              Step-by-step approach to identifying service boundaries in existing monoliths.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>40 min read</span>
              <span className={styles.resourceLevel}>Advanced</span>
            </div>
          </div>
          
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Template</div>
            <h3 className={styles.resourceTitle}>Architecture Decision Records</h3>
            <p className={styles.resourceDescription}>
              Collection of ADR templates for documenting important architecture decisions.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>15 min read</span>
              <span className={styles.resourceLevel}>All Levels</span>
            </div>
          </div>
          
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Video</div>
            <h3 className={styles.resourceTitle}>Event-Driven Patterns</h3>
            <p className={styles.resourceDescription}>
              Deep dive into event sourcing, CQRS, and event-carried state transfer.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>1h 30m</span>
              <span className={styles.resourceLevel}>Intermediate</span>
            </div>
          </div>
        </div>
        
        <div className={styles.ctaContainer}>
          <Link to="/resources/architecture" className={styles.primaryButton}>
            Browse All Resources
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Architect for Scale?</h2>
          <p className={styles.ctaText}>
            Our architects can help design systems that grow with your business while maintaining performance and reliability.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              Start a Consultation
            </Link>
            <Link to="/hire-architects" className={styles.secondaryButton}>
              Hire Our Architects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemArchitecture;