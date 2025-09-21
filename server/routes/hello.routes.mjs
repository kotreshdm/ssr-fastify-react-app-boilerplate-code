import { helloController } from "../controllers/hello.controller.mjs";

export async function helloRoutes(server) {
  server.get("/hello", helloController);
}
