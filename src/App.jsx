import React from "react";
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div style={styles.app}>
      <Navbar />
      <main style={styles.main}>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    color: "#111827",
    lineHeight: "1.6",
  },
  main: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
  },
};
