import api from './axiosConfig';

export const getProfesores = async () => {
  try {
    const response = await api.get('/profesores');
    return response.data;
  } catch (error) {
    console.error('Error obteniendo profesores:', error);
    throw error;
  }
};

export const createProfesor = async (profesor) => {
  try {
    const response = await api.post('/profesores', profesor);
    return response.data;
  } catch (error) {
    console.error('Error creando profesor:', error);
    throw error;
  }
};
