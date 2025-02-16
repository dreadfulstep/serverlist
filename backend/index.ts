import './instrument';

import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import jsonMiddleware from './middlewares/jsonMiddleware';
import Sentry from '@sentry/node';
import { PostHog } from 'posthog-node';

import 'dotenv/config';

const { POSTHOG_API_KEY, POSTHOG_HOST, PORT, HOST } = process.env;

const posthog = new PostHog(POSTHOG_API_KEY || '', {
  host: POSTHOG_HOST || 'https://app.posthog.com',
});

const fastify: FastifyInstance = Fastify({});

Sentry.setupFastifyErrorHandler(fastify);

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
