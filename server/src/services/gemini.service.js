import { generateContent } from "../config/gemini.config.js";

const parseGeminiError = (error) => {
  try {
    return JSON.parse(error.message)?.error;
  } catch {
    return null;
  }
};

const createGeminiError = (error) => {
  const geminiError = parseGeminiError(error);
  const statusCode = geminiError?.code || error.statusCode || error.status || 502;
  const message =
    statusCode === 429
      ? "Gemini API quota is exhausted. Please wait a minute and try again."
      : statusCode === 503 || statusCode === 504
        ? "Gemini is temporarily busy. Please try again in a moment."
        : `Gemini AI error: ${geminiError?.message || error.message}`;

  const wrappedError = new Error(message);
  wrappedError.statusCode = statusCode === 429 ? 429 : statusCode === 503 || statusCode === 504 ? 503 : 502;
  return wrappedError;
};

export const askGemini = async (prompt, config) => {
  try {
    const response = await generateContent(prompt, config);
    if (!response) throw new Error("Gemini returned an empty response");
    return response;
  } catch (error) {
    throw createGeminiError(error);
  }
};
