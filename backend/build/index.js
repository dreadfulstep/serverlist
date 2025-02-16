"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./instrument");
const fastify_1 = __importDefault(require("fastify"));
const jsonMiddleware_1 = __importDefault(require("./middlewares/jsonMiddleware"));
const node_1 = __importDefault(require("@sentry/node"));
const posthog_node_1 = require("posthog-node");
require("dotenv/config");
const { POSTHOG_API_KEY, POSTHOG_HOST, PORT, HOST } = process.env;
const posthog = new posthog_node_1.PostHog(POSTHOG_API_KEY || '', {
    host: POSTHOG_HOST || 'https://app.posthog.com',
});
const fastify = (0, fastify_1.default)({});
node_1.default.setupFastifyErrorHandler(fastify);
fastify.setErrorHandler((error, req, reply) => {
    reply.status(500).send({
        statusCode: 500,
        message: "Internal Server Error",
        passingTime: "N/A",
    });
});
fastify.get('/error', async () => {
    throw new Error("Sentry error test");
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
(0, jsonMiddleware_1.default)(fastify);
fastify.get('/', async (req, reply) => {
    reply.send({ info: 'Hello, world!' });
});
const start = async () => {
    try {
        await fastify.listen({ port: Number(PORT) || 3000, host: HOST || '0.0.0.0' });
        console.log(`Server listening on http://${HOST || 'localhost'}:${PORT || 3000}`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
