'use client';
import { useState } from 'react';
import ThreeDBackground from '../components/ThreeDBackground';
import CustomScrollbar from '../components/CustomScrollbar';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/animations.css';

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [showAbout, setShowAbout] = useState(false);

  return (
    <main>
      <ThreeDBackground />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      <CustomScrollbar />
      
      {/* Hero Section */}
      <section className="hero-section">
        <p className="welcome-text">Welcome I am</p>
        <h1 className="main-title">NOBODY KNOWS</h1>
      </section>

      {/* About Section */}
      <section className="about-section">
        <img 
          src="/profile-image.jpg" 
          alt="Profile" 
          className="profile-image"
        />
        <h2 className="about-title">ABOUT ME</h2>
        <button 
          className="check-it-button"
          onClick={() => setShowAbout(!showAbout)}
        >
          CHECK IT
        </button>

        {showAbout && (
          <div className="about-boxes">
            <div className="info-box animate-box">
              <div className="box-icon">👤</div>
              <h3>NAME</h3>
              <p>NOBODY KNOWS</p>
              <button className="close-box" onClick={() => setShowAbout(false)}>×</button>
            </div>
            
            <div className="info-box animate-box" style={{ animationDelay: '0.3s' }}>
              <div className="box-icon">🌍</div>
              <h3>COUNTRY, STATE</h3>
              <p>India, Haryana</p>
            </div>
            
            <div className="info-box animate-box" style={{ animationDelay: '0.6s' }}>
              <div className="box-icon">🎂</div>
              <h3>AGE</h3>
              <p>18</p>
            </div>
          </div>
        )}
      </section>

      {/* Games Section */}
      <section className="games-section">
        <h2 className="section-title">PLAY WITH ME</h2>
        <div className="games-grid">
          {/* Game components will go here */}
        </div>
      </section>
    </main>
  );
}