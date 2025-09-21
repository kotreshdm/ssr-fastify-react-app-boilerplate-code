import { registeUser } from "../controllers/authController.mjs";

export async function authRoutes(server) {
  server.post("/registeruser", registeUser);
}
