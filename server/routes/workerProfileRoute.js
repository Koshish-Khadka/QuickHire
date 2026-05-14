import express from "express";
import {
  allWorkers,
  getWorkerProfile,
  updateWorkerProfile,
} from "../controllers/workerProfileController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
const router = express.Router();

router.get("/", isAuthenticated, allWorkers);
router.get("/:workerId", isAuthenticated, getWorkerProfile);
router.patch("/profile", isAuthenticated, updateWorkerProfile);

export default router;
