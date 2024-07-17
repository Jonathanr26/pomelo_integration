import dotenv from "dotenv";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import authController from "./authController.js";
dotenv.config();
const { BASE_URL, AFFINITY_GROUP_ID } = process.env;

const cardIssuanceController = {
  createCard: async (req, res) => {
    try {
      // Obtener el token
      const getToken = await authController.getToken();
      const token = getToken.access_token;
      const userId = req.params.id; // ID del usuario obtenido de los parámetros de la ruta
      const cardData = {  user_id: userId,  affinity_group_id: AFFINITY_GROUP_ID, ...req.body };;
      const idempotencyKey = uuidv4();
      const response = await axios.post(`${BASE_URL}/cards/v1/`, cardData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-idempotency-key": idempotencyKey,
          "Content-Type": "application/json",
        },
      });
      await authController.revokeToken(); // Revocar el token
      res.status(201).json(response.data);
    } catch (error) {
      console.error("Error al crear la tarjeta:", error);
      res.status(error.response?.status).json(error.response?.data);
    }
  },
  searchCards: async (req, res) => {
    try {
      // Obtener el token
      const getToken = await authController.getToken();
      const token = getToken.access_token;
      const queryParams = req.query; // Los parámetros de consulta provienen de req.query
      const url = `${BASE_URL}/cards/v1/?${new URLSearchParams(queryParams).toString()}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      await authController.revokeToken();
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error al buscar tarjetas:", error);
      res.status(error.response?.status || 500).send("Error al buscar tarjetas");
    }
  },
  getCard: async (req, res) => {
    try {
      // Obtener el token
      const getToken = await authController.getToken();
      const token = getToken.access_token;
      let url = `${BASE_URL}/cards/v1/?`; // URL base
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
  updateCard: async (req, res) => {
    // Obtener el token
    const getToken = await authController.getToken();
    const token = getToken.access_token;
    const cardId = req.params.id;
    let cardData = { affinity_group_id: AFFINITY_GROUP_ID, status_reason: 'CLIENT_INTERNAL_REASON', ...req.body }; // Datos de la tarjeta
    const url = `${process.env.BASE_URL}/cards/v1/${cardId}`;
    try {
      const response = await axios.patch(url, cardData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      await authController.revokeToken(); // Revocar el token
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error al actualizar la tarjeta:', error);
      res.status(error.response.status).json(error.response.data);
    }
  },
};

export default cardIssuanceController;
