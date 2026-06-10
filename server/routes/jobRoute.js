import express from "express";
import {
  approvedTask,
  completeJob,
  createJob,
  deleteJob,
  getCreatedTask,
  getJobDetail,
  listJobs,
  updateJob,
} from "../controllers/jobController.js";
import { canApply, isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", listJobs);
router.get("/created", isAuthenticated, getCreatedTask) //used
router.get("/approved", isAuthenticated, approvedTask)
router.get("/:jobId", getJobDetail);
router.post("/", isAuthenticated, canApply, createJob);
router.patch("/:jobId", isAuthenticated, updateJob);
router.delete("/:jobId", isAuthenticated, deleteJob);
router.patch("/:jobId/complete", isAuthenticated, completeJob);

export default router;
