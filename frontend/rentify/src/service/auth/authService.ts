import axios, { isAxiosError } from "axios";
import { getCookie } from "../cookies/cookiesService";

export const backend = axios.create({
  baseURL: "https://s18-23-n-java-react.onrender.com/api/v1",
  withCredentials: true,
});

export const authHeaders = () => {
  const userCookie = getCookie("user");
  const token = userCookie?.token || "";
  return { Authorization: `Bearer ${token}` };
};

export const authLogin = async (email: string, password: string) => {
  try {
    const response = await backend.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
  }
};

export const authLogout = async () => {
  try {
    const response = await backend.post(
      "/auth/logout",
      {},
      { headers: authHeaders() }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
  }
};

export const authRecoveryPassword = async (email: string) => {
  try {
    const response = await backend.post("/auth/recovery-password", { email });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
  }
};

export const getUserAuth = async () => {
  try {
    const response = await backend.get(`/user-profile`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};