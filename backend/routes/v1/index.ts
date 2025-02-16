import { FastifyInstance } from "fastify";
import authRoutes from "./auth";

export default async function v1Routes(fastify: FastifyInstance) {
  fastify.register(authRoutes, { prefix: "/auth" });
}
