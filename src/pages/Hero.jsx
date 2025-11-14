

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import styles from '../styles/Hero.module.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  // Refs 
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef(null);
  const codeRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const heroRef = useRef(null);

  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState({ projects: 0, clients: 0, years: 5 });

  // Configuration
  const particleCount = isMobile ? 10 : 20;
  const typingSpeed = isMobile ? 30 : 20;

  // Full code to display
  const fullCode = useMemo(() => (
    `<span class="${styles.HeroComment}">// Premium Engineering Solutions</span>
<span class="${styles.HeroImport}">import</span> { elegance } <span class="${styles.HeroImport}">from</span> <span class="${styles.HeroString}">'@luxury/design'</span>;
<span class="${styles.HeroImport}">import</span> { performance } <span class="${styles.HeroImport}">from</span> <span class="${styles.HeroString}">'@enterprise/scale'</span>;

<span class="${styles.HeroKeyword}">class</span> <span class="${styles.HeroClassName}">DigitalMasterpiece</span> {
  <span class="${styles.HeroMethod}">constructor</span>() {
    <span class="${styles.HeroKeyword}">this</span>.<span class="${styles.HeroProperty}">craftsmanship</span> = <span class="${styles.HeroString}">'impeccable'</span>;
    <span class="${styles.HeroKeyword}">this</span>.<span class="${styles.HeroProperty}">performance</span> = <span class="${styles.HeroString}">'flawless'</span>;
    <span class="${styles.HeroKeyword}">this</span>.<span class="${styles.HeroProperty}">design</span> = <span class="${styles.HeroString}">'timeless'</span>;
  }

  <span class="${styles.HeroMethod}">deploy</span>() {
    <span class="${styles.HeroKeyword}">return</span> <span class="${styles.HeroKeyword}">new</span> <span class="${styles.HeroClassName}">Promise</span>((resolve) => {
      <span class="${styles.HeroClassName}">setTimeout</span>(() => resolve({
        <span class="${styles.HeroProperty}">uptime</span>: <span class="${styles.HeroString}">'99.999%'</span>,
        <span class="${styles.HeroProperty}">latency</span>: <span class="${styles.HeroString}">'<10ms'</span>,
        <span class="${styles.HeroProperty}">security</span>: <span class="${styles.HeroString}">'zero-trust'</span>
      }), 0);
    });
  }
}

<span class="${styles.HeroExport}">export default</span> <span class="${styles.HeroKeyword}">new</span> <span class="${styles.HeroClassName}">DigitalMasterpiece</span>();`
  ), []);

  // Animate counting numbers
  const animateStats = useCallback(() => {
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setStats({
        projects: Math.floor(progress * 150),
        clients: Math.floor(progress * 80),
        years: new Date().getFullYear() - 2012
      });
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Check for mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse position tracker for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        const scrollPosition = window.scrollY;
        const progress = Math.min(scrollPosition / heroHeight, 1);
        setScrollProgress(progress);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial element animations
  const animateElements = useCallback(() => {
    const elements = [titleRef.current, subtitleRef.current, ctaRef.current];
    elements.forEach((el, i) => {
      if (el) {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 200);
      }
    });
    
    // Animate the underline after title appears
    if (titleRef.current) {
      const underline = titleRef.current.querySelector(`.${styles.HeroTitleUnderline}`);
      if (underline) {
        setTimeout(() => {
          underline.style.opacity = '1';
          underline.style.transform = 'translateX(0)';
        }, 600);
      }
    }
  }, []);

  // Enhanced particle system with mouse interaction
  const createParticles = useCallback(() => {
    if (!particlesRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Set canvas size
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
        opacity: Math.random() * 0.15 + 0.05,
        originalX: 0,
        originalY: 0
      });
    }

    // Animation loop
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Mouse attraction effect
        const dx = mousePosition.x * 100 - particle.x;
        const dy = mousePosition.y * 100 - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          particle.x += dx * 0.01;
          particle.y += dy * 0.01;
        } else {
          particle.y -= particle.speed;
          if (particle.y < 0) {
            particle.y = canvas.height;
            particle.x = Math.random() * canvas.width;
          }
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
      cancelAnimationFrame(animationRef.current);
    };
  }, [mousePosition.x, mousePosition.y, particleCount]);

  // Typing animation with variable speed
  const startTypingAnimation = useCallback(() => {
    let startTime = null;
    const typingDuration = fullCode.length * typingSpeed;
    const startDelay = 1500;

    const animateTyping = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < startDelay) {
        animationRef.current = requestAnimationFrame(animateTyping);
        return;
      }

      const progress = elapsed - startDelay;
      const newIndex = Math.min(
        Math.floor((progress / typingDuration) * fullCode.length),
        fullCode.length
      );

      setCurrentIndex(newIndex);

      if (newIndex < fullCode.length) {
        animationRef.current = requestAnimationFrame(animateTyping);
      } else {
        setIsTypingComplete(true);
        addFinalCursor();
        animateStats(); // Start counting animation when typing completes
      }
    };

    animationRef.current = requestAnimationFrame(animateTyping);
  }, [fullCode, typingSpeed, animateStats]);

  // Add blinking cursor when typing completes
  const addFinalCursor = useCallback(() => {
    if (codeRef.current) {
      const cursor = document.createElement('span');
      cursor.className = styles.HeroCodeCursor;
      codeRef.current.appendChild(cursor);
    }
  }, []);

  // Initialize all animations
  useEffect(() => {
    animateElements();
    createParticles();
    startTypingAnimation();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateElements, createParticles, startTypingAnimation]);

  // Parallax effect based on scroll
  const parallaxStyle = {
    transform: `translateY(${scrollProgress * 50}px)`
  };

  // Tilt effect for code window based on mouse position
  const codeWindowTilt = {
    transform: `perspective(1500px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 5}deg)`
  };

  return (
    <section className={styles.Hero} ref={heroRef}>
      {/* Interactive Particles Background */}
      <div ref={particlesRef} className={styles.HeroParticlesContainer}>
        <canvas ref={canvasRef} className={styles.HeroParticlesCanvas} />
      </div>
      
      {/* Gradient Accent */}
      <div className={styles.HeroLuxuryAccent} style={{
        transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
      }}></div>

      <div className={styles.HeroContent}>
        {/* Text Content */}
        <div className={styles.HeroTextContainer} style={parallaxStyle}>
          <div className={styles.HeroTitleWrapper}>
            <h1 ref={titleRef} className={styles.HeroTitle}>
              <span className={styles.HeroTitleLine}>Crafting Digital</span>
              <span className={styles.HeroTitleLine}>
                <span className={styles.HeroTitleAccent}>Excellence</span>
                <span className={styles.HeroTitleDot}>.</span>
              </span>
            </h1>
            <div className={styles.HeroTitleUnderline}></div>
          </div>

          <p ref={subtitleRef} className={styles.HeroSubtitle}>
            <span className={styles.HeroSubtitleHighlight}>
              {stats.years}+ years
            </span> of engineering mastery distilled into premium solutions
          </p>
          

          <div ref={ctaRef} className={styles.HeroCtaContainer}>
            <Link to="/featured" className={styles.HeroPrimaryCta} aria-label="Explore our work">
              <span>Explore Our Work</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/contact" className={styles.HeroSecondaryCta} aria-label="Request consultation">
              <span>Request Consultation</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M8 7L12 11L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          

          <div className={styles.HeroSignature}>
            <div className={styles.HeroSignatureLine}></div>
            <div className={styles.HeroSignatureText}>EST. 2012</div>
          </div>
        </div>

        {/* Interactive Code Display */}
        <div className={styles.HeroGraphicContainer}>
          <div className={styles.HeroLuxuryBadge}>
            <span>Premium</span>
            <span>Edition</span>
          </div>

          <div className={styles.HeroCodeWindow} style={codeWindowTilt}>
            <div className={styles.HeroWindowHeader}>
              <div className={styles.HeroWindowControls}>
                <span className={styles.HeroControlDot} style={{ backgroundColor: '#FF5F56' }}></span>
                <span className={styles.HeroControlDot} style={{ backgroundColor: '#FFBD2E' }}></span>
                <span className={styles.HeroControlDot} style={{ backgroundColor: '#27C93F' }}></span>
              </div>
              <div className={styles.HeroWindowTitle}>architecture.js</div>
              <div className={styles.HeroWindowDecoration}></div>
            </div>
            <div className={styles.HeroCodeContent}>
              <pre className={styles.HeroCodeBlock} ref={codeRef}>
                <code dangerouslySetInnerHTML={{ __html: fullCode.substring(0, currentIndex) }} />
                {!isTypingComplete && <span className={styles.HeroTypingCursor}>|</span>}
              </pre>
            </div>
          </div>

          <div className={styles.HeroGlowEffect}></div>
          <div className={styles.HeroReflection}></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.HeroScrollIndicator} style={{ opacity: 1 - scrollProgress * 2 }}>
        <span className={styles.HeroScrollText}>Discover More</span>
        <div className={styles.HeroScrollLine}></div>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
};

export default React.memo(Hero);

