import axios from 'axios';

const API_BASE_URL = 'https://s18-23-n-java-react.onrender.com/api/v1';


export const getProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    throw error;
  }
};


export const getPropertyById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la propiedad con ID ${id}:`, error);
    throw error;
  }
};
