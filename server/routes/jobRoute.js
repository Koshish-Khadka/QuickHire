import express from "express";
import {
  completeJob,
  createJob,
  deleteJob,
  getJobDetail,
  listJobs,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, createJob);
router.get("/", isAuthenticated, listJobs);
router.get("/:jobId", isAuthenticated, getJobDetail);
router.patch("/:jobId", isAuthenticated, updateJob);
router.delete("/:jobId", isAuthenticated, deleteJob);
router.patch("/:jobId/complete", isAuthenticated, completeJob);

export default router;
