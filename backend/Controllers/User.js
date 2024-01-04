import User from "../Models/User.js";

export async function getUsers(req, res) {
	try {
		let allProjects = await User.findAll();
		res.status(200).json(allProjects);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function saveUser(req, res) {
	try {
		let newUser = await User.create(req.body);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function editUser(req, res) {
	try {
		let userId = parseInt(req.params.id);
		let user = await User.findByPk(userId);

		if (!user) {
			res.status(204).json({ message: "User not found" });
		}
		await user.update(req.body);
		res.status(200).json(`Updated ${user.name}`);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}

export async function deleteUser(req, res) {
	try {
		let userId = parseInt(req.params.id);
		let user = await User.findByPk(userId);

		if (!user) {
			res.status(204).json({ message: "User not found" });
		}
		await user.destroy();
		res.status(200).json(`Deleted ${user.name}`);
	} catch (error) {
		res.status(204).json({ message: error });
	}
}
