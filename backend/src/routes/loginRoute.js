import express from "express";
import authLoginController from "../controllers/authLoginController.js";

const loginRoute = express.Router();

loginRoute.post("/login", authLoginController.login);
loginRoute.post("/logout", authLoginController.logout);
loginRoute.post("/refresh", authLoginController.refreshToken);

export default loginRoute;
