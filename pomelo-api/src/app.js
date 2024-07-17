import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import cors from "cors";

dotenv.config();
const {
  BASE_URL,
  API_KEY,
} = process.env;

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
    ],
    credentials: true,
  })
);

app.get("/api/prueba", (req, res) => {
  axios
    .get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud:", error);
      res.status(500).send("Error al hacer la solicitud");
    });
});

app.get("/api", (req, res) => {
  res.send({ message: "Bienvenido a la REST API de Codecma" });
});

app.use("/api/user", routes.usersRouter);
app.use("/api/card", routes.cardIssuanceRouter);

export default app;
