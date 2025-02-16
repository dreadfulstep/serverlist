"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const jsonMiddleware_1 = __importDefault(require("./middlewares/jsonMiddleware"));
const Sentry = __importStar(require("@sentry/node"));
const posthog_node_1 = require("posthog-node");
require("dotenv/config");
const { SENTRY_DSN, POSTHOG_API_KEY, POSTHOG_HOST, PORT, HOST } = process.env;
Sentry.init({ dsn: SENTRY_DSN });
const posthog = new posthog_node_1.PostHog(POSTHOG_API_KEY || '', {
    host: POSTHOG_HOST || 'https://app.posthog.com',
});
const fastify = (0, fastify_1.default)({});
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
(0, jsonMiddleware_1.default)(fastify);
fastify.get('/', async (req, reply) => {
    reply.send({ message: 'Hello, world!' });
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
