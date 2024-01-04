import db from "../DB/connection.js";
import { DataTypes } from "sequelize";

const User = db.define(
	"User",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		username: { type: DataTypes.STRING },
		password: { type: DataTypes.STRING },
	},
	{
		tableName: "public.User",
		timestamps: false,
	}
);

export default User;
