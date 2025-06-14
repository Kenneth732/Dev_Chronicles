import { useState } from 'react';
import styles from '../styles/ProjectsSection.module.css'; // Adjust the path as necessary

const ProjectsSection = () => {
  // Sample projects data - replace with your actual projects
const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Distributed Task Scheduler',
      description: 'A high-performance, fault-tolerant distributed task scheduling system built with Rust and Redis. Handles 10K+ tasks per second with sub-millisecond latency.',
      techStack: ['Rust', 'Redis', 'Tokio', 'Kubernetes'],
      githubUrl: 'https://github.com/yourusername/distributed-scheduler',
      demoUrl: 'https://scheduler.yourdomain.com',
      image: 'https://media.geeksforgeeks.org/wp-content/uploads/20240529185119/Distributed-Job-Scheduler-(1)-2.webp'
    },
    {
      id: 2,
      title: 'Real-time Analytics Dashboard',
      description: 'React-based dashboard with WebSocket connections to Node.js backend, processing 1M+ events daily. Features custom data visualization components.',
      techStack: ['React', 'TypeScript', 'Node.js', 'WebSocket', 'D3.js'],
      githubUrl: 'https://github.com/yourusername/analytics-dashboard',
      demoUrl: 'https://analytics.yourdomain.com',
      image: 'https://www.gooddata.com/img/blog/_1200x630/real-time-data-analytics-blog.png.webp'
    },
    {
      id: 3,
      title: 'ML Model Serving Platform',
      description: 'Scalable platform for deploying and monitoring machine learning models with automated scaling and A/B testing capabilities.',
      techStack: ['Python', 'FastAPI', 'Docker', 'Prometheus', 'Grafana'],
      githubUrl: 'https://github.com/yourusername/ml-serving-platform',
      demoUrl: 'https://ml.yourdomain.com',
      image: 'https://www.kdnuggets.com/wp-content/uploads/7-Best-FREE-Platforms-to-Host-ML-Models.png'
    },
    {
      id: 4,
      title: 'Developer Productivity Suite',
      description: 'VS Code extension suite that integrates with GitHub, Jira, and CI/CD pipelines to streamline developer workflows.',
      techStack: ['TypeScript', 'VS Code API', 'GitHub API', 'Jira API'],
      githubUrl: 'https://github.com/yourusername/dev-productivity-suite',
      demoUrl: 'https://marketplace.visualstudio.com/your-extension',
      image: 'https://framerusercontent.com/images/v1DqQXt4QecGTnaP7dumMzn1Ec.png'
    },
    {
      id: 5,
      title: 'Blockchain Explorer',
      description: 'Open-source explorer for Ethereum blockchain with real-time transaction tracking, smart contract verification, and analytics.',
      techStack: ['Ethereum', 'Web3.js', 'React', 'GraphQL', 'The Graph'],
      githubUrl: 'https://github.com/yourusername/blockchain-explorer',
      demoUrl: 'https://explorer.yourdomain.com',
      image: 'https://vegavid.com/blog/wp-content/uploads/2023/09/All-About-Blockchain-Explorer.jpg'
    },
    {
      id: 6,
      title: 'Edge Computing IoT Platform',
      description: 'Distributed IoT data processing platform with edge computing capabilities for low-latency industrial applications.',
      techStack: ['Go', 'MQTT', 'Kubernetes', 'TimescaleDB', 'WebAssembly'],
      githubUrl: 'https://github.com/yourusername/iot-edge-platform',
      demoUrl: 'https://iot.yourdomain.com',
      image: 'https://www.altexsoft.com/static/blog-post/2023/11/c24ff00c-ab07-426a-8c0f-e0e26872c3f7.jpg'
    },
    {
      id: 7,
      title: 'AI-Powered Code Review Assistant',
      description: 'GitHub bot that automatically reviews pull requests using LLMs, suggests improvements, and detects vulnerabilities.',
      techStack: ['Python', 'OpenAI API', 'GitHub Actions', 'LangChain', 'PostgreSQL'],
      githubUrl: 'https://github.com/yourusername/code-review-assistant',
      demoUrl: 'https://github.com/apps/your-code-review-bot',
      image: 'https://miro.medium.com/v2/resize:fit:1200/0*uG1XDJLMOBy4jAuL.jpg'
    },
    {
      id: 8,
      title: 'Serverless E-Commerce Backend',
      description: 'High-availability e-commerce backend built entirely with serverless technologies handling 10K RPS during peak loads.',
      techStack: ['AWS Lambda', 'DynamoDB', 'AppSync', 'CloudFront', 'Stripe API'],
      githubUrl: 'https://github.com/yourusername/serverless-ecommerce',
      demoUrl: 'https://api.ecom.yourdomain.com/graphql',
      image: 'https://cdn.prod.website-files.com/60acbb950c4d66d0ab3e2007/60d84339fe0fe9dc10f1f2f2_header.png'
    },
        {
      id: 9,
      title: 'Real-time Collaborative Whiteboard',
      description: 'Low-latency collaborative whiteboard with operational transforms (OT) for conflict resolution, supporting 1000+ concurrent users with sub-100ms sync.',
      techStack: ['WebRTC', 'React', 'Node.js', 'Operational Transform', 'Canvas API'],
      githubUrl: 'https://github.com/yourusername/collab-whiteboard',
      demoUrl: 'https://whiteboard.yourdomain.com',
      image: 'https://cms.boardmix.com/images/articles/student-ai-whiteboard.png'
    },
    {
      id: 10,
      title: 'Kubernetes-native CI/CD Platform',
      description: 'Self-hosted GitOps platform with built-in progressive delivery, canary deployments, and multi-cluster management capabilities.',
      techStack: ['Go', 'Kubernetes Operators', 'ArgoCD', 'Flux', 'Tekton'],
      githubUrl: 'https://github.com/yourusername/k8s-cicd-platform',
      demoUrl: 'https://cd.yourdomain.com',
      image: 'https://cdn.prod.website-files.com/619e15d781b21202de206fb5/64a26326064b6f57de404163_Exploring-the-Top-CICD-Tools-for-DevOps-.jpg'
    }
  ]);

  const [expandedProject, setExpandedProject] = useState(null);

  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>💼 Engineering Portfolio</h2>
        <p className={styles.sectionSubtitle}>High-impact projects demonstrating real-world problem-solving</p>
      </div>
      <div className={styles.container}>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${styles.projectCard} ${expandedProject === project.id ? styles.expanded : ''}`}
            >
              <div className={styles.projectImageContainer}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.projectImage}
                  loading="lazy"
                />
                <div className={styles.techStack}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className={styles.techPill}>{tech}</span>
                  ))}
                </div>
              </div>

              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>
                  {expandedProject === project.id
                    ? project.description
                    : `${project.description.substring(0, 100)}...`
                  }
                </p>

                <button
                  onClick={() => toggleExpand(project.id)}
                  className={styles.readMoreButton}
                >
                  {expandedProject === project.id ? 'Show Less' : 'Read More'}
                </button>

                <div className={styles.projectLinks}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.demoLink}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16h-2v-6h2v6zm-1-7.5c-.553 0-1-.447-1-1s.447-1 1-1 1 .447 1 1-.447 1-1 1z" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ctaContainer}>
        <a href="/projects" className={styles.primaryButton}>
          View All Projects
        </a>
      </div>
    </section>
  );
};

export default ProjectsSection;