import dotenv from "dotenv";
import axios from "axios";
import authController from "./authController.js";
dotenv.config();
const { BASE_URL } = process.env;

const usersController = {
  createUsers: async (req, res) => {
    try {
      // Obtener el token
      const getToken = await authController.getToken();
      const token = getToken.access_token;
      const userData = req.body;
      const response = await axios.post(`${BASE_URL}/users/v1/`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      await authController.revokeToken(); // Revocar el token
      res.status(201).json(response.data);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(error.response.status).json(error.response.data);
    }
  },
  searchUsers: async (req, res) => {
    try {
      // Obtener el token
      const getToken = await authController.getToken();
      const token = getToken.access_token;
      const response = await axios.get(`${BASE_URL}/users/v1/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      await authController.revokeToken(); // Revocar el token
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error al buscar usuarios:", error);
      res.status(error.response.status).send("Error al buscar usuarios");
    }
  },
  getUser: async (req, res) => {
    try {
      // Obtener el token
      const getToken = await authController.getToken();
      const token = getToken.access_token;
      let url = `${BASE_URL}/users/v1/?`; // URL base para obtener el usuario
      // Construir la URL con los filtros
      for (const [key, value] of Object.entries(req.query)) {
        url += `filter[${key}]=${value}&`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      await authController.revokeToken(); // Revocar el token
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      res
        .status(error.response?.status || 500)
        .send("Error al obtener el usuario");
    }
  },
  updateUser: async (req, res) => {
    try {
      // Obtener el token
      const getToken = await authController.getToken();
      const token = getToken.access_token;
      const userId = req.params.id; // ID del usuario obtenido de los parámetros de la ruta
      let userData = { ...req.body, status_reason: 'CLIENT_INTERNAL_REASON' }; // Datos del usuario para actualizar
      const url = `${BASE_URL}/users/v1/${userId}`; // URL con el ID del usuario
      const response = await axios.patch(url, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      await authController.revokeToken(); // Revocar el token
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res
        .status(error.response?.status || 500)
        .send("Error al actualizar el usuario");
    }
  },
};

export default usersController;
