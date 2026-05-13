import express from "express";
import { login, session, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.get("/session", session);

export default router;
