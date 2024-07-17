import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const { BASE_URL, AUDIENCE_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

const authController = {
  async getToken() {
    try {
      const response = await axios.post(`${BASE_URL}/oauth/token`, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        audience: AUDIENCE_URL,
        grant_type: "client_credentials",
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      throw error; 
    }
  },
  async revokeToken() {
    try {
      const response = await axios.post(`${BASE_URL}/oauth/token/revoke`, {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        audience: AUDIENCE_URL,
        grant_type: "client_credentials",
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al remover el token:", error);
      throw error; 
    }
  },
  // revokeToken: async (req, res) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/oauth/token/revoke`, {
  //       client_id: CLIENT_ID,
  //       client_secret: CLIENT_SECRET,
  //       audience: AUDIENCE_URL,
  //       grant_type: "client_credentials",
  //     });
  //     res.status(200).json(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error al remover el token:", error);
  //     res.status(500).send("Error al remover el token");
  //   }
  // },
};
export default authController;
