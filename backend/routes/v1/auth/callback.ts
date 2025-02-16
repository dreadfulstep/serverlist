import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";
import "dotenv/config";

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } = process.env;

export default async function authCallbackRouteV1(fastify: FastifyInstance) {
  fastify.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
    const { code } = req.query as { code?: string };

    if (!code) {
      return reply.status(400).send({ error: "Missing authorization code" });
    }

    try {
      const tokenResponse = await axios.post("https://discord.com/api/oauth2/token", new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type: "authorization_code",
        code,
        redirect_uri: DISCORD_REDIRECT_URI!,
      }).toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const accessToken = tokenResponse.data.access_token;

      const userResponse = await axios.get("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const entitlementsResponse = await axios.get("https://discord.com/api/v10/applications/1289309667033485403/entitlements", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return reply.send({
        info: userResponse.data,
        email: userResponse.data.email,
        entitlements: entitlementsResponse.data,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error("Error exchanging token:", error);
      } else {
        throw new Error("Error exchanging token:", error as any);
      }
    }
  });
}
