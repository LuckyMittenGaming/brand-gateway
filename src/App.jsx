import { useEffect, useState } from 'react';

/* Logos */
const LOGO_A =
  'https://lasvegaspartybuses.com/wp-content/uploads/2025/12/party-bus-logo.png';

const LOGO_B =
  'https://lasvegaspartybuses.com/wp-content/uploads/2022/08/Las-Vegas-Party-Bus-Logo.png';

/* Door opening video */
const DOOR_VIDEO =
  'https://lasvegaspartybuses.com/wp-content/uploads/2025/12/Party_Bus_Door_Video_Generation.mp4';

export default function App() {
  const [view, setView] = useState('roadblock');
  const [showVideo, setShowVideo] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState(null);

  /* Disable browser scroll restoration */
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  /* Hard lock body when roadblock is visible */
  useEffect(() => {
    if (view === 'roadblock') {
      document.body.style.position = 'fixed';
      document.body.style.inset = '0';
    } else {
      document.body.style.position = '';
      document.body.style.inset = '';
    }
  }, [view]);

  /* Kill focus + force scroll reset (critical) */
  const hardResetScroll = () => {
    document.activeElement?.blur();

    window.scrollTo(0, 0);

    // Double-frame reset defeats late layout & focus jumps
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    });
  };

  /* Handle browser back */
  useEffect(() => {
    const onPopState = () => {
      setShowVideo(false);
      setTransitionTarget(null);
      setView('roadblock');
      hardResetScroll();
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  /* Start transition */
  const goTo = (target) => {
    document.activeElement?.blur();
    hardResetScroll();
    setTransitionTarget(target);
    setShowVideo(true);
  };

  /* Finish video */
  const handleVideoEnd = () => {
    history.pushState({ view: transitionTarget }, '');
    setView(transitionTarget);
    setShowVideo(false);
    setTransitionTarget(null);
    hardResetScroll();
  };

  /* Back to roadblock */
  const backToRoadblock = () => {
    document.activeElement?.blur();
    history.pushState({}, '');
    setView('roadblock');
    hardResetScroll();
  };

  return (
    <>
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
                tabIndex={-1}
              >
                <img src={LOGO_A} alt="Las Vegas Party Bus" />
              </button>

              <button
                className="roadblock-option"
                onClick={() => goTo('b')}
                tabIndex={-1}
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
          <a className="section-cta" href="#">Get a Quote</a>
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
          <a className="section-cta" href="#">View Fleet</a>
          <button className="back-button" onClick={backToRoadblock}>
            Back to Roadblock
          </button>
        </div>
      </section>
    </>
  );
}
