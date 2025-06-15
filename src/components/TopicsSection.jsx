import { useState, useEffect } from 'react';
import styles from '../styles/TopicsSection.module.css';
import { Link } from 'react-router-dom';
const TopicsSection = () => {
  // Sample topics data - replace with your actual data or API fetch
  const [topics, setTopics] = useState([
    { id: 'react', name: 'React', count: 42, color: '#61DAFB' },
    { id: 'rust', name: 'Rust', count: 28, color: '#000000' },
    { id: 'architecture', name: 'Architecture', count: 35, color: '#FF6B6B' },
    { id: 'apis', name: 'APIs', count: 31, color: '#4ECDC4' },
    { id: 'python', name: 'Python', count: 39, color: '#3776AB' },
    { id: 'devops', name: 'DevOps', count: 27, color: '#2496ED' },
    { id: 'database', name: 'Database', count: 33, color: '#FFA500' },
    { id: 'performance', name: 'Performance', count: 25, color: '#9B59B6' },
  ]);

  const [activeFilter, setActiveFilter] = useState(null);
  const [showVisualization, setShowVisualization] = useState(false);

  // Filter articles by topic (simulated)
  const handleFilter = (topicId) => {
    setActiveFilter(activeFilter === topicId ? null : topicId);
    // In a real implementation, you would filter your content here
  };

  // Calculate percentage for visualization
  const totalArticles = topics.reduce((sum, topic) => sum + topic.count, 0);

  return (
    <section className={styles.topicsSection} id="topics">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>🏷️ Explore by Tech Stack</h2>
        <p className={styles.sectionSubtitle}>
          Discover content categorized by technologies and concepts
        </p>
      </div>

      <div className={styles.controls}>
        <button 
          onClick={() => setShowVisualization(!showVisualization)}
          className={styles.toggleButton}
        >
          {showVisualization ? 'Show as List' : 'Show Visualization'}
        </button>
      </div>

      {showVisualization ? (
        <div className={styles.visualizationContainer}>
          <div className={styles.pieChart}>
            {topics.map((topic, index) => {
              const percentage = (topic.count / totalArticles) * 100;
              const rotation = topics
                .slice(0, index)
                .reduce((sum, t) => sum + (t.count / totalArticles) * 360, 0);
              
              return (
                <div 
                  key={topic.id}
                  className={styles.pieSegment}
                  style={{
                    '--percentage': percentage,
                    '--rotation': rotation,
                    '--color': topic.color,
                    '--text-color': getContrastColor(topic.color)
                  }}
                  onClick={() => handleFilter(topic.id)}
                >
                  <span className={styles.segmentLabel}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              );
            })}
            <div className={styles.pieCenter}>
              <span>{totalArticles}</span>
              <span>Articles</span>
            </div>
          </div>
          <div className={styles.legend}>
            {topics.map(topic => (
              <div key={topic.id} className={styles.legendItem}>
                <span 
                  className={styles.legendColor} 
                  style={{ backgroundColor: topic.color }}
                />
                <span className={styles.legendName}>{topic.name}</span>
                <span className={styles.legendCount}>({topic.count})</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.tagsContainer}>
          {topics.map(topic => (
            <button
              key={topic.id}
              className={`${styles.tag} ${activeFilter === topic.id ? styles.active : ''}`}
              onClick={() => handleFilter(topic.id)}
              style={{
                '--tag-color': topic.color,
                '--tag-text-color': getContrastColor(topic.color)
              }}
            >
              #{topic.name}
              <span className={styles.tagCount}>{topic.count}</span>
            </button>
          ))}
        </div>
      )}

      <div className={styles.ctaContainer}>
        <Link to="/topics" className={styles.primaryButton}>
          Browse All Topics
        </Link>
        {activeFilter && (
          <Link to={`/topics/${activeFilter}`} className={styles.secondaryButton}>
            View {topics.find(t => t.id === activeFilter)?.name} Content
          </Link>
        )}
      </div>
    </section>
  );
};

// Helper function to determine text color based on background
function getContrastColor(hexColor) {
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return dark or light text based on luminance
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export default TopicsSection;