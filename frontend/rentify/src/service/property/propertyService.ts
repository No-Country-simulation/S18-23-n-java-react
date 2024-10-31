import { isAxiosError } from "axios";
import { authHeaders, backend } from "../auth/authService";
import { Property } from "../../interfaces/Property";

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

export const getPropertyById = async (id: string) => {
  try {
    const response = await backend.get(`/properties/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const getOwnerById = async (id: number) => {
  try {
    const response = await backend.get(`/user-profile/${id}`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};

export const createProperty = async (property: Property) => {
  try {
    const response = await backend.post(`/properties`, property,  {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data;
    }
  }
};