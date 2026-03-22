import API from "./api.js";

export const register = async (name, email, password) => {
  const res = await API.post("/auth/register", { name, email, password });
  return res.data.data;
};

export const emailLogin = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data.data;
};

export const googleLogin = async (credential) => {
  const res = await API.post("/auth/google", { credential });
  return res.data.data;
};

export const getMe = async () => {
  const res = await API.get("/auth/me");
  return res.data.data;
};

export const logout = async () => {
  await API.post("/auth/logout");
};