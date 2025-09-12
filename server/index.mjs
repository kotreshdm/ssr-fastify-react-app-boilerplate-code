import Fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fastifyStatic from "@fastify/static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const server = Fastify({ logger: true });

// --- API route ---
server.get("/api/hello", async () => ({
  message: "Hello from Fastify API 🚀",
}));

// --- SSR setup ---
async function setupSSR() {
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const middie = await import("@fastify/middie");
    await server.register(middie.default);

    const vite = await createViteServer({
      server: { middlewareMode: "ssr" },
      appType: "custom",
    });

    server.use(vite.middlewares);

    server.get("/*", async (req, reply) => {
      try {
        const url = req.raw.url;
        const mod = await vite.ssrLoadModule("/src/entry-server.jsx");
        const appHtml = await mod.render(url);

        let template = fs.readFileSync(
          path.resolve(__dirname, "../index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);

        const html = template.replace("<!--app-html-->", appHtml);
        reply.type("text/html").send(html);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        server.log.error(e);
        reply.status(500).send(e.message);
      }
    });
  } else {
    // PROD mode
    const clientDist = path.resolve(__dirname, "../dist/client");
    server.register(fastifyStatic, { root: clientDist, prefix: "/" });

    const ssrDist = path.resolve(__dirname, "../dist/server/entry-server.js");
    if (!fs.existsSync(ssrDist))
      throw new Error("SSR build missing. Run npm run build.");

    const { render } = await import(`file://${ssrDist}`);
    server.get("/*", async (req, reply) => {
      const html = render(req.raw.url);
      reply.type("text/html").send(html);
    });
  }
}

const start = async () => {
  try {
    await setupSSR();
    await server.listen({ port: 3000 });
    console.log("🚀 Server running at http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
