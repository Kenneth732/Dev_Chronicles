

// components/Navbar/Navbar.jsx
import { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

useEffect(() => {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setDarkMode(true);
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}, []);

const toggleDarkMode = () => {
  const newDarkMode = !darkMode;
  setDarkMode(newDarkMode);
  
  if (newDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
};

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };



  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoPrimary}>Dev</span>Chronicles
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <a href="/" className={styles.navLink}>Home</a>
          
          {/* Dropdown for Categories */}
          <div className={styles.dropdownContainer}>
            <button 
              onClick={() => toggleDropdown('categories')}
              className={styles.navLink}
            >
              Categories
              <svg className={styles.dropdownIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {activeDropdown === 'categories' && (
              <div className={styles.dropdownMenu}>
                <Link to="/frontend" className={styles.dropdownItem}>
                  Frontend Development
                </Link>
                <Link to="/backend" className={styles.dropdownItem}>
                  Backend Engineering
                </Link>
                <Link to="/devops" className={styles.dropdownItem}>
                  DevOps & Cloud
                </Link>
                <Link to="/architecture" className={styles.dropdownItem}>
                  System Architecture
                </Link>
              </div>
            )}
            
          </div>

          <a href="/about" className={styles.navLink}>About</a>
          <a href="/contact" className={styles.navLink}>Contact</a>
        </nav>

        {/* Right side elements */}
        <div className={styles.rightContainer}>
          <button className={styles.iconButton}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className={styles.iconButton}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          <button className={styles.primaryButton}>
            Subscribe
          </button>
        </div>

        {/* Mobile menu button */}
        <div className={styles.mobileMenuButton}>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.iconButton}
          >
            {isMobileMenuOpen ? (
              <svg className={styles.mobileIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className={styles.mobileIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <a href="/" className={styles.mobileNavLink}>Home</a>
            
            <button 
              onClick={() => toggleDropdown('mobileCategories')}
              className={styles.mobileNavLink}
            >
              Categories
              <svg className={styles.mobileDropdownIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {activeDropdown === 'mobileCategories' && (
              <div className={styles.mobileDropdownContent}>
                <a href="/category/frontend" className={styles.mobileDropdownItem}>
                  Frontend Development
                </a>
                <a href="/category/backend" className={styles.mobileDropdownItem}>
                  Backend Engineering
                </a>
                <a href="/category/devops" className={styles.mobileDropdownItem}>
                  DevOps & Cloud
                </a>
                <a href="/category/architecture" className={styles.mobileDropdownItem}>
                  System Architecture
                </a>
              </div>
            )}
            
            <a href="/about" className={styles.mobileNavLink}>About</a>
            <a href="/contact" className={styles.mobileNavLink}>Contact</a>
            
            <div className={styles.mobileMenuFooter}>
              <button className={styles.mobileIconButton}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.mobileFooterIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <button 
                onClick={toggleDarkMode}
                className={styles.mobileIconButton}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.mobileFooterIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className={styles.mobileFooterIcon} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              
              <button className={styles.mobilePrimaryButton}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

