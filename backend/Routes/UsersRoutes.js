import express from "express";

const userRouter = express.Router();

import { getUsers } from "../Controllers/User.js";

userRouter.get("/users", getUsers);

export default userRouter;
