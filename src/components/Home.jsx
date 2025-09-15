import { useEffect, useState } from "react";

export default function Home() {
  const [apiMessage, setApiMessage] = useState("Loading...");
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message))
      .catch(() => setApiMessage("Failed to fetch API ❌"));
  }, []);

  return (
    <section style={styles.home}>
      <h1>Welcome to the React 19 + Fastify App</h1>
      <p>This is the Home page.</p>
      <h3>Message from Fastify API:</h3>
      <p style={styles.api}>{apiMessage}</p>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <p>Click the button to see React hydration in action!</p>
    </section>
  );
}

const styles = {
  home: { padding: "2rem", textAlign: "center" },
  api: { fontWeight: "bold", color: "#2563eb" },
};
