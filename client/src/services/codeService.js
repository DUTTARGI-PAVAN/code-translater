import API from "./api.js";

export const translateCode = async (code, sourceLanguage, targetLanguage) => {
  const res = await API.post("/code/translate", { code, sourceLanguage, targetLanguage });
  return res.data.data;
};

export const analyzeComplexity = async (code, language) => {
  const res = await API.post("/code/analyze", { code, language });
  return res.data.data;
};

export const optimizeCode = async (code, language) => {
  const res = await API.post("/code/optimize", { code, language });
  return res.data.data;
};

export const explainCode = async (code, language) => {
  const res = await API.post("/code/explain", { code, language });
  return res.data.data;
};