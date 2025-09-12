import React from "react";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} SSR React + Fastify App</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "2rem",
    padding: "1rem",
    background: "#1e293b",
    color: "#fff",
    textAlign: "center",
  },
};
