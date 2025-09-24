// components/ClientOnly.jsx
import { useEffect, useState } from "react";

export default function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return fallback; // render same HTML on server & initial client
  return children;
}
