import { FastifyInstance } from "fastify";
import v1Routes from "./v1";

export default async function router(fastify: FastifyInstance) {
  fastify.register(v1Routes, { prefix: "/api/v1" });
}
