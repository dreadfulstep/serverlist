"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./instrument");
const fastify_1 = __importDefault(require("fastify"));
const jsonMiddleware_1 = __importDefault(require("./middlewares/jsonMiddleware"));
const node_1 = __importDefault(require("@sentry/node"));
const routes_1 = __importDefault(require("./routes"));
require("dotenv/config");
const { PORT, HOST } = process.env;
const fastify = (0, fastify_1.default)({});
node_1.default.setupFastifyErrorHandler(fastify);
fastify.setErrorHandler((error, req, reply) => {
    reply.status(500).send({
        statusCode: 500,
        message: "Internal Server Error",
    });
});
fastify.get('/error', async () => {
    throw new Error("Sentry error test");
});
(0, jsonMiddleware_1.default)(fastify);
fastify.register(routes_1.default);
fastify.setNotFoundHandler((req, reply) => {
    reply.status(404).send({
        statusCode: 404,
        message: "Not Found",
    });
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
