import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/AboutPage.module.css';
import Auther from "../assets/compressed_me.jpg"

const AboutPage = () => {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);
  const [teamHovered, setTeamHovered] = useState(null);
  const [stats, setStats] = useState({ clients: 0, projects: 0, years: 0 });
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const aboutRef = useRef(null);


  // Animated stats counter
  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStats({
        clients: Math.floor(progress * 150),
        projects: Math.floor(progress * 80),
        years: new Date().getFullYear() - 2012
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Interactive canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = aboutRef.current?.offsetHeight || window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.1 + 0.05,
          targetX: null,
          targetY: null
        });
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Create connections between particles
        particles.forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.2 - distance / 750})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });

        // Draw particle
        ctx.fillStyle = `rgba(79, 70, 229, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const timelineData = [
    {
      year: "2012",
      title: "Founded in a Garage",
      description: "Started with just two engineers passionate about building digital solutions that matter."
    },
    {
      year: "2015",
      title: "First Major Client",
      description: "Landed our first enterprise client, proving our ability to deliver at scale."
    },
    {
      year: "2018",
      title: "Product Suite Launch",
      description: "Expanded from services to building our own suite of productivity tools."
    },
    {
      year: "2023",
      title: "Global Team",
      description: "Grew to a fully remote team spanning 12 countries across 4 continents."
    }
  ];

  const teamMembers = [
    {
      name: "Kenneth Mburu",
      role: "Founder & CTO",
      expertise: "Cloud Architecture",
      funFact: "Can solve a Rubik's cube in under 60 seconds",
      image: Auther
    },
    {
      name: "Maria Rodriguez",
      role: "Lead Designer",
      expertise: "UX Strategy",
      funFact: "Former professional illustrator",
      image: "https://i.pinimg.com/736x/7b/08/fb/7b08fbaeafd82454626929c7dea3e89e.jpg"
    },
    {
      name: "James Wilson",
      role: "Engineering Director",
      expertise: "Performance Optimization",
      funFact: "Built his first computer at age 12",
      image: "https://i.pinimg.com/736x/02/a5/76/02a576cb2e7c7b2763535dfc4fbeaa8d.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      expertise: "Agile Development",
      funFact: "Speaks 4 languages fluently",
      image: "https://i.pinimg.com/736x/76/4f/f3/764ff3dc7a929cdcb7ecfb4e127860fe.jpg"
    }
  ];

  return (
    <div className={styles.aboutPage} ref={aboutRef}>
      {/* Interactive Canvas Background */}
      <canvas ref={canvasRef} className={styles.canvasBackground} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Building The</span>
            <span className={styles.titleLine}>
              <span className={styles.titleAccent}>Digital Future</span>
              <span className={styles.titleDot}>.</span>
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            We combine technical excellence with creative vision to craft digital experiences that matter.
          </p>
          <Link to="/contact" className={styles.ctaButton}>
            <span>Let's Build Together</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>


        <div className={styles.heroImage}>
          <img
            src="https://i.pinimg.com/736x/28/41/ec/2841ec6a53ec7d609de8a60d9f9214e1.jpg" // Your image path here
            alt="Our team working together"
            className={styles.articleImage}
          />
          <div className={styles.imageOverlay}></div>
        </div>


      </section>

      {/* Mission Statement */}
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleNumber}>01</span>
            Our Philosophy
          </h2>
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>💡</div>
              <h3>Innovate Fearlessly</h3>
              <p>We embrace emerging technologies and unconventional thinking to solve problems in new ways.</p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>🧩</div>
              <h3>Engineer Elegantly</h3>
              <p>Beautiful code is as important as beautiful design in everything we create.</p>
            </div>
            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>🌱</div>
              <h3>Grow Sustainably</h3>
              <p>We build solutions designed to evolve and scale with your business needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.years}+</span>
            <span className={styles.statLabel}>Years of Excellence</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.clients}+</span>
            <span className={styles.statLabel}>Satisfied Clients</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.projects}+</span>
            <span className={styles.statLabel}>Successful Projects</span>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className={styles.timelineSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleNumber}>02</span>
          Our Journey
        </h2>
        <div className={styles.timelineContainer}>
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`${styles.timelineItem} ${activeTimelineItem === index ? styles.active : ''}`}
              onClick={() => setActiveTimelineItem(index)}
            >
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <span className={styles.timelineYear}>{item.year}</span>
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineDescription}>{item.description}</p>
              </div>
            </div>
          ))}
          <div className={styles.timelineLine}></div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleNumber}>03</span>
          Meet The Team
        </h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={styles.teamCard}
              onMouseEnter={() => setTeamHovered(index)}
              onMouseLeave={() => setTeamHovered(null)}
            >
              <div className={styles.cardImage}>
                <img src={member.image} alt={member.name} />
                <div className={`${styles.cardOverlay} ${teamHovered === index ? styles.active : ''}`}></div>
              </div>
              <div className={styles.cardContent}>
                <h3>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.expertise}>{member.expertise}</p>
                {teamHovered === index && (
                  <div className={styles.cardHoverContent}>
                    <p className={styles.funFact}>Fun fact: {member.funFact}</p>
                    <div className={styles.socialLinks}>
                      <Link to="#" aria-label={`${member.name} Twitter`}>𝕏</Link>
                      <Link to="#" aria-label={`${member.name} LinkedIn`}>in</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.titleNumber}>04</span>
          Our Core Values
        </h2>
        <div className={styles.valuesContainer}>
          <div className={styles.valueColumn}>
            <div className={styles.valueItem}>
              <h3>01. Integrity First</h3>
              <p>We believe in radical transparency and doing what's right, even when no one is looking.</p>
            </div>
            <div className={styles.valueItem}>
              <h3>02. Craftsmanship</h3>
              <p>We take pride in our work and sweat the details that others overlook.</p>
            </div>
          </div>
          <div className={styles.valueColumn}>
            <div className={styles.valueItem}>
              <h3>03. Continuous Learning</h3>
              <p>We maintain a growth mindset and invest heavily in team development.</p>
            </div>
            <div className={styles.valueItem}>
              <h3>04. Human-Centered</h3>
              <p>Technology should serve people, not the other way around.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to Build Something Amazing?</h2>
          <p className={styles.ctaText}>
            Whether you have a fully-formed vision or just a spark of an idea, we'd love to help bring it to life.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={styles.primaryCta}>
              Start a Project
            </Link>
            <Link to="/careers" className={styles.secondaryCta}>
              Join Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;