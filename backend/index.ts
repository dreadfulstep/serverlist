import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import path from 'path';

const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req: FastifyRequest, body: string, done: Function) => {
  try {
    const parsed: Record<string, any> = JSON.parse(body);
    done(null, parsed);
  } catch (err) {
    done(err, undefined);
  }
});

fastify.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({ message: 'Hello, world!' });
})

const start = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
