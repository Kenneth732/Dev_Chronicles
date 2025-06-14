import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/DevOpsCloud.module.css';

const DevOpsCloud = () => {
  const [activeTab, setActiveTab] = useState('platforms');
  const [animatedStats, setAnimatedStats] = useState({
    deployments: 0,
    uptime: 0,
    containers: 0
  });

  // Animate statistics
  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimatedStats({
        deployments: Math.floor(progress * 5000),
        uptime: (99.9 + progress * 0.099).toFixed(3),
        containers: Math.floor(progress * 10000)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  const platforms = [
    {
      name: "AWS",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS66rNP7PkHlXCAPWNWBztVm_2joQDjNjGwuQ&s",
      description: "Comprehensive cloud platform with 200+ services for compute, storage, and networking",
      certifications: ["Solutions Architect Pro", "DevOps Engineer Pro", "Security Specialty"],
      expertise: "Expert"
    },
    {
      name: "Azure",
      logo: "https://swimburger.net/media/ppnn3pcl/azure.png",
      description: "Microsoft's cloud platform with strong enterprise integration capabilities",
      certifications: ["Azure Administrator", "DevOps Engineer", "Solutions Architect"],
      expertise: "Advanced"
    },
    {
      name: "Google Cloud",
      logo: "https://static-00.iconduck.com/assets.00/google-cloud-icon-2048x1646-7admxejz.png",
      description: "High-performance cloud with strengths in data analytics and machine learning",
      certifications: ["Cloud Architect", "DevOps Engineer", "Security Engineer"],
      expertise: "Advanced"
    }
  ];

  const tools = [
    {
      name: "Kubernetes",
      logo: "https://images.seeklogo.com/logo-png/44/1/google-kubernetes-engine-gke-logo-png_seeklogo-447023.png",
      description: "Container orchestration system for automating deployment, scaling, and management",
      useCase: "Containerized applications at scale"
    },
    {
      name: "Terraform",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSkzmKBtTXAV70TUuJ8aJg67GLtFEwqIVr7g&s",
      description: "Infrastructure as Code tool for building, changing, and versioning infrastructure",
      useCase: "Multi-cloud provisioning"
    },
    {
      name: "ArgoCD",
      logo: "https://cdn.prod.website-files.com/5f10ed4c0ebf7221fb5661a5/5f2ba11e378c8f49e8b28486_argo.png",
      description: "Declarative GitOps continuous delivery tool for Kubernetes",
      useCase: "GitOps workflows"
    }
  ];

  const practices = [
    {
      title: "GitOps",
      description: "Using Git as single source of truth for declarative infrastructure and applications",
      icon: "🔄",
      benefits: ["Auditability", "Reproducibility", "Collaboration"]
    },
    {
      title: "Infra as Code",
      description: "Managing infrastructure through machine-readable definition files",
      icon: "👨‍💻",
      benefits: ["Consistency", "Version control", "Automation"]
    },
    {
      title: "SRE",
      description: "Applying software engineering to operations and reliability challenges",
      icon: "📊",
      benefits: ["Measurable SLAs", "Error budgets", "Automated remediation"]
    }
  ];

  return (
    <div className={styles.devOpsPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>DevOps &</span>
            <span className={styles.titleLine}>
              <span className={styles.titleAccent}>Cloud Engineering</span>
              <span className={styles.titleDot}>.</span>
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            Accelerating software delivery while improving reliability, security, and scalability through automation and cloud-native practices
          </p>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.deployments}+</span>
              <span className={styles.statLabel}>Deployments</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.uptime}%</span>
              <span className={styles.statLabel}>Uptime</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{animatedStats.containers}+</span>
              <span className={styles.statLabel}>Containers Managed</span>
            </div>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Mastering_The_Future_With_A_Master_Degree_In_Cloud_Computing.jpg" alt="DevOps and Cloud engineering" />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our DevOps Stack</h2>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'platforms' ? styles.active : ''}`}
              onClick={() => setActiveTab('platforms')}
            >
              Cloud Platforms
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'tools' ? styles.active : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              DevOps Tools
            </button>
          </div>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'platforms' && (
            <div className={styles.techGrid}>
              {platforms.map((platform, index) => (
                <div key={index} className={styles.techCard}>
                  <div className={styles.techHeader}>
                    <img src={platform.logo} alt={platform.name} className={styles.techLogo} />
                    <span className={`${styles.expertiseBadge} ${styles[platform.expertise.toLowerCase()]}`}>
                      {platform.expertise}
                    </span>
                  </div>
                  <h3 className={styles.techName}>{platform.name}</h3>
                  <p className={styles.techDescription}>{platform.description}</p>
                  <div className={styles.certifications}>
                    <h4 className={styles.certificationsTitle}>Certifications:</h4>
                    <ul>
                      {platform.certifications.map((cert, i) => (
                        <li key={i} className={styles.certificationItem}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M12 15l8-8m0 0h-8m8 0v8M9 12l-7-7m0 0h7m-7 0v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to={`/case-studies/${platform.name.toLowerCase()}`} className={styles.caseStudyLink}>
                    View Cloud Migrations →
                  </Link>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tools' && (
            <div className={styles.techGrid}>
              {tools.map((tool, index) => (
                <div key={index} className={styles.techCard}>
                  <div className={styles.techHeader}>
                    <img src={tool.logo} alt={tool.name} className={styles.techLogo} />
                  </div>
                  <h3 className={styles.techName}>{tool.name}</h3>
                  <p className={styles.techDescription}>{tool.description}</p>
                  <div className={styles.useCase}>
                    <span className={styles.useCaseLabel}>Ideal For:</span>
                    {tool.useCase}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Practices Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Engineering Practices</h2>
        <p className={styles.sectionSubtitle}>Modern approaches to infrastructure and operations</p>
        
        <div className={styles.practicesGrid}>
          {practices.map((practice, index) => (
            <div key={index} className={styles.practiceCard}>
              <div className={styles.practiceIcon}>{practice.icon}</div>
              <h3 className={styles.practiceTitle}>{practice.title}</h3>
              <p className={styles.practiceDescription}>{practice.description}</p>
              <div className={styles.benefitsList}>
                <h4 className={styles.benefitsTitle}>Key Benefits:</h4>
                <ul>
                  {practice.benefits.map((benefit, i) => (
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
          <h2 className={styles.sectionTitle}>DevOps Transformations</h2>
          <Link to="/case-studies" className={styles.viewAllLink}>
            View All Case Studies →
          </Link>
        </div>
        
        <div className={styles.caseStudiesGrid}>
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImage}>
              <img src="https://www.bacancytechnology.com/blog/wp-content/uploads/2023/12/Top-10-Cloud-Migration-Strategy-Best-Practices.webp" alt="Cloud Migration" />
              <div className={styles.techStack}>
                <span>AWS</span>
                <span>Terraform</span>
                <span>Kubernetes</span>
              </div>
            </div>
            <div className={styles.caseStudyContent}>
              <h3 className={styles.caseStudyTitle}>Enterprise Cloud Migration</h3>
              <p className={styles.caseStudyDescription}>
                Lifted and shifted 200+ legacy workloads to cloud-native architecture with zero downtime.
              </p>
              <div className={styles.results}>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>60%</span>
                  <span className={styles.resultLabel}>Cost Reduction</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>10x</span>
                  <span className={styles.resultLabel}>Deployment Speed</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.caseStudyCard}>
            <div className={styles.caseStudyImage}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp4enZuag-rl-2F2X7nZ6jbQJESrOSg_KWzg&s" alt="CI/CD Pipeline" />
              <div className={styles.techStack}>
                <span>Azure</span>
                <span>ArgoCD</span>
                <span>GitHub Actions</span>
              </div>
            </div>
            <div className={styles.caseStudyContent}>
              <h3 className={styles.caseStudyTitle}>CI/CD Pipeline Implementation</h3>
              <p className={styles.caseStudyDescription}>
                Automated build, test, and deployment pipeline reducing release cycles from weeks to hours.
              </p>
              <div className={styles.results}>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>99.9%</span>
                  <span className={styles.resultLabel}>Success Rate</span>
                </div>
                <div className={styles.resultItem}>
                  <span className={styles.resultMetric}>95%</span>
                  <span className={styles.resultLabel}>Less Manual Work</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>DevOps Resources</h2>
        <p className={styles.sectionSubtitle}>Guides and tutorials for modern infrastructure practices</p>
        
        <div className={styles.resourcesGrid}>
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Guide</div>
            <h3 className={styles.resourceTitle}>Kubernetes Best Practices</h3>
            <p className={styles.resourceDescription}>
              Production-grade patterns for deploying and managing Kubernetes clusters at scale.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>35 min read</span>
              <span className={styles.resourceLevel}>Intermediate</span>
            </div>
          </div>
          
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Tutorial</div>
            <h3 className={styles.resourceTitle}>Terraform Modules</h3>
            <p className={styles.resourceDescription}>
              Building reusable Terraform modules for consistent infrastructure provisioning.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>45 min read</span>
              <span className={styles.resourceLevel}>Advanced</span>
            </div>
          </div>
          
          <div className={styles.resourceCard}>
            <div className={styles.resourceType}>Video</div>
            <h3 className={styles.resourceTitle}>AWS Cost Optimization</h3>
            <p className={styles.resourceDescription}>
              Practical techniques for reducing cloud spend without sacrificing performance.
            </p>
            <div className={styles.resourceMeta}>
              <span className={styles.resourceLength}>1h 20m</span>
              <span className={styles.resourceLevel}>Intermediate</span>
            </div>
          </div>
        </div>
        
        <div className={styles.ctaContainer}>
          <Link to="/resources/devops" className={styles.primaryButton}>
            Explore All Resources
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Modernize Your Infrastructure?</h2>
          <p className={styles.ctaText}>
            Our DevOps and cloud experts can help you build reliable, scalable, and secure systems.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryButton}>
              Start Your Transformation
            </Link>
            <Link to="/hire-devops-engineers" className={styles.secondaryButton}>
              Hire DevOps Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevOpsCloud;