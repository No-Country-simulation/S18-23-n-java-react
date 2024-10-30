import { isAxiosError } from "axios";
import { authHeaders, backend } from "../auth/authService";

export const getAllProperties = async (params: string) => {
  try {
    const response = await backend.get(`/properties?${params}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};
