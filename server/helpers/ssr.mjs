import fastifyStatic from "@fastify/static";
import fs from "fs";
import path from "path";
import { injectAppHtml, loadTemplate } from "./template.mjs";
// --- SSR setup ---
export async function setupSSR(server, isProd, __dirname) {
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
        const url = req.url;

        let template, render;
        if (!isProd) {
          const vite = await import("vite");
          const viteServer = await vite.createServer({
            server: { middlewareMode: true },
          });
          template = fs.readFileSync(path.resolve("index.html"), "utf-8");
          template = await viteServer.transformIndexHtml(url, template);
          render = (await viteServer.ssrLoadModule("src/entry-server.jsx"))
            .render;
        } else {
          template = fs.readFileSync(
            path.resolve("dist/client/index.html"),
            "utf-8"
          );
          render = (await import("../dist/server/entry-server.js")).render;
        }

        const appHtml = await render(url);

        const html = template.replace(`<!--app-html-->`, appHtml);

        reply.type("text/html").send(html);
      } catch (e) {
        reply.status(500).send(e.stack);
      }
    });
  } else {
    // PROD mode
    const clientDist = path.resolve(__dirname, "../dist/client");
    const ssrDist = path.resolve(__dirname, "../dist/server/entry-server.js");

    if (!fs.existsSync(ssrDist)) {
      throw new Error("SSR build missing. Run npm run build.");
    }

    // Serve static assets with /assets prefix to avoid route conflicts
    await server.register(fastifyStatic, {
      root: path.join(clientDist, "assets"),
      prefix: "/assets/",
      decorateReply: false,
    });

    // Serve favicon and other static files from root
    server.get("/favicon.ico", async (req, reply) => {
      const faviconPath = path.join(clientDist, "favicon.ico");
      if (fs.existsSync(faviconPath)) {
        return reply.sendFile("favicon.ico", clientDist);
      }
      return reply.code(404).send("Not Found");
    });

    // Load the SSR render function
    const { render } = await import(`file://${ssrDist}`);

    // Read the index.html template once at startup
    const template = loadTemplate(path.join(clientDist, "index.html"));

    // SSR handler for all other routes
    server.get("/*", async (req, reply) => {
      try {
        const url = req.raw.url;

        // Skip SSR for asset requests (backup check)
        if (url.startsWith("/assets/")) {
          return reply.code(404).send("Not Found");
        }

        const appHtml = await render(url);
        reply.type("text/html").send(injectAppHtml(template, appHtml));
      } catch (error) {
        server.log.error(error);
        reply.status(500).send("Internal Server Error");
      }
    });
  }
}
