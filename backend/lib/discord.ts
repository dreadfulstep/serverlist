import axios from "axios";
import { StatusMessage } from "../types";
import "dotenv/config";

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } = process.env;

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
      const message = StatusMessage[status] || `Unexpected error from Discord (${status})`;

      return { statusCode: status, message: `${message}: ${JSON.stringify(data)}` };
    }

    return { statusCode: 500, message: "Failed to obtain access token. Unknown error occurred." };
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
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      const message = StatusMessage[status] || `Unexpected error while refreshing token (${status})`;

      return { statusCode: status, message: `${message}: ${JSON.stringify(data)}` };
    }

    return { statusCode: 500, message: "Failed to refresh access token. Unknown error occurred." };
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
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      const message = StatusMessage[status] || `Unexpected error (${status})`;

      return { statusCode: status, message: `${message}: ${JSON.stringify(data)}` };
    }

    return { statusCode: 500, message: "Failed to fetch Discord user. Unknown error occurred." };
  }
}

/**
 * Fetch entitlements from Discord.
 */
export async function getEntitlements(accessToken: string) {
  try {
    const response = await axios.get(`https://discord.com/api/v10/applications/${process.env.DISCORD_CLIENT_ID}/entitlements`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      const message = StatusMessage[status] || `Unexpected error (${status})`;

      return { statusCode: status, message: `${message}: ${JSON.stringify(data)}` };
    }

    return { statusCode: 500, message: "Failed to fetch Discord entitlements. Unknown error occurred." };
  }
}

/**
 * Revoke an access or refresh token.
 */
export async function revokeAccessToken(token: string) {
  try {
    const response = await axios.post(
      "https://discord.com/api/oauth2/revoke",
      new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        token: token,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    // Return the response if successful
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      const message = StatusMessage[status] || `Unexpected error while revoking token (${status})`;

      return { statusCode: status, message: `${message}: ${JSON.stringify(data)}` };
    }

    return { statusCode: 500, message: "Failed to revoke access token. Unknown error occurred." };
  }
}
