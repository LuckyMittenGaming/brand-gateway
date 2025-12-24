import { useEffect, useRef, useState } from 'react';

/* Placeholder imagery – swap later */
const PROJECTS = [
  {
    id: 1,
    title: 'Vegas Nights',
    subtitle: 'Luxury Party Bus',
    image:
      'https://lasvegaspartybuses.com/wp-content/uploads/2025/12/party-bus-logo.png',
    depth: -0.15,
  },
  {
    id: 2,
    title: 'VIP Transport',
    subtitle: 'Events & Weddings',
    image:
      'https://lasvegaspartybuses.com/wp-content/uploads/2022/08/Las-Vegas-Party-Bus-Logo.png',
    depth: -0.08,
  },
  {
    id: 3,
    title: 'After Dark',
    subtitle: 'Nightlife Experiences',
    image:
      'https://lasvegaspartybuses.com/wp-content/uploads/2025/12/party-bus-logo.png',
    depth: -0.12,
  },
];

export default function InternalProjects() {
  const shellRef = useRef(null);
  const listRef = useRef(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const rafRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  /* Duplicate list once for seamless loop */
  const loopItems = [...PROJECTS, ...PROJECTS];

  useEffect(() => {
    const shell = shellRef.current;
    const list = listRef.current;
    if (!shell || !list) return;

    const loopHeight = list.scrollHeight / 2;

    /* Start in middle of loop */
    shell.scrollTop = loopHeight;
    targetScroll.current = loopHeight;
    currentScroll.current = loopHeight;

    const onWheel = (e) => {
      e.preventDefault();
      targetScroll.current += e.deltaY;
    };

    const animate = () => {
      currentScroll.current +=
        (targetScroll.current - currentScroll.current) * 0.085;

      /* Seamless loop reset */
      if (currentScroll.current <= 0) {
        currentScroll.current += loopHeight;
        targetScroll.current += loopHeight;
      }

      if (currentScroll.current >= loopHeight * 2) {
        currentScroll.current -= loopHeight;
        targetScroll.current -= loopHeight;
      }

      shell.scrollTop = currentScroll.current;

      /* Parallax depth */
      const cards = list.querySelectorAll('[data-depth]');
      cards.forEach((card) => {
        const depth = parseFloat(card.dataset.depth);
        card.style.transform = `translateY(${currentScroll.current * depth}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    shell.addEventListener('wheel', onWheel, { passive: false });
    rafRef.current = requestAnimationFrame(animate);

    setTimeout(() => setRevealed(true), 150);

    return () => {
      shell.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
  <section
    className="bunka-shell"
    ref={shellRef}
    style={{ background: 'red' }}
  >
      <ul className="bunka-list" ref={listRef}>
        {loopItems.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className={`bunka-card ${revealed ? 'reveal' : ''}`}
            data-depth={item.depth}
            style={{ transitionDelay: `${index * 90}ms` }}
          >
            <div className="bunka-media">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="bunka-overlay">
              <span className="bunka-index">
                {String((index % PROJECTS.length) + 1).padStart(2, '0')}
              </span>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
