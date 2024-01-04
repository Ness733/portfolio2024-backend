import express from "express";
import DB from "./DB/connection.js";
import Authentication from "./Middleware/userAuthentication.js";
import cors from "cors";
import path from "path";

import projectRouter from "./Routes/ProjectRoutes.js";
import userRouter from "./Routes/UsersRoutes.js";
import helmet from "helmet";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API = process.env.VITE_API_ENDPOINT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist/")));
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				fontSrc: ["'self'", "https://fonts.gstatic.com"],
			},
		},
		crossOriginOpenerPolicy: {
			policy: "same-origin",
		},
	})
);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Routes
app.use("/api", projectRouter);
app.use("/api", userRouter);

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
