import express from "express";
import {
  allWorkers,
  getWorkerProfile,
  updateWorkerProfile,
} from "../controllers/workerProfileController.js";

const router = express.Router();

router.put("/profile", updateWorkerProfile);
router.get("/:workerId", getWorkerProfile);
router.get("/workers", allWorkers);

export default router;
