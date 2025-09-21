import Fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const server = Fastify({ logger: true });

// --- API route ---
import { registerRoutes } from "./routes/index.mjs";
import { setupSSR } from "./helpers/ssr.mjs";

const start = async () => {
  try {
    await server.register(
      async (server) => {
        await registerRoutes(server);
      },
      { prefix: "/api/v1" }
    );
    await setupSSR(server, isProd, __dirname);
    await server.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server running at http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
