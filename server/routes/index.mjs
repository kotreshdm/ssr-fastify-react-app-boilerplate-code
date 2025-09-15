import { helloRoutes } from "./hello.routes.mjs";
// import { userRoutes } from "./user.routes.mjs"; // future routes

export async function registerRoutes(server) {
  await helloRoutes(server);
  // await userRoutes(server);
}
