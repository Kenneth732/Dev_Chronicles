import { useState, useEffect } from 'react';
import { FiPlay, FiPause, FiFilter, FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaSpotify, FaApple, FaGooglePlay } from 'react-icons/fa';
import "../styles/BrowseEpisodes.css"
const allEpisodes = [
  {
    id: 'ep001',
    title: 'The Future of Web Development in 2024',
    date: '2024-01-15',
    duration: 2722,
    description: 'We discuss emerging trends in web development including WASM, React Server Components, and the resurgence of monoliths. This episode features special guests from leading tech companies sharing their insights on the evolving landscape.',
    audioUrl: '/ep001.mp3',
    coverImage: 'https://media.licdn.com/dms/image/v2/D4D12AQFV9lmozBJXhQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1705124282310?e=2147483647&v=beta&t=AkLKb8_R4E_HFN-mFfPr9wHLbwiQs29Nz5iKnB97V6I',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep001',
      apple: 'https://apple.com/yourpodcast/ep001',
      google: 'https://google.com/yourpodcast/ep001'
    },
    tags: ['Web Dev', 'Trends', '2024'],
    featured: true,
    listens: 12453
  },
  {
    id: 'ep002',
    title: 'AI Revolution: From GPT-4 to Gemini',
    date: '2024-02-10',
    duration: 3138,
    description: 'Exploring the latest advancements in AI, comparing different LLMs, and discussing practical applications for developers. Our panel of AI researchers breaks down the technical details in accessible ways.',
    audioUrl: '/ep002.mp3',
    coverImage: 'https://miro.medium.com/v2/resize:fit:1200/0*zyBWRKPZV8lOV69E.jpg',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep002',
      apple: 'https://apple.com/yourpodcast/ep002',
      google: 'https://google.com/yourpodcast/ep002'
    },
    tags: ['AI', 'Machine Learning', 'LLMs'],
    featured: true,
    listens: 18732
  },
  {
    id: 'ep003',
    title: 'Building Scalable Microservices with Go',
    date: '2024-03-05',
    duration: 2325,
    description: 'Deep dive into microservices architecture using Go, covering best practices, common pitfalls, and performance optimization. Learn from the engineering team at a Fortune 500 company about their real-world implementation.',
    audioUrl: '/ep003.mp3',
    coverImage: 'https://media.licdn.com/dms/image/v2/D5612AQGRaGanbQtebA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1709851350044?e=2147483647&v=beta&t=pcnPt9fPmXuz5jCzXq7Pg0GUKixpFydPIkbDcT38GKA',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep003',
      apple: 'https://apple.com/yourpodcast/ep003',
      google: 'https://google.com/yourpodcast/ep003'
    },
    tags: ['Go', 'Microservices', 'Architecture'],
    listens: 8921
  },
  {
    id: 'ep004',
    title: 'The State of JavaScript 2024',
    date: '2024-04-20',
    duration: 2952,
    description: 'Annual review of the JavaScript ecosystem, including new features, framework trends, and developer survey results. We analyze data from over 10,000 developers to identify the most significant shifts in the JS world.',
    audioUrl: '/ep004.mp3',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2mFl6Vz7lP3ir2TcuwqVV7kk7xLPx0oWwNw&s',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep004',
      apple: 'https://apple.com/yourpodcast/ep004',
      google: 'https://google.com/yourpodcast/ep004'
    },
    tags: ['JavaScript', 'Frontend', 'Survey'],
    listens: 15324
  },
  {
    id: 'ep005',
    title: 'DevOps Best Practices for Small Teams',
    date: '2024-05-12',
    duration: 2541,
    description: 'How small engineering teams can implement effective DevOps practices without overhead. Practical tips from startups that scaled their infrastructure efficiently.',
    audioUrl: '/ep005.mp3',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYcUyLTt3iLU5RADs0yw915DD8q3SSd-tRqQ&s',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep005',
      apple: 'https://apple.com/yourpodcast/ep005',
      google: 'https://google.com/yourpodcast/ep005'
    },
    tags: ['DevOps', 'CI/CD', 'Infrastructure'],
    listens: 7654
  },
  {
    id: 'ep006',
    title: 'The Future of Remote Work in Tech',
    date: '2024-06-08',
    duration: 2876,
    description: 'Analyzing how remote work is evolving in the tech industry. Interviews with distributed teams about their workflows, tools, and culture-building strategies.',
    audioUrl: '/ep006.mp3',
    coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK89mNxUOAQ4X7iOIIhMqLzJ8iW-vv0geKhg&s',
    platforms: {
      spotify: 'https://spotify.com/yourpodcast/ep006',
      apple: 'https://apple.com/yourpodcast/ep006',
      google: 'https://google.com/yourpodcast/ep006'
    },
    tags: ['Remote Work', 'Productivity', 'Culture'],
    listens: 10234
  }
];


const allTags = [...new Set(allEpisodes.flatMap(episode => episode.tags))];

const BrowseEpisodes = ({ onBackClick }) => {
  const [episodes, setEpisodes] = useState(allEpisodes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [audioElement, setAudioElement] = useState(null);

  // Handle search and filtering
  useEffect(() => {
    let filtered = [...allEpisodes];
    
    // Apply search term filter
if (searchTerm) {
  filtered = filtered.filter(episode =>
    episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
}

    
    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(episode =>
        selectedTags.some(tag => episode.tags.includes(tag)))
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'duration') {
        return sortOrder === 'asc' ? a.duration - b.duration : b.duration - a.duration;
      } else if (sortBy === 'listens') {
        return sortOrder === 'asc' ? a.listens - b.listens : b.listens - a.listens;
      } else if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });
    
    setEpisodes(filtered);
  }, [searchTerm, selectedTags, sortBy, sortOrder]);

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handlePlayPause = (episodeId) => {
    if (currentlyPlaying === episodeId) {
      // Pause current episode
      if (audioElement) {
        audioElement.pause();
        setCurrentlyPlaying(null);
        setAudioElement(null);
      }
    } else {
      // Play new episode
      const episode = allEpisodes.find(ep => ep.id === episodeId);
      if (!episode) return;
      
      // Create new audio element if needed
      const newAudio = new Audio(episode.audioUrl);
      
      // Pause any currently playing audio
      if (audioElement) {
        audioElement.pause();
      }
      
      // Play the new audio
      newAudio.play()
        .then(() => {
          setCurrentlyPlaying(episodeId);
          setAudioElement(newAudio);
        })
        .catch(error => {
          console.error('Error playing audio:', error);
        });
    }
  };

  return (
    <div className="browse-episodes">
      <header className="browse-header">
        <div className="header-content">
          <h1 className="header-title">All Episodes</h1>
          <p className="header-subtitle">
            Browse our complete collection of technical discussions and interviews
          </p>
        </div>
      </header>

      <main className="browse-main">
        {/* Search and Filter Bar */}
        <div className="controls">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search episodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-filter-container">
            <button
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              <span>Filters</span>
            </button>

            <div className="sort-container">
              <label htmlFor="sortBy" className="sort-label">Sort by:</label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="duration">Duration</option>
                <option value="listens">Listens</option>
              </select>
              <button
                onClick={toggleSortOrder}
                className="sort-order-button"
                aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              >
                {sortOrder === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="filter-panel">
            <h3 className="filter-panel-title">Filter by Tags</h3>
            <div className="tag-filters">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-filter ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                className="clear-filters"
                onClick={() => setSelectedTags([])}
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Episode Grid */}
        <div className="episode-grid">
          {episodes.length > 0 ? (
            episodes.map(episode => (
              <div key={episode.id} className="episode-card">
                <div className="episode-image-container">
                  <img
                    src={episode.coverImage}
                    alt={episode.title}
                    className="episode-image"
                    loading="lazy"
                  />
                  <button
                    className="play-button"
                    onClick={() => handlePlayPause(episode.id)}
                    aria-label={currentlyPlaying === episode.id ? 'Pause episode' : 'Play episode'}
                  >
                    {currentlyPlaying === episode.id ? <FiPause /> : <FiPlay />}
                  </button>
                  {currentlyPlaying === episode.id && (
                    <div className="now-playing-indicator">Now Playing</div>
                  )}
                </div>

                <div className="episode-content">
                  <div className="episode-meta">
                    <span className="episode-number">{episode.id.toUpperCase()}</span>
                    <span className="episode-date">{formatDate(episode.date)}</span>
                    <span className="episode-duration">{formatTime(episode.duration)}</span>
                    <span className="episode-listens">{episode.listens.toLocaleString()} listens</span>
                  </div>

                  <h3 className="episode-title">{episode.title}</h3>

                  <div className="tag-container">
                    {episode.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>

                  <p className="episode-description">
                    {episode.description.length > 150
                      ? `${episode.description.substring(0, 150)}...`
                      : episode.description}
                  </p>

                  <div className="platform-links">
                    <span className="available-on">Available on:</span>
                    <div className="platform-icons">
                      <a href={episode.platforms.spotify} target="_blank" rel="noopener noreferrer" className="platform-link">
                        <FaSpotify />
                      </a>
                      <a href={episode.platforms.apple} target="_blank" rel="noopener noreferrer" className="platform-link">
                        <FaApple />
                      </a>
                      <a href={episode.platforms.google} target="_blank" rel="noopener noreferrer" className="platform-link">
                        <FaGooglePlay />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No episodes found</h3>
              <p>Try adjusting your search or filters</p>
              <button
                className="reset-button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedTags([]);
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Back to Podcast Link */}
        <div className="back-link-container">
          <button onClick={onBackClick} className="back-link">
            ← Back to Podcast
          </button>
        </div>
      </main>


    </div>
  );
};

export default BrowseEpisodes;