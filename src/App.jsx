import React from "react";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#111827",
        lineHeight: 1.6,
      }}
    >
      <nav style={styles.nav}>
        <h2 style={styles.logo}>SSR App</h2>
        <ul style={styles.menu}>
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>Features</a>
          </li>
          <li>
            <a href='#'>About</a>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Welcome to SSR React 19 App!</h1>
        <p>This is a simple server-side rendered React application.</p>
      </main>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "#1e293b",
    color: "#fff",
  },
  logo: { margin: 0 },
  menu: {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  },
};
