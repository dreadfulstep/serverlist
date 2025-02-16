import './instrument';

import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jsonMiddleware from './middlewares/jsonMiddleware';
import Sentry from '@sentry/node';

import router from "./routes";

import 'dotenv/config';

const { PORT, HOST } = process.env;

const fastify: FastifyInstance = Fastify({});

Sentry.setupFastifyErrorHandler(fastify);

jsonMiddleware(fastify);

fastify.register(router);

fastify.setNotFoundHandler((req, reply) => {
  reply.status(404).send({
    statusCode: 404,
    message: "Not Found",
  });
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
