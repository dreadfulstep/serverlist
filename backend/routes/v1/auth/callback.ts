import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";
import crypto from "crypto";
import "dotenv/config";
import prisma from "../../../lib/db";
import redisClient from "../../../lib/redis";

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI, REDIS_URL } = process.env;

export default async function authCallbackRouteV1(fastify: FastifyInstance) {
  fastify.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    const { code } = req.query as { code?: string };

    if (!code) {
      return reply.status(400).send({ error: "Missing authorization code" });
    }

    try {
      const tokenResponse = await axios.post(
        "https://discord.com/api/oauth2/token",
        new URLSearchParams({
          client_id: DISCORD_CLIENT_ID!,
          client_secret: DISCORD_CLIENT_SECRET!,
          grant_type: "authorization_code",
          code,
          redirect_uri: DISCORD_REDIRECT_URI!,
        }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const { access_token, refresh_token, expires_in } = tokenResponse.data;

      // Get user info
      const userResponse = await axios.get("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const { id: discordId } = userResponse.data;

      // Get entitlements
      const entitlementsResponse = await axios.get(
        `https://discord.com/api/v10/applications/${DISCORD_CLIENT_ID}/entitlements`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      let user = await prisma.user.findUnique({ where: { discordId: discordId } });

      if (!user) {
        user = await prisma.user.create({
          data: { discordId },
        });
      }

      const sessionToken = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + expires_in * 1000);

      await prisma.session.create({
        data: {
          userId: user.id,
          accessToken: access_token,
          refreshToken: refresh_token,
          sessionToken,
          expiresAt,
        },
      });

      await redisClient.setEx(`session:${sessionToken}`, expires_in, JSON.stringify({
        userId: user.id,
        accessToken: access_token,
      }));

      return reply.send({
        sessionToken,
        accessToken: access_token,
        user: {
          id: user.id,
        },
      });

    } catch (error) {
      console.error("OAuth error:", error);
      return reply.status(500).send({ error: "OAuth authentication failed" });
    }
  });
}
