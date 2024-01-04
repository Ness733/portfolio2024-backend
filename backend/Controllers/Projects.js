import Project from "../Models/Projects.js";

export async function getProjects(req, res) {
	if (Date.now() > req.exp) {
		return res.status(401).json({ message: "Expired token" });
	}

	try {
		let allProjects = await Project.findAll();
		res.header("Access-Control-Allow-Origin", "*");
		res.status(200).json(allProjects);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function getOneProject(req, res) {
	try {
		let projectId = parseInt(req.params.id);
		let project = await Project.findByPk(projectId);

		if (!project) {
			return res.status(204).json({ message: "Project not found" });
		}
		res.header("Access-Control-Allow-Origin", "*");
		res.status(200).json(project);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function saveProject(req, res) {
	try {
		let newProject = new Project(req.body);
		await newProject.save();
		res.status(201).json(`Saved ${newProject.title}`);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function editProject(req, res) {
	if (Date.now() > req.exp) {
		return res.status(401).json({ message: "Expired token" });
	}

	try {
		let projectId = parseInt(req.params.id);
		let project = await Project.findByPk(projectId);

		if (!project) {
			return res.status(204).json({ message: "Project not found" });
		}

		await project.update(req.body);

		res.status(200).json(
			`Updated Project with ID: ${project.dataValues.id}`
		);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function deleteProject(req, res) {
	try {
		let projectId = parseInt(req.params.id);
		let project = await Project.findByPk(projectId);

		if (!project) {
			return res.status(204).json({ message: "Project not found" });
		}

		await project.destroy();
		res.status(200).json(`Deleted ${project.title}`);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
