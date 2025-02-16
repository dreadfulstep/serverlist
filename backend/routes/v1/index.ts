import { FastifyInstance } from "fastify";
import usersRoutes from "./users";

export default async function v1Routes(fastify: FastifyInstance) {
  fastify.register(usersRoutes, { prefix: "/users" });
}
