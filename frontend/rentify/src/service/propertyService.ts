import api from './axiosConfig';

// Crear una nueva propiedad
export const createProperty = async (propertyData: any) => {
  try {
    const response = await api.post('/properties', propertyData);
    return response.data;
  } catch (error) {
    console.error('Error creando propiedad', error);
    throw error;
  }
};

// Obtener todas las propiedades
export const getAllProperties = async () => {
  try {
    const response = await api.get('/properties');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo propiedades', error);
    throw error;
  }
};

// Obtener una propiedad por ID
export const getPropertyById = async (id: number) => {
  try {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo la propiedad', error);
    throw error;
  }
};

// Actualizar una propiedad por ID
export const updateProperty = async (id: number, propertyData: any) => {
  try {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando propiedad', error);
    throw error;
  }
};

// Eliminar una propiedad por ID
export const deleteProperty = async (id: number) => {
  try {
    await api.delete(`/properties/${id}`);
  } catch (error) {
    console.error('Error eliminando propiedad', error);
    throw error;
  }
};
