const { useState, useEffect } = React;

function App() {
  return (
    <div className="app">
      <h1>Brand Gateway</h1>
      <p>Roadblock + Sections live here</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  React.createElement(React.StrictMode, null, React.createElement(App))
);
