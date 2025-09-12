import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fastify = Fastify();

// ✅ Serve only static assets (not index.html directly)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "../dist/client/assets"),
  prefix: "/assets", // e.g. /assets/index-xxxxx.js
  decorateReply: false,
});

// ✅ SSR handler (catch-all for everything else)
fastify.get("/*", async (req, reply) => {
  try {
    // Load built index.html as template
    const template = fs.readFileSync(
      path.join(__dirname, "../dist/client/index.html"),
      "utf-8"
    );

    // Resolve SSR bundle path and import it safely (Windows fix)
    const entryServerPath = path.resolve(
      process.cwd(),
      "dist/server/entry-server.js"
    );
    const { render } = await import(pathToFileURL(entryServerPath).href);

    // Render React app with SSR
    const appHtml = await render(req.url);

    // Inject SSR HTML into template
    const html = template.replace(
      `<div id="root"></div>`,
      `<div id="root">${appHtml}</div>`
    );

    reply.type("text/html").send(html);
  } catch (err) {
    console.error("SSR Error:", err);
    reply.code(500).send("Internal Server Error");
  }
});

// ✅ Start server
fastify.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 Server running at ${address}`);
});
