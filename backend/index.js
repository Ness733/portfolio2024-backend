import express from "express";
import DB from "./DB/connection.js";
import Authentication from "./Middleware/userAuthentication.js";
import cors from "cors";

import projectRouter from "./Routes/ProjectRoutes.js";
import userRouter from "./Routes/UsersRoutes.js";
import helmet from "helmet";

const port = process.env.PORT;
const host = process.env.HOST;

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
	res.header(
		"Access-Control-Allow-Origin",
		"https://nrdev.online",
		"http://localhost:3000",
		"https://rosalesnestor-dev.vercel.app",
		"http://192.168.1.101:3000/"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

	next();
});

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
	res.json("Hello World");
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

app.listen(port, () => {
	console.log(`Servidor escuchando en http://${host}:${port}`);
});
