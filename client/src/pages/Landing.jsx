import { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthCheckSkeleton } from '../components/SkeletonLoader';
import Navbar from '../components/Navbar';
import './Landing.css';

export default function Landing() {
  const { user, loading } = useAuth();
  const storyRef = useRef(null);

  if (loading) {
    return <AuthCheckSkeleton />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleScrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing">
      <Navbar onScrollToStory={handleScrollToStory} />

      <main>
        {/* HERO SECTION - COS x Apple Split */}
        <section className="landing-hero">
          <div className="hero-left">
            <span className="hero-label">PRIVATE TRAVEL JOURNAL</span>
            <h1 className="hero-headline">
              Every journey deserves<br />a beautiful place to live.
            </h1>
            <p className="hero-body">
              Organize itineraries, preserve memories and store travel documents in one timeless archive.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary">
                Create Account
              </Link>
              <button type="button" className="btn-text-underline" onClick={handleScrollToStory}>
                Explore Journal
              </button>
            </div>
          </div>

          <div className="hero-right">
            <img
              src="/assets/hero_editorial.png"
              alt="Aman resort architectural luxury photography"
              className="hero-tall-img"
            />
          </div>
        </section>

        {/* STORY SECTION - Apple Storytelling Flow */}
        <div className="story-wrapper" ref={storyRef}>
          {/* Story Section 1: Full-Width Image + Centered Headline */}
          <section className="story-section-1">
            <img
              src="/assets/editorial_cinematic.png"
              alt="Cinematic foggy alpine sunrise seascape"
              className="full-width-img"
            />
            <div className="story-copy-centered">
              <h2 className="story-headline-large">
                Collect memories, not screenshots.
              </h2>
              <p className="story-paragraph-centered">
                Store flight details, stay reservations, and personal journal notes in a serene archive designed for quiet reflection and effortless recall.
              </p>
            </div>
          </section>

          {/* Story Section 2: Two-Column Portrait */}
          <section className="story-section-2">
            <div className="story-col-img">
              <img
                src="/assets/editorial_section1.png"
                alt="Travel journal and passport on desk"
                className="portrait-img"
              />
            </div>
            <div className="story-col-text">
              <h2 className="story-headline">
                Designed for thoughtful travelers.
              </h2>
              <p className="story-body">
                Every destination holds stories worth preserving. TripVault brings architectural structure to your itineraries while safeguarding your private memories in a calm, beautifully formatted space.
              </p>
            </div>
          </section>

          {/* Story Section 3: Four-Image Editorial Gallery (Fashion Magazine Grid) */}
          <section className="story-section-gallery">
            <span className="gallery-label">EDITORIAL GALLERY</span>
            <div className="editorial-gallery-grid">
              <div className="gallery-item">
                <img
                  src="/assets/gallery1.png"
                  alt="Mediterranean villa wall shadow"
                  className="gallery-img"
                />
                <span className="gallery-caption">I. AMALFI RESORT</span>
              </div>
              <div className="gallery-item">
                <img
                  src="/assets/gallery2.png"
                  alt="Coastal linen umbrella beach"
                  className="gallery-img"
                />
                <span className="gallery-caption">II. COASTAL HORIZON</span>
              </div>
              <div className="gallery-item">
                <img
                  src="/assets/gallery3.png"
                  alt="Desk journal and coffee"
                  className="gallery-img"
                />
                <span className="gallery-caption">III. DESK JOURNAL</span>
              </div>
              <div className="gallery-item">
                <img
                  src="/assets/gallery4.png"
                  alt="Kyoto stone archway"
                  className="gallery-img"
                />
                <span className="gallery-caption">IV. KYOTO SANCTUARY</span>
              </div>
            </div>
          </section>
        </div>

        {/* QUOTE SECTION - COS Centered Serif */}
        <section className="quote-section">
          <blockquote className="serif-quote">
            “The places we remember are rarely the loudest.”
          </blockquote>
          <span className="quote-author">TripVault Journal</span>
        </section>
      </main>

      <footer className="editorial-footer">
        <div className="footer-container">
          <span className="footer-brand">TripVault</span>
          <div className="footer-links">
            <span className="footer-link" style={{ cursor: 'pointer' }}>Privacy</span>
            <span className="footer-link" style={{ cursor: 'pointer' }}>Terms</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
