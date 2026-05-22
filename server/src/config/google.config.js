import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (credential) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    const error = new Error("Google login is not configured on the server.");
    error.statusCode = 500;
    throw error;
  }

  let ticket;
  try {
    ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  } catch {
    const error = new Error("Google login failed. Check that the Google client ID matches on the client and server.");
    error.statusCode = 401;
    throw error;
  }

  const payload = ticket.getPayload();
  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
};
