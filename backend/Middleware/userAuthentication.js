import User from "../Models/User.js";
import jwt from "jsonwebtoken";

export default async function Authentication(req, res) {
	const findUser = req.body.username;
	const password = req.body.password;

	let userFound = "";

	try {
		userFound = await User.findOne({ where: { username: findUser } });

		if (!userFound) {
			return res.status(400).json({ message: "User not found" });
		}

		if (password !== userFound.password) {
			return res.status(400).json({ message: "Wrong password" });
		}
	} catch (error) {
		res.status(400).json({ message: "User not found" });
	}

	const sub = userFound.id;
	const username = userFound.username;

	const token = jwt.sign(
		{
			sub,
			username,
			exp: Date.now() + 60 * 60 * 1000,
		},
		process.env.SECRET_KEY
	);

	res.cookie("jwt", token, { httpOnly: true, secure: true });

	res.status(200).json({
		message: "User authenticated",
		token,
	});
}
