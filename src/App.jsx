import { useState, useEffect } from 'react';

export default function App() {
  const [view, setView] = useState('roadblock');

  useEffect(() => {
    document.title = 'Brand Gateway';
  }, []);

  return (
    <div className="app">
      <h1>Brand Gateway</h1>
      <p>Roadblock + Sections live here</p>
    </div>
  );
}
