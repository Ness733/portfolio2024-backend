import express from "express";
import DB from "./DB/connection.js";
import Authentication from "./Middleware/userAuthentication.js";
import cors from "cors";

import projectRouter from "./Routes/ProjectRoutes.js";
import userRouter from "./Routes/UsersRoutes.js";

const API = process.env.VITE_API_ENDPOINT;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).send("Conexión exitosa");
});

// Routes
app.use("/", projectRouter);
app.use("/", userRouter);

// Middleware
app.post("/login", Authentication);

// Server
try {
	await DB.authenticate();
	console.log("-- Conexión establecida --");
} catch (error) {
	console.log("Algo salió mal", error);
}

app.listen(3000, () => {
	console.log(`Servidor escuchando en ${API}`);
});
