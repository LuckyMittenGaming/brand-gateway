import { useEffect, useRef, useState } from 'react';

/* Logos */
const LOGO_A =
  'https://lasvegaspartybuses.com/wp-content/uploads/2025/12/party-bus-logo.png';

const LOGO_B =
  'https://lasvegaspartybuses.com/wp-content/uploads/2022/08/Las-Vegas-Party-Bus-Logo.png';

/* Door opening video */
const DOOR_VIDEO =
  'https://lasvegaspartybuses.com/wp-content/uploads/2025/12/Party_Bus_Door_Video_Generation.mp4';

export default function App() {
  const [view, setView] = useState('roadblock'); // roadblock | a | b
  const [showVideo, setShowVideo] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState(null);

  const scrollRef = useRef(null);

  /* LOCK BROWSER SCROLL FOREVER */
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
  }, []);

  /* HARD RESET INTERNAL SCROLL */
  const resetScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  /* Start transition */
  const goTo = (target) => {
    resetScroll();
    setTransitionTarget(target);
    setShowVideo(true);
  };

  /* Finish video */
  const handleVideoEnd = () => {
    setView(transitionTarget);
    setShowVideo(false);
    setTransitionTarget(null);
    resetScroll();
  };

  /* Back to roadblock */
  const backToRoadblock = () => {
    setView('roadblock');
    resetScroll();
  };

  return (
    <div
      className="app-shell"
      ref={scrollRef}
      style={{
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* VIDEO TRANSITION */}
      {showVideo && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            backgroundColor: '#000',
          }}
        >
          <video
            src={DOOR_VIDEO}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* ROADBLOCK */}
      {view === 'roadblock' && !showVideo && (
        <div className="roadblock-container">
          <div className="roadblock-content">
            <p className="roadblock-instruction">Choose your experience</p>

            <div className="roadblock-options">
              <button
                className="roadblock-option"
                onClick={() => goTo('a')}
              >
                <img src={LOGO_A} alt="Las Vegas Party Bus" />
              </button>

              <button
                className="roadblock-option"
                onClick={() => goTo('b')}
              >
                <img src={LOGO_B} alt="Las Vegas Party Bus" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION A */}
      {view === 'a' && (
        <section className="section-wrapper visible">
          <div className="section-content">
            <h1 className="section-headline">Experience A</h1>
            <p className="section-text">
              Premium party bus rentals designed for unforgettable Vegas nights.
            </p>
            <a className="section-cta" href="#">View Fleet</a>
            <button className="back-button" onClick={backToRoadblock}>
              Back to Roadblock
            </button>
          </div>
        </section>
      )}

      {/* SECTION B */}
      {view === 'b' && (
        <section className="section-wrapper visible">
          <div className="section-content">
            <h1 className="section-headline">Experience B</h1>
            <p className="section-text">
              High-end transportation for events, weddings, and VIP experiences.
            </p>
            <a className="section-cta" href="#">View Fleet</a>
            <button className="back-button" onClick={backToRoadblock}>
              Back to Roadblock
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
