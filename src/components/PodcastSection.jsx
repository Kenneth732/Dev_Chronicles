import { useState, useEffect, useRef } from 'react';
import styles from '../styles/PodcastSection.module.css'; // Adjust the path as necessary
import Ep001 from "../assets/ep001.mp3"
import Ep002 from "../assets/ep002.mp3"
import { Link } from 'react-router-dom';

const PodcastSection = () => {
const [episodes, setEpisodes] = useState([
  {
    id: 'ep001',
    title: 'The Future of Web Development in 2024',
    date: '2024-01-15',
    duration: '45:22',
    description: 'We discuss emerging trends in web development including WASM, React Server Components, and the resurgence of monoliths.',
    audioUrl: Ep001,
    coverImage: 'https://media.licdn.com/dms/image/v2/D4D12AQFV9lmozBJXhQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705124282310?e=2147483647&v=beta&t=AkLKb8_R4E_HFN-mFfPr9wHLbwiQs29Nz5iKnB97V6I',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep001',
      apple: 'https://apple.com/yourpodcast/ep001',
      google: 'https://google.com/yourpodcast/ep001'
    }
  },
  {
    id: 'ep002',
    title: 'AI Revolution: From GPT-4 to Gemini',
    date: '2024-02-10',
    duration: '52:18',
    description: 'Exploring the latest advancements in AI, comparing different LLMs, and discussing practical applications for developers.',
    audioUrl: Ep002,
    coverImage: 'https://miro.medium.com/v2/resize:fit:1200/0*zyBWRKPZV8lOV69E.jpg',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep002',
      apple: 'https://apple.com/yourpodcast/ep002',
      google: 'https://google.com/yourpodcast/ep002'
    }
  },
  {
    id: 'ep003',
    title: 'Building Scalable Microservices with Go',
    date: '2024-03-05',
    duration: '38:45',
    description: 'Deep dive into microservices architecture using Go, covering best practices, common pitfalls, and performance optimization.',
    audioUrl: 'https://example.com/podcasts/ep003.mp3',
    coverImage: 'https://media.licdn.com/dms/image/v2/D5612AQGRaGanbQtebA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709851350044?e=2147483647&v=beta&t=pcnPt9fPmXuz5jCzXq7Pg0GUKixpFydPIkbDcT38GKA',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep003',
      apple: 'https://apple.com/yourpodcast/ep003',
      google: 'https://google.com/yourpodcast/ep003'
    }
  },
  {
    id: 'ep004',
    title: 'The State of JavaScript 2024',
    date: '2024-04-20',
    duration: '49:12',
    description: 'Annual review of the JavaScript ecosystem, including new features, framework trends, and developer survey results.',
    audioUrl: 'https://example.com/podcasts/ep004.mp3',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2mFl6Vz7lP3ir2TcuwqVV7kk7xLPx0oWwNw&s',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep004',
      apple: 'https://apple.com/yourpodcast/ep004',
      google: 'https://google.com/yourpodcast/ep004'
    }
  }
]);

  const audioRef = useRef(null);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (episodes.length > 0 && !currentEpisode) {
      setCurrentEpisode(episodes[0]);
    }
  }, [episodes, currentEpisode]);

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
    setDuration(audioRef.current.duration || 0);
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className={styles.podcastSection} id="podcast">
      <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>🎙️ Engineering Podcast</h2>
        <p className={styles.sectionSubtitle}>Deep dives into software architecture, development practices, and tech trends</p>
      </div>

      {currentEpisode && (
        <div className={styles.currentEpisode}>
          <div className={styles.episodeCover}>
            <img
              src={currentEpisode.coverImage}
              alt={currentEpisode.title}
              className={styles.coverImage}
              loading="lazy"
            />
          </div>

          <div className={styles.episodeContent}>
            <div className={styles.episodeHeader}>
              <span className={styles.episodeDate}>
                {new Date(currentEpisode.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <h3 className={styles.episodeTitle}>{currentEpisode.title}</h3>
              <p className={styles.episodeDescription}>{currentEpisode.description}</p>
            </div>

            <div className={styles.audioPlayer}>
              <audio
                ref={audioRef}
                src={currentEpisode.audioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onLoadedMetadata={handleTimeUpdate}
              />

              <div className={styles.playerControls}>
                <button
                  className={styles.playButton}
                  onClick={handlePlayPause}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <div className={styles.progressContainer}>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className={styles.progressBar}
                    style={{
                      '--progress-color': 'var(--primary-color)',
                      '--track-color': 'var(--secondary-color)'
                    }}
                  />
                  <div className={styles.timeDisplay}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.platformLinks}>
              <p className={styles.availableOn}>Available on:</p>
              <div className={styles.platformIcons}>
                <a href={currentEpisode.platforms.spotify} target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.56 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </a>
                <a href={currentEpisode.platforms.apple} target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </a>
                <a href={currentEpisode.platforms.google} target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm6.35 15.54c-1.16.77-2.65 1.15-4.6 1.15-2.5 0-4.6-.8-6.3-2.4-1.7-1.6-2.55-3.6-2.55-6.1 0-2.5.85-4.6 2.55-6.2 1.7-1.6 3.8-2.4 6.3-2.4 3.65 0 6.05 1.55 7.2 2.75l-2.95 2.9c-.65-.65-1.85-1.35-4.25-1.35-2.15 0-3.95.8-5.25 2.1-1.3 1.3-2 3.05-2 5.2 0 2.15.7 3.95 2 5.25 1.3 1.3 3.1 2 5.25 2 2.45 0 4.15-.8 5.35-2.05 1.2-1.25 1.5-2.65 1.5-3.55 0-.8-.25-1.45-.55-1.95h-6.3v-3.9h10.2c.1.5.15 1.05.15 1.55 0 2.05-.7 4.35-2.45 5.95z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.episodeList}>
        <h4 className={styles.listTitle}>Recent Episodes</h4>
        <ul className={styles.episodes}>
          {episodes.slice(0, 4).map((episode) => (
            <li
              key={episode.id}
              className={`${styles.episodeItem} ${currentEpisode?.id === episode.id ? styles.active : ''}`}
              onClick={() => {
                setCurrentEpisode(episode);
                setIsPlaying(false);
              }}
            >
              <div className={styles.episodeItemCover}>
                <img
                  src={episode.coverImage}
                  alt={episode.title}
                  loading="lazy"
                />
              </div>
              <div className={styles.episodeItemInfo}>
                <h5>{episode.title}</h5>
                <div className={styles.episodeMeta}>
                  <span>{new Date(episode.date).toLocaleDateString()}</span>
                  <span>{episode.duration}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.ctaContainer}>
        <a href="/podcast" className={styles.primaryButton}>
          Browse All Episodes
        </a>
        <Link to='/subscribe' className={styles.secondaryButton}>
          Subscribe
        </Link>
      </div>
      </div>
    </section>
  );
};

export default PodcastSection;