import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jsonMiddleware from './middlewares/jsonMiddleware';
import * as Sentry from '@sentry/node';
import { PostHog } from 'posthog-node';

import 'dotenv/config';

const { SENTRY_DSN, POSTHOG_API_KEY, POSTHOG_HOST, PORT, HOST } = process.env;

Sentry.init({ dsn: SENTRY_DSN });

const posthog = new PostHog(POSTHOG_API_KEY || '', {
  host: POSTHOG_HOST || 'https://app.posthog.com',
});

const fastify: FastifyInstance = Fastify({});

fastify.setErrorHandler((error, req, reply) => {
  Sentry.captureException(error);
  reply.status(500).send({ error: 'Internal Server Error' });
});

fastify.addHook('onResponse', async (req, reply) => {
  posthog.capture({
    distinctId: req.ip || 'anonymous',
    event: 'api_request',
    properties: {
      method: req.method,
      path: req.originalUrl,
      statusCode: reply.statusCode,
    },
  });
});

jsonMiddleware(fastify);

fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: 'Hello, world!' });
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
