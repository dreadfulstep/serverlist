import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default function jsonMiddleware(fastify: FastifyInstance) {
  fastify.addHook("onSend", async (req: FastifyRequest, reply: FastifyReply, payload: any) => {
    const start = process.hrtime.bigint(); // Start timing in nanoseconds

    reply.header("Content-Type", "application/json");

    const end = process.hrtime.bigint(); // End timing in nanoseconds
    const elapsedNs = end - start; // Calculate elapsed time in nanoseconds

    let formattedTime;
    if (elapsedNs < 1_000n) {
      formattedTime = `${elapsedNs}ns`;
    } else if (elapsedNs < 1_000_000n) {
      formattedTime = `${Number(elapsedNs / 1_000n).toFixed(3)}µs`;
    } else if (elapsedNs < 1_000_000_000n) {
      formattedTime = `${Number(elapsedNs / 1_000_000n).toFixed(3)}ms`;
    } else {
      formattedTime = `${Number(elapsedNs / 1_000_000_000n).toFixed(3)}s`;
    }

    try {
      const body = JSON.parse(payload.toString());

      const { error, ...rest } = body;

      const formattedResponse = {
        ...(error && { error }),
        data: rest,
        passingTime: formattedTime,
      };

      return JSON.stringify(formattedResponse);
    } catch (err) {
      console.error("Error processing response:", err);
      return JSON.stringify({
        success: false,
        error: "INTERNAL_SERVER_ERROR",
        passingTime: formattedTime,
      });
    }
  });
}
