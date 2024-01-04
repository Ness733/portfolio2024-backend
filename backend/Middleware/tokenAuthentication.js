import jwt from "jsonwebtoken";

export default function tokenAuthentication(req, res, next) {
	const headerAuthorization = req.headers["authorization"];
	const token = headerAuthorization.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "Token not found" });
	}

	let payload = null;

	try {
		payload = jwt.verify(token, process.env.SECRET_KEY);
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}

	if (Date.now() > payload.exp) {
		return res.status(401).json({ message: "Expired token" });
	}

	req.user = payload.sub;
	req.username = payload.username;

	next();
}
