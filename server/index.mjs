import Fastify from "fastify";

import cors from "@fastify/cors";

const server = Fastify({ logger: true });

// enable CORS (for dev React client)
await server.register(cors, {
  origin: "http://localhost:5173",
});

// health check route
server.get("/health", async () => {
  return { status: "ok", uptime: process.uptime() };
});

// simple hello route
server.get("/api/hello", async () => {
  return { message: "Hello from Fastify 🚀" };
});

// root route (will later render SSR React page)
server.get("/", async () => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <title>Fastify + React 19 SSR</title>
      </head>
      <body>
        <h1>Fastify server is running ✅</h1>
        <p>SSR integration coming in the next step...</p>
      </body>
    </html>
  `;
});

// start server
const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log("🚀 Server running at http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
