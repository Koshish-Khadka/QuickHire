import express from "express";
import { login, signUp } from "../controllers/authController.js";

const router = express.Router();

router.post("/", login);
router.post("/", signUp);
export default router;

