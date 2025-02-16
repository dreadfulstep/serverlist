const accessToken = "NLKiCCUuIENCDwjVMOKOlPFP4C4ywB";

import axios from "axios";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } = process.env;

const prisma = new PrismaClient();

/**
 * Exchange an authorization code for an access token.
 */
export async function getAccessToken(code: string) {
  try {
    const response = await axios.post(
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

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;


      // Handle specific error cases
      switch (status) {
        case 400:
          if (data.error === "invalid_request") {
            throw new Error("Invalid request. Ensure all parameters are correct.");
          }
          if (data.error === "invalid_grant") {
            throw new Error("Invalid or expired authorization code.");
          }
          if (data.error === "unsupported_grant_type") {
            throw new Error("Invalid grant type. Expected 'authorization_code'.");
          }
          break;

        case 401:
          if (data.error === "invalid_client") {
            throw new Error("Invalid client credentials. Check client ID and secret.");
          }
          break;

        case 429:
          throw new Error("Rate limited. Too many requests, please try again later.");

        case 500:
        case 502:
        case 503:
        case 504:
          throw new Error("Discord API is experiencing issues. Try again later.");

        default:
          throw new Error(`Unexpected error from Discord: ${status} ${data.error}`);
      }
    }

    throw new Error("Failed to obtain access token.");
  }
}

/**
 * Refresh the access token using a refresh token.
 */
export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to refresh access token.");
  }
}

/**
 * Fetch user details from Discord.
 */
export async function getUser(accessToken: string) {
  try {
    const response = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Discord user.");
  }
}

/**
 * Fetch entitlements from Discord.
 */
export async function getEntitlements(accessToken: string) {
  try {
    const response = await axios.get(`https://discord.com/api/v10/applications/${DISCORD_CLIENT_ID}/entitlements`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Discord entitlements.");
  }
}

/**
 * Handles automatic token refresh if access token is expired.
 */
export async function ensureValidAccessToken(userId: number, accessToken: string, refreshToken: string) {
  try {
    await getUser(accessToken);
    return accessToken;
  } catch {
    console.log("Access token expired, refreshing...");
    const newTokenData = await refreshAccessToken(refreshToken);

    await prisma.session.updateMany({
      where: { userId },
      data: {
        accessToken: newTokenData.access_token,
        refreshToken: newTokenData.refresh_token,
        expiresAt: new Date(Date.now() + newTokenData.expires_in * 1000),
      },
    });

    return newTokenData.access_token;
  }
}
