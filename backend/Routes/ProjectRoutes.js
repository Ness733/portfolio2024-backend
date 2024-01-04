import express from "express";
import tokenAuthentication from "../Middleware/tokenAuthentication.js";

const projectRouter = express.Router();

import {
	getProjects,
	getOneProject,
	saveProject,
	editProject,
	deleteProject,
} from "../Controllers/Projects.js";

projectRouter.get("/projects", getProjects);
projectRouter.get("/projects/:id", tokenAuthentication, getOneProject);
projectRouter.post("/projects", tokenAuthentication, saveProject);
projectRouter.patch("/projects/:id", tokenAuthentication, editProject);
projectRouter.delete("/projects/:id", tokenAuthentication, deleteProject);

export default projectRouter;
