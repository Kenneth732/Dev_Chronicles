import { useState, useEffect } from 'react';
import styles from '../styles/Subscribe.module.css'; // Adjust the path as necessary

const Subscribe = ({ incentiveOffer = true }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    preferences: {
      articles: true,
      tutorials: true,
      offers: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [showPreferences, setShowPreferences] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(12483);
  const [typingEffect, setTypingEffect] = useState('');

  // Simulate subscriber count animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSubscriberCount(prev => {
        const increment = Math.floor(Math.random() * 3);
        return prev + increment;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect for the incentive message
  useEffect(() => {
    const messages = [
      "Free Architecture Decision Records Template",
      "Exclusive Tech Stack Comparison PDF",
      "Dev Productivity Cheat Sheet"
    ];
    let currentMessage = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    const type = () => {
      setTypingEffect(messages[currentMessage].substring(0, currentChar));

      if (!isDeleting && currentChar < messages[currentMessage].length) {
        currentChar++;
        setTimeout(type, typingSpeed);
      } else if (isDeleting && currentChar > 0) {
        currentChar--;
        setTimeout(type, typingSpeed / 2);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          currentMessage = (currentMessage + 1) % messages.length;
        }
        setTimeout(type, typingSpeed);
      }
    };

    type();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }));
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'idle', message: '' });

    // Validation
    if (!formData.email) {
      setStatus({ state: 'error', message: 'Email address is required' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ state: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ state: 'loading', message: 'Processing your subscription...' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setStatus({ 
        state: 'success', 
        message: 'Thank you for subscribing! Check your email to confirm.' 
      });
      
      // Reset form but keep preferences
      setFormData(prev => ({
        email: '',
        name: '',
        preferences: prev.preferences
      }));
    } catch (error) {
      setStatus({ 
        state: 'error', 
        message: 'Subscription failed. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.subscribeSection}>
      <div className={styles.backgroundPattern} aria-hidden="true"></div>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <div className={styles.badge}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"></path>
                </svg>
                <span>Premium Newsletter</span>
              </div>
              <h2 className={styles.title}>
                Elevate Your <span className={styles.highlight}>Engineering</span> Expertise
              </h2>
              <p className={styles.subtitle}>
                Join {subscriberCount.toLocaleString()}+ developers receiving exclusive insights on architecture patterns, performance optimization, and emerging technologies.
              </p>
              
              <ul className={styles.benefitsList}>
                <li className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                  </div>
                  <div className={styles.benefitText}>
                    <h4>Deep-Dive Articles</h4>
                    <p>Weekly technical essays with code samples and architectural diagrams</p>
                  </div>
                </li>
                <li className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <div className={styles.benefitText}>
                    <h4>Curated Resources</h4>
                    <p>Hand-picked tools, libraries, and research papers</p>
                  </div>
                </li>
                <li className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className={styles.benefitText}>
                    <h4>Community Access</h4>
                    <p>Private Discord for subscribers with exclusive Q&A sessions</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.formContainer}>
              {status.state === 'success' ? (
                <div className={styles.successCard}>
                  <div className={styles.successIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Welcome Aboard!</h3>
                  <p className={styles.successMessage}>{status.message}</p>
                  {incentiveOffer && (
                    <div className={styles.incentiveNotice}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      <span>Your <strong>{typingEffect}</strong> has been sent to your inbox</span>
                    </div>
                  )}
                  <button 
                    onClick={() => setStatus({ state: 'idle', message: '' })}
                    className={styles.continueButton}
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formHeader}>
                    <h3 className={styles.formTitle}>Join The Newsletter</h3>
                    <p className={styles.formSubtitle}>Get exclusive content not available on the blog</p>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.inputLabel}>Email Address*</label>
                    <div className={styles.inputWrapper}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.inputField}
                        placeholder="your@email.com"
                        required
                        disabled={isSubmitting}
                      />
                      <div className={styles.inputIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.inputLabel}>Name (Optional)</label>
                    <div className={styles.inputWrapper}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.inputField}
                        placeholder="Your name"
                        disabled={isSubmitting}
                      />
                      <div className={styles.inputIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.preferencesToggle}
                    onClick={() => setShowPreferences(!showPreferences)}
                  >
                    {showPreferences ? 'Hide Preferences' : 'Customize Email Preferences'}
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                      className={`${styles.toggleIcon} ${showPreferences ? styles.rotated : ''}`}
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </button>

                  {showPreferences && (
                    <div className={styles.preferencesPanel}>
                      <h4 className={styles.preferencesTitle}>Email Preferences</h4>
                      <p className={styles.preferencesSubtitle}>Select the types of emails you'd like to receive</p>
                      
                      <div className={styles.preferenceOption}>
                        <label className={styles.preferenceLabel}>
                          <input
                            type="checkbox"
                            name="articles"
                            checked={formData.preferences.articles}
                            onChange={handlePreferenceChange}
                            className={styles.preferenceCheckbox}
                            disabled={isSubmitting}
                          />
                          <span className={styles.customCheckbox}></span>
                          <div className={styles.preferenceText}>
                            <span className={styles.preferenceName}>In-Depth Articles</span>
                            <span className={styles.preferenceDescription}>Weekly technical essays and case studies</span>
                          </div>
                        </label>
                      </div>

                      <div className={styles.preferenceOption}>
                        <label className={styles.preferenceLabel}>
                          <input
                            type="checkbox"
                            name="tutorials"
                            checked={formData.preferences.tutorials}
                            onChange={handlePreferenceChange}
                            className={styles.preferenceCheckbox}
                            disabled={isSubmitting}
                          />
                          <span className={styles.customCheckbox}></span>
                          <div className={styles.preferenceText}>
                            <span className={styles.preferenceName}>Tutorials</span>
                            <span className={styles.preferenceDescription}>Step-by-step coding tutorials</span>
                          </div>
                        </label>
                      </div>

                      <div className={styles.preferenceOption}>
                        <label className={styles.preferenceLabel}>
                          <input
                            type="checkbox"
                            name="offers"
                            checked={formData.preferences.offers}
                            onChange={handlePreferenceChange}
                            className={styles.preferenceCheckbox}
                            disabled={isSubmitting}
                          />
                          <span className={styles.customCheckbox}></span>
                          <div className={styles.preferenceText}>
                            <span className={styles.preferenceName}>Product Offers</span>
                            <span className={styles.preferenceDescription}>Occasional discounts on my products</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {status.state === 'error' && (
                    <div className={styles.errorMessage}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>{status.message}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className={styles.spinner} viewBox="0 0 50 50">
                          <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        Join Now
                      </>
                    )}
                  </button>

                  <div className={styles.privacyNotice}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <p>
                      I respect your privacy. Unsubscribe anytime. Read my{' '}
                      <a href="/privacy" className={styles.privacyLink}>Privacy Policy</a>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;