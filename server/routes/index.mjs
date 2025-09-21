import { authRoutes } from "./authRouter.mjs";
import { helloRoutes } from "./hello.routes.mjs";

export async function registerRoutes(server) {
  await helloRoutes(server);
  await authRoutes(server);
}
