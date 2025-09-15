export default function Features() {
  const features = [
    "Fastify backend 🚀",
    "React 19 hydration 💧",
    "rendering ⚡",
    "API integration 🔗",
  ];

  return (
    <section style={styles.container}>
      <h3>Features</h3>
      <ul>
        {features.map((f, idx) => (
          <li key={idx}>{f}</li>
        ))}
      </ul>
    </section>
  );
}

const styles = {
  container: {
    padding: "2rem",
    background: "#f9fafb",
    borderRadius: "8px",
    marginTop: "2rem",
  },
};
