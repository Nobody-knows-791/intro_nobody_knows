'use client';
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import styles from './page.module.css';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [showAbout, setShowAbout] = useState(false);
  const scrollContainer = useRef(null);
  const scrollThumb = useRef(null);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const container = scrollContainer.current;
    const thumb = scrollThumb.current;

    const updateScrollThumb = () => {
      const scrollPercentage = container.scrollTop / (container.scrollHeight - container.clientHeight);
      const thumbPosition = scrollPercentage * (container.clientHeight - thumb.clientHeight);
      thumb.style.transform = `translateY(${thumbPosition}px)`;
      
      // Add curvy scroll effect
      container.style.scrollBehavior = 'smooth';
    };

    container.addEventListener('scroll', updateScrollThumb);
    return () => container.removeEventListener('scroll', updateScrollThumb);
  }, []);

  return (
    <div className={styles.container} ref={scrollContainer}>
      <Head>
        <title>NOBODY KNOWS</title>
        <meta name="description" content="Unique personal website" />
      </Head>

      {/* Theme Toggle */}
      <button className={styles.themeToggle} onClick={toggleTheme}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      {/* Custom Scrollbar */}
      <div className={styles.customScrollbar}>
        <div className={styles.scrollTrack}></div>
        <div className={styles.scrollThumb} ref={scrollThumb}></div>
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <p className={styles.welcomeText}>Welcome I am</p>
        <h1 className={styles.mainTitle}>NOBODY KNOWS</h1>
      </section>

      {/* About Section */}
      <section className={styles.aboutSection}>
        <img 
          src="/profile-image.jpg" 
          alt="Profile" 
          className={styles.profileImage}
        />
        <h2 className={styles.aboutTitle}>ABOUT ME</h2>
        <button 
          className={styles.checkItButton}
          onClick={() => setShowAbout(!showAbout)}
        >
          CHECK IT
        </button>

        {showAbout && (
          <div className={styles.aboutBoxes}>
            {/* 3D Animated Boxes */}
            <div className={`${styles.infoBox} ${styles.animateBox}`}>
              <div className={styles.boxIcon}>👤</div>
              <h3>NAME</h3>
              <p>NOBODY KNOWS</p>
              <button className={styles.closeBox} onClick={() => setShowAbout(false)}>×</button>
            </div>
            
            <div className={`${styles.infoBox} ${styles.animateBox}`} style={{ animationDelay: '0.3s' }}>
              <div className={styles.boxIcon}>🌍</div>
              <h3>COUNTRY, STATE</h3>
              <p>India, Haryana</p>
            </div>
            
            <div className={`${styles.infoBox} ${styles.animateBox}`} style={{ animationDelay: '0.6s' }}>
              <div className={styles.boxIcon}>🎂</div>
              <h3>AGE</h3>
              <p>18</p>
            </div>
          </div>
        )}
      </section>

      {/* Games Section */}
      <section className={styles.gamesSection}>
        <h2 className={styles.sectionTitle}>PLAY WITH ME</h2>
        <div className={styles.gamesGrid}>
          {/* Game cards would go here */}
        </div>
      </section>
    </div>
  );
}