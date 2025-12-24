import { useEffect, useState } from 'react';

/* Logos */
const LOGO_A =
  'https://lasvegaspartybuses.com/wp-content/uploads/2022/07/las-vegas-party-bus-rental-official-logo.png';

const LOGO_B =
  'https://lasvegaspartybuses.com/wp-content/uploads/2022/08/Las-Vegas-Party-Bus-Logo.png';

/* Door opening video */
const DOOR_VIDEO =
  'https://lasvegaspartybuses.com/wp-content/uploads/2025/12/Party_Bus_Door_Video_Generation.mp4';

export default function App() {
  const [view, setView] = useState('roadblock'); // roadblock | a | b
  const [showVideo, setShowVideo] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState(null);

  /* Lock scroll on roadblock */
  useEffect(() => {
    document.body.classList.toggle('scroll-locked', view === 'roadblock');
  }, [view]);

  /* Handle browser back button */
  useEffect(() => {
    const onPopState = () => {
      setView('roadblock');
      setShowVideo(false);
      setTransitionTarget(null);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  /* Start video transition */
  const goTo = (target) => {
    setTransitionTarget(target);
    setShowVideo(true);
  };

  /* When video finishes, reveal section */
  const handleVideoEnd = () => {
    history.pushState({ view: transitionTarget }, '');
    setView(transitionTarget);
    setShowVideo(false);
    setTransitionTarget(null);
  };

  /* Return to roadblock */
  const backToRoadblock = () => {
    history.pushState({}, '');
    setView('roadblock');
  };

  return (
    <>
      {/* VIDEO TRANSITION OVERLAY */}
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
                aria-label="Enter Experience A"
              >
                <img src={LOGO_A} alt="Las Vegas Party Bus Rental" />
              </button>

              <button
                className="roadblock-option"
                onClick={() => goTo('b')}
                aria-label="Enter Experience B"
              >
                <img src={LOGO_B} alt="Las Vegas Party Bus" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION A */}
      <section className={`section-wrapper ${view === 'a' ? 'visible' : ''}`}>
        <div className="section-content">
          <h1 className="section-headline">Experience A</h1>
          <p className="section-text">
            Premium party bus rentals designed for unforgettable Vegas nights.
          </p>
          <a className="section-cta" href="#">
            Get a Quote
          </a>
          <button className="back-button" onClick={backToRoadblock}>
            Back to Roadblock
          </button>
        </div>
      </section>

      {/* SECTION B */}
      <section className={`section-wrapper ${view === 'b' ? 'visible' : ''}`}>
        <div className="section-content">
          <h1 className="section-headline">Experience B</h1>
          <p className="section-text">
            High-end transportation for events, weddings, and VIP experiences.
          </p>
          <a className="section-cta" href="#">
            View Fleet
          </a>
          <button className="back-button" onClick={backToRoadblock}>
            Back to Roadblock
          </button>
        </div>
      </section>
    </>
  );
}
