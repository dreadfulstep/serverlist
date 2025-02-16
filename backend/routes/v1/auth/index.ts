import { FastifyInstance } from "fastify";
import "dotenv/config";
import authCallbackRouteV1 from "./callback";

const { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } = process.env;

const scopes = "identify email applications.entitlements";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.get("/", async (req, reply) => {
    const discordAuthURL = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(DISCORD_REDIRECT_URI!)}&response_type=code&scope=${encodeURIComponent(scopes)}`;
    reply.redirect(discordAuthURL);
  });
  fastify.register(authCallbackRouteV1, { prefix: "/callback" });
}
