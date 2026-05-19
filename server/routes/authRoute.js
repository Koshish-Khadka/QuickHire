import express from "express";
import { login, session, signUp } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.get("/session", isAuthenticated, session);

export default router;
