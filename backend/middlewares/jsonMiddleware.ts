import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default function jsonMiddleware(fastify: FastifyInstance) {
  fastify.addHook("onSend", async (req: FastifyRequest, reply: FastifyReply, payload: any) => {
    const start = process.hrtime.bigint();

    reply.header("Content-Type", "application/json");

    const end = process.hrtime.bigint();
    const elapsedNs = end - start;

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

      const { statusCode = reply.statusCode, error, message, ...rest } = body;

      const formattedResponse = {
        statusCode,
        ...(error && { message: error }),
        ...(message && !error && { message }),
        data: Object.keys(rest).length ? rest : undefined,
        passingTime: formattedTime,
      };

      return JSON.stringify(formattedResponse);
    } catch (err) {
      console.error("Error processing response:", err);
      return JSON.stringify({
        statusCode: 500,
        message: "INTERNAL_SERVER_ERROR",
        passingTime: formattedTime,
      });
    }
  });
}
