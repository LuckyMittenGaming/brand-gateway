import { useEffect, useState } from 'react';

const LOGO_A =
  'https://lasvegaspartybuses.com/wp-content/uploads/2022/07/las-vegas-party-bus-rental-official-logo.png';
const LOGO_B =
  'https://lasvegaspartybuses.com/wp-content/uploads/2022/08/Las-Vegas-Party-Bus-Logo.png';

export default function App() {
  const [view, setView] = useState('roadblock'); // roadblock | a | b
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('scroll-locked', view === 'roadblock');
  }, [view]);

  useEffect(() => {
    const onPop = () => setView('roadblock');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const setTheme = (type) => {
    const root = document.documentElement;
    if (type === 'a') {
      root.style.setProperty('--global-background-color', 'var(--section-a-bg)');
      root.style.setProperty('--global-text-color', 'var(--section-a-text)');
      root.style.setProperty('--global-accent-color', 'var(--section-a-accent)');
    }
    if (type === 'b') {
      root.style.setProperty('--global-background-color', 'var(--section-b-bg)');
      root.style.setProperty('--global-text-color', 'var(--section-b-text)');
      root.style.setProperty('--global-accent-color', 'var(--section-b-accent)');
    }
    if (type === 'roadblock') {
      root.style.setProperty('--global-background-color', 'var(--roadblock-bg)');
      root.style.setProperty('--global-text-color', 'var(--roadblock-text)');
      root.style.setProperty('--global-accent-color', 'var(--roadblock-accent)');
    }
  };

  const choose = (target) => {
    setAnimating(true);
    setTheme(target);
    history.pushState({ view: target }, '');

    setTimeout(() => {
      setView(target);
      setAnimating(false);
    }, 800);
  };

  const backToRoadblock = () => {
    setTheme('roadblock');
    setView('roadblock');
    history.pushState({}, '');
  };

  return (
    <>
      {view === 'roadblock' && (
        <div className={`roadblock-container ${animating ? 'animating-out' : ''}`}>
          <div className="roadblock-panel top"></div>
          <div className="roadblock-panel bottom"></div>

          <div className="roadblock-content">
            <p className="roadblock-instruction">Choose your experience</p>

            <div className="roadblock-options">
              <button
                className="roadblock-option"
                onClick={() => choose('a')}
                aria-label="Enter Experience A"
              >
                <img src={LOGO_A} alt="Las Vegas Party Bus Rental" />
              </button>

              <button
                className="roadblock-option"
                onClick={() => choose('b')}
                aria-label="Enter Experience B"
              >
                <img src={LOGO_B} alt="Las Vegas Party Bus" />
              </button>
            </div>
          </div>
        </div>
      )}

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

