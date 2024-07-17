import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Reemplaza con tu URL de API real

export const createUsers = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/create-user`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

export const createCard = async (cardData, user_id) => {
  try {
    const response = await axios.post(`${BASE_URL}/card/create-card/${user_id}`, cardData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
  }
};

export const getUserID = async (emailUser) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/get-user/?email=${emailUser}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    throw error;
  }
}
