import db from "../DB/connection.js";
import { DataTypes } from "sequelize";

const Project = db.define(
	"Project",
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		title: { type: DataTypes.STRING },
		description: { type: DataTypes.STRING },
		image: { type: DataTypes.STRING },
		demo: { type: DataTypes.STRING },
		github: { type: DataTypes.STRING },
	},
	{
		tableName: "public.Project",
		timestamps: false,
	}
);

export default Project;
