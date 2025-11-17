

import { useState, useEffect, useRef } from 'react';
import styles from '../styles/PodcastSection.module.css';
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2 } from 'react-icons/fi';
import { FaSpotify, FaApple, FaGooglePlay } from 'react-icons/fa';
import { RiSpeedLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ep001Audio from './ep001.mp3';
import ep002Audio from './ep002.mp3';
import ep003Audio from './ep003.mp3';
import ep004Audio from './ep001.mp3';

const PodcastSection = () => {
  const [episodes] = useState([
    {
      id: 'ep001',
      title: 'The Future of Web Development in 2024',
      date: '2024-01-15',
      duration: 2722,
      description: 'We discuss emerging trends in web development including WASM, React Server Components, and the resurgence of monoliths. This episode features special guests from leading tech companies sharing their insights on the evolving landscape.',
      audioUrl: ep001Audio,
      coverImage: 'https://media.licdn.com/dms/image/v2/D4D12AQFV9lmozBJXhQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705124282310?e=2147483647&v=beta&t=AkLKb8_R4E_HFN-mFfPr9wHLbwiQs29Nz5iKnB97V6I',
      platforms: {
        spotify: 'https://spotify.com/yourpodcast/ep001',
        apple: 'https://apple.com/yourpodcast/ep001',
        google: 'https://google.com/yourpodcast/ep001'
      },
      tags: ['Web Dev', 'Trends', '2024'],
      featured: true
    },
    {
      id: 'ep002',
      title: 'AI Revolution: From GPT-4 to Gemini',
      date: '2024-02-10',
      duration: 3138,
      description: 'Exploring the latest advancements in AI, comparing different LLMs, and discussing practical applications for developers. Our panel of AI researchers breaks down the technical details in accessible ways.',
      audioUrl: ep002Audio,
      coverImage: 'https://miro.medium.com/v2/resize:fit:1200/0*zyBWRKPZV8lOV69E.jpg',
      platforms: {
        spotify: 'https://spotify.com/yourpodcast/ep002',
        apple: 'https://apple.com/yourpodcast/ep002',
        google: 'https://google.com/yourpodcast/ep002'
      },
      tags: ['AI', 'Machine Learning', 'LLMs'],
      featured: true
    },
    {
      id: 'ep003',
      title: 'Building Scalable Microservices with Go',
      date: '2024-03-05',
      duration: 2325,
      description: 'Deep dive into microservices architecture using Go, covering best practices, common pitfalls, and performance optimization. Learn from the engineering team at a Fortune 500 company about their real-world implementation.',
      audioUrl: ep003Audio,
      coverImage: 'https://media.licdn.com/dms/image/v2/D5612AQGRaGanbQtebA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709851350044?e=2147483647&v=beta&t=pcnPt9fPmXuz5jCzXq7Pg0GUKixpFydPIkbDcT38GKA',
      platforms: {
        spotify: 'https://spotify.com/yourpodcast/ep003',
        apple: 'https://apple.com/yourpodcast/ep003',
        google: 'https://google.com/yourpodcast/ep003'
      },
      tags: ['Go', 'Microservices', 'Architecture']
    },
    {
      id: 'ep004',
      title: 'The State of JavaScript 2024',
      date: '2024-04-20',
      duration: 2952,
      description: 'Annual review of the JavaScript ecosystem, including new features, framework trends, and developer survey results. We analyze data from over 10,000 developers to identify the most significant shifts in the JS world.',
      audioUrl: ep004Audio,
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2mFl6Vz7lP3ir2TcuwqVV7kk7xLPx0oWwNw&s',
      platforms: {
        spotify: 'https://spotify.com/yourpodcast/ep004',
        apple: 'https://apple.com/yourpodcast/ep004',
        google: 'https://google.com/yourpodcast/ep004'
      },
      tags: ['JavaScript', 'Frontend', 'Survey']
    }
  ]);

  const audioRef = useRef(null);
  const [currentEpisode, setCurrentEpisode] = useState(episodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSpeedControls, setShowSpeedControls] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('featured');
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize audio settings the play list ya audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = playbackRate;
    }
  }, [volume, playbackRate]);

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

  // Particle background effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 15;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
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
  }, [mousePosition.x, mousePosition.y]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    audioRef.current.playbackRate = rate;
    setShowSpeedControls(false);
  };

  const skipForward = () => {
    audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 15, audioRef.current.duration);
  };

  const skipBackward = () => {
    audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 15, 0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercentage = (currentTime / (currentEpisode?.duration || 1)) * 100;
  const volumePercentage = volume * 100;

  // Tilt effect for cover art based on mouse position
  const coverTiltStyle = {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`
  };

  return (
    <section className={styles.podcastSection} id="podcast">
      {/* Luxury Background Elements */}
      <div className={styles.luxuryBackground}>
        <canvas ref={canvasRef} className={styles.particleCanvas} />
        <div className={styles.luxuryAccent} style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
        }}></div>
      </div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>PREMIUM CONTENT</span>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleLine}>Engineering</span>
            <span className={styles.titleLine}>
              <span className={styles.titleAccent}>Insights</span>
              <span className={styles.titleDot}>.</span>
            </span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Expert conversations about software architecture, development practices, and emerging technologies
          </p>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Current Episode Player */}
          <div className={styles.currentEpisode}>
            {/* Cover Art with Luxury Badge */}
            <div className={styles.coverArtContainer}>
              <div className={styles.coverArt} style={coverTiltStyle}>
                <img
                  src={currentEpisode.coverImage}
                  alt={currentEpisode.title}
                  className={styles.coverImage}
                  loading="lazy"
                />
                <div className={styles.coverOverlay}></div>
              </div>
              <div className={styles.luxuryBadge}>
                <span>Premium</span>
                <span>Episode</span>
              </div>
            </div>

            {/* Episode Content */}
            <div className={styles.episodeContent}>
              <div className={styles.episodeHeader}>
                <div className={styles.episodeMeta}>
                  <span className={styles.episodeNumber}>{currentEpisode.id.toUpperCase()}</span>
                  <span className={styles.episodeDate}>
                    {new Date(currentEpisode.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className={styles.episodeDuration}>{formatTime(currentEpisode.duration)}</span>
                </div>
                
                <h3 className={styles.episodeTitle}>{currentEpisode.title}</h3>
                
                <div className={styles.tagContainer}>
                  {currentEpisode.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                
                <p className={styles.episodeDescription}>
                  {isExpanded 
                    ? currentEpisode.description 
                    : `${currentEpisode.description.substring(0, 150)}${currentEpisode.description.length > 150 ? '...' : ''}`
                  }
                  {currentEpisode.description.length > 150 && (
                    <button 
                      className={styles.readMoreButton} 
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </p>
              </div>

              {/* Luxury Audio Player */}
              <div className={styles.audioPlayer}>
                <audio
                  ref={audioRef}
                  src={currentEpisode.audioUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  onLoadedMetadata={handleTimeUpdate}
                />

                <div className={styles.playerControls}>
                  <div className={styles.progressContainer}>
                    <div className={styles.progressBarBackground}>
                      <div 
                        className={styles.progressBarFill} 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={currentEpisode.duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className={styles.progressInput}
                    />
                    <div className={styles.timeDisplay}>
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(currentEpisode.duration)}</span>
                    </div>
                  </div>

                  <div className={styles.controlButtons}>
                    <div className={styles.primaryControls}>
                      <button 
                        className={styles.skipButton}
                        onClick={skipBackward}
                        aria-label="Skip backward 15 seconds"
                      >
                        <FiSkipBack size={20} />
                      </button>
                      
                      <button
                        className={styles.playButton}
                        onClick={handlePlayPause}
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                      </button>
                      
                      <button 
                        className={styles.skipButton}
                        onClick={skipForward}
                        aria-label="Skip forward 15 seconds"
                      >
                        <FiSkipForward size={20} />
                      </button>
                    </div>

                    <div className={styles.secondaryControls}>
                      <div className={styles.volumeControl}>
                        <FiVolume2 size={18} />
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volume}
                          onChange={handleVolumeChange}
                          className={styles.volumeSlider}
                          style={{
                            '--volume-level': `${volumePercentage}%`
                          }}
                        />
                      </div>

                      <div className={styles.speedControl}>
                        <button 
                          className={styles.speedButton}
                          onClick={() => setShowSpeedControls(!showSpeedControls)}
                        >
                          <RiSpeedLine size={18} />
                          <span>{playbackRate}x</span>
                        </button>
                        
                        {showSpeedControls && (
                          <div className={styles.speedOptions}>
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                              <button
                                key={rate}
                                className={`${styles.speedOption} ${playbackRate === rate ? styles.active : ''}`}
                                onClick={() => handlePlaybackRateChange(rate)}
                              >
                                {rate}x
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platform Links */}
              <div className={styles.platformLinks}>
                <p className={styles.availableOn}>Also available on:</p>
                <div className={styles.platformIcons}>
                  <a href={currentEpisode.platforms.spotify} target="_blank" rel="noopener noreferrer" className={styles.platformLink}>
                    <FaSpotify size={24} />
                    <span>Spotify</span>
                  </a>
                  <a href={currentEpisode.platforms.apple} target="_blank" rel="noopener noreferrer" className={styles.platformLink}>
                    <FaApple size={24} />
                    <span>Apple</span>
                  </a>
                  <a href={currentEpisode.platforms.google} target="_blank" rel="noopener noreferrer" className={styles.platformLink}>
                    <FaGooglePlay size={24} />
                    <span>Google</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Episode Navigation */}
          <div className={styles.episodeNavigation}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'featured' ? styles.active : ''}`}
                onClick={() => setActiveTab('featured')}
              >
                Featured
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'all' ? styles.active : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Episodes
              </button>
            </div>

            <div className={styles.episodeList}>
              {(activeTab === 'featured' ? episodes.filter(ep => ep.featured) : episodes).map((episode) => (
                <div
                  key={episode.id}
                  className={`${styles.episodeCard} ${currentEpisode.id === episode.id ? styles.active : ''}`}
                  onClick={() => {
                    setCurrentEpisode(episode);
                    setIsPlaying(false);
                  }}
                >
                  <div className={styles.cardImage}>
                    <img
                      src={episode.coverImage}
                      alt={episode.title}
                      loading="lazy"
                    />
                    {currentEpisode.id === episode.id && (
                      <div className={styles.nowPlaying}>
                        {isPlaying ? 'NOW PLAYING' : 'SELECTED'}
                      </div>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <h5 className={styles.cardTitle}>{episode.title}</h5>
                    <div className={styles.cardMeta}>
                      <span>{new Date(episode.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      <span>•</span>
                      <span>{formatTime(episode.duration)}</span>
                    </div>
                    <div className={styles.cardTags}>
                      {episode.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subscription CTA */}
        <div className={styles.subscriptionCta}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Never miss an episode</h3>
            <p className={styles.ctaText}>Subscribe to get new episodes delivered automatically to your favorite podcast app</p>
            <div className={styles.ctaButtons}>
              <a href="/subscribe" className={styles.primaryButton}>
                <span>Subscribe Now</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link to="/podcast" className={styles.secondaryButton}>
                <span>Browse All Episodes</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7L12 11L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;

