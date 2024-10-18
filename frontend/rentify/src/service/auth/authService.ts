import axios from "axios";
import { getCookie } from "../cookies/cookiesService";

const backend = axios.create({
  baseURL: "https://s18-23-n-java-react.onrender.com/api/v1",
  withCredentials: true,
});

const authHeaders = () => {
  const userCookie = getCookie("user");
  const token = userCookie.token || "";
  return { Authorization: `Bearer ${token}` };
};

export const authLogin = async (email: string, password: string) => {
  try {
    const response = await backend.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.data;
    console.log(error);
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
    console.log(error);
  }
};
