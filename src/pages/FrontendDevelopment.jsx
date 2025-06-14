import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/FrontendDevelopment.module.css';

const FrontendDevelopment = () => {
  const [activeTab, setActiveTab] = useState('frameworks');
  const [animatedStats, setAnimatedStats] = useState({
    tools: 0,
    frameworks: 0,
    projects: 0
  });

  // Animate statistics
  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimatedStats({
        tools: Math.floor(progress * 25),
        frameworks: Math.floor(progress * 12),
        projects: Math.floor(progress * 150)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  const frameworks = [
    {
      name: "React",
      logo: "https://i.pinimg.com/736x/79/3b/cd/793bcdcdbf310b578479a1398fca86a8.jpg",
      description: "Building performant, component-based UIs with modern React hooks and context API",
      pros: ["Virtual DOM", "Rich ecosystem", "Reusable components"],
      expertise: "Advanced"
    },
    {
      name: "Next.js",
      logo: "https://i.pinimg.com/736x/5e/b9/5e/5eb95eaf598d1007befaa78d038c2b2f.jpg",
      description: "Production-grade React framework for SSR, static sites, and hybrid applications",
      pros: ["Server-side rendering", "API routes", "Image optimization"],
      expertise: "Expert"
    },
    {
      name: "Vue",
      logo: "https://i.pinimg.com/736x/89/39/34/893934041bc3db151ce858c950cd4546.jpg",
      description: "Progressive framework for building approachable, versatile maintainable UIs",
      pros: ["Reactive data", "Single-file components", "Gentle learning curve"],
      expertise: "Advanced"
    }
  ];

  const tools = [
    {
      name: "TypeScript",
      logo: "https://i.pinimg.com/736x/5e/92/fd/5e92fdc014d6be968f4985a9be4f8386.jpg",
      description: "Strongly typed JavaScript that scales",
      useCase: "All enterprise projects"
    },
    {
      name: "Tailwind CSS",
      logo: "https://i.pinimg.com/736x/11/a7/b5/11a7b5fb70c24e5632f2baccce14603c.jpg",
      description: "Utility-first CSS framework for rapid UI development",
      useCase: "Most client projects"
    },
    {
      name: "GraphQL",
      logo: "https://i.pinimg.com/736x/01/73/a8/0173a847c9c60f727212798711d1ba08.jpg",
      description: "Query language for APIs that prevents over-fetching",
      useCase: "Complex data requirements"
    }
  ];

  const methodologies = [
    {
      title: "Component-Driven Development",
      description: "Building UIs from isolated, reusable components for better maintainability",
      icon: "🧩"
    },
    {
      title: "Design Systems",
      description: "Creating consistent, scalable UI libraries with Storybook and Chromatic",
      icon: "🎨"
    },
    {
      title: "Performance Optimization",
      description: "Lazy loading, code splitting, and bundle analysis for lightning-fast sites",
      icon: "⚡"
    }
  ];

  return (
    <div className={styles.frontendPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Frontend</span>
            <span className={styles.titleLine}>
              <span className={styles.titleAccent}>Engineering</span>
              <span className={styles.titleDot}>.</span>
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            Building pixel-perfect, performant user interfaces with modern web technologies
          </p>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.tools}+</span>
              <span className={styles.statLabel}>Core Tools</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.frameworks}+</span>
              <span className={styles.statLabel}>Frameworks</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.projects}+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <img src="https://i.pinimg.com/736x/56/59/52/565952f4ccea31bd72e507de2196e9da.jpg" alt="Frontend development" />
        </div>
      </section>

      {/* Frameworks & Tools Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Frontend Stack</h2>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'frameworks' ? styles.active : ''}`}
              onClick={() => setActiveTab('frameworks')}
            >
              Frameworks
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'tools' ? styles.active : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              Tools
            </button>
          </div>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'frameworks' && (
            <div className={styles.frameworksGrid}>
              {frameworks.map((framework, index) => (
                <div key={index} className={styles.frameworkCard}>
                  <div className={styles.frameworkHeader}>
                    <img src={framework.logo} alt={framework.name} className={styles.frameworkLogo} />
                    <span className={`${styles.expertiseBadge} ${styles[framework.expertise.toLowerCase()]}`}>
                      {framework.expertise}
                    </span>
                  </div>
                  <h3 className={styles.frameworkName}>{framework.name}</h3>
                  <p className={styles.frameworkDescription}>{framework.description}</p>
                  <div className={styles.prosList}>
                    {framework.pros.map((pro, i) => (
                      <span key={i} className={styles.proItem}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {pro}
                      </span>
                    ))}
                  </div>
                  <Link to={`/case-studies/${framework.name.toLowerCase()}`} className={styles.caseStudyLink}>
                    View Case Studies →
                  </Link>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tools' && (
            <div className={styles.toolsGrid}>
              {tools.map((tool, index) => (
                <div key={index} className={styles.toolCard}>
                  <div className={styles.toolHeader}>
                    <img src={tool.logo} alt={tool.name} className={styles.toolLogo} />
                  </div>
                  <h3 className={styles.toolName}>{tool.name}</h3>
                  <p className={styles.toolDescription}>{tool.description}</p>
                  <div className={styles.useCase}>
                    <span className={styles.useCaseLabel}>Typical Use:</span>
                    {tool.useCase}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Methodologies Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Development Methodologies</h2>
        <p className={styles.sectionSubtitle}>Proven approaches to building maintainable frontend applications</p>
        
        <div className={styles.methodologiesGrid}>
          {methodologies.map((method, index) => (
            <div key={index} className={styles.methodologyCard}>
              <div className={styles.methodologyIcon}>{method.icon}</div>
              <h3 className={styles.methodologyTitle}>{method.title}</h3>
              <p className={styles.methodologyDescription}>{method.description}</p>
              <Link to={`/methodologies/${method.title.toLowerCase().replace(/\s+/g, '-')}`} className={styles.learnMoreLink}>
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Frontend Projects</h2>
          <Link to="/case-studies" className={styles.viewAllLink}>
            View All Case Studies →
          </Link>
        </div>
        
        <div className={styles.caseStudiesGrid}>
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImage}>
              <img src="https://i.pinimg.com/736x/5f/7c/3f/5f7c3f768fbe46978cd5f36c84d1b339.jpg" alt="E-commerce Dashboard" />
              <div className={styles.techStack}>
                <span>React</span>
                <span>TypeScript</span>
                <span>GraphQL</span>
              </div>
            </div>
            <div className={styles.caseStudyContent}>
              <h3 className={styles.caseStudyTitle}>E-commerce Analytics Dashboard</h3>
              <p className={styles.caseStudyDescription}>
                Real-time dashboard for monitoring sales, inventory, and customer behavior with interactive data visualizations.
              </p>
              <div className={styles.results}>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>+42%</span>
                  <span className={styles.resultLabel}>User Engagement</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>0.8s</span>
                  <span className={styles.resultLabel}>Load Time</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImage}>
              <img src="https://i.pinimg.com/736x/a0/13/73/a013736c4b08475fcf540c323297b31f.jpg" alt="Healthcare Portal" />
              <div className={styles.techStack}>
                <span>Next.js</span>
                <span>Tailwind CSS</span>
                <span>WebSockets</span>
              </div>
            </div>
            <div className={styles.caseStudyContent}>
              <h3 className={styles.caseStudyTitle}>Healthcare Patient Portal</h3>
              <p className={styles.caseStudyDescription}>
                HIPAA-compliant portal with real-time messaging, appointment scheduling, and medical record access.
              </p>
              <div className={styles.results}>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>98%</span>
                  <span className={styles.resultLabel}>Accessibility Score</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>60%</span>
                  <span className={styles.resultLabel}>Fewer Support Calls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Frontend Learning Resources</h2>
        <p className={styles.sectionSubtitle}>Expand your frontend development knowledge</p>
        
        <div className={styles.resourcesGrid}>
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Guide</div>
            <h3 className={styles.resourceTitle}>React Performance Optimization</h3>
            <p className={styles.resourceDescription}>
              Advanced techniques for identifying and fixing performance bottlenecks in React applications.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>25 min read</span>
              <span className={styles.resourceLevel}>Advanced</span>
            </div>
          </div>
          
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Tutorial</div>
            <h3 className={styles.resourceTitle}>Building Design Systems</h3>
            <p className={styles.resourceDescription}>
              Step-by-step guide to creating scalable design systems with Storybook and Chromatic.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>40 min read</span>
              <span className={styles.resourceLevel}>Intermediate</span>
            </div>
          </div>
          
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Video</div>
            <h3 className={styles.resourceTitle}>TypeScript for React Devs</h3>
            <p className={styles.resourceDescription}>
              1-hour crash course on leveraging TypeScript to build more robust React applications.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>1h 10m</span>
              <span className={styles.resourceLevel}>Beginner</span>
            </div>
          </div>
        </div>
        
        <div className={styles.ctaContainer}>
          <Link to="/resources/frontend" className={styles.primaryButton}>
            Browse All Resources
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Build Exceptional Frontend Experiences?</h2>
          <p className={styles.ctaText}>
            Whether you need to modernize your existing frontend or build a new application from scratch, our team has the expertise to deliver.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              Start a Project
            </Link>
            <Link to="/hire-frontend-developers" className={styles.secondaryButton}>
              Hire Our Developers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FrontendDevelopment;