import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function usersRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ users: [{ id: 1, name: "John Doe" }] });
  });

  fastify.get("/:id", async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as { id: string };
    return reply.send({ user: { id, name: "John Doe" } });
  });

  fastify.post("/", async (req: FastifyRequest, reply: FastifyReply) => {
    const { name } = req.body as { name: string };
    return reply.status(201).send({ message: "User created", user: { id: 2, name } });
  });
}
