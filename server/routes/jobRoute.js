import express from "express";
import {
  completeJob,
  createJob,
  deleteJob,
  getJobDetail,
  listJobs,
  updateJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/", listJobs);
router.get("/:jobId", getJobDetail);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
router.put("/:jobId/complete", completeJob);

export default router;
