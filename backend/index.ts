import './instrument';

import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jsonMiddleware from './middlewares/jsonMiddleware';
import Sentry from '@sentry/node';

import 'dotenv/config';

const { PORT, HOST } = process.env;

const fastify: FastifyInstance = Fastify({});

Sentry.setupFastifyErrorHandler(fastify);

fastify.setErrorHandler((error, req, reply) => {
  reply.status(500).send({
    statusCode: 500,
    message: "Internal Server Error",
  });
});

fastify.get('/error', async () => {
  throw new Error("Sentry error test");
});

jsonMiddleware(fastify);

fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({ info: 'Hello, world!' });
});

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: Number(PORT) || 3000, host: HOST || '0.0.0.0' });
    console.log(`Server listening on http://${HOST || 'localhost'}:${PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
