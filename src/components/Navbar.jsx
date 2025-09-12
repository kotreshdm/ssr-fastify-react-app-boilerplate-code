import React from "react";

export default function Navbar() {
  return (
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
