import express from "express";

import {
  applyToJob,
  getAllJobApplications,
  getApplicationDetail,
  getJobApplications,
  getWorkerApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/:jobId", isAuthenticated, applyToJob);
router.get("/workers/applications", isAuthenticated, getWorkerApplications);
router.get("/workers/allApplications", isAuthenticated, getAllJobApplications);
router.get("/:jobId/applications", isAuthenticated, getJobApplications);
router.patch("/applications/:applicationId", isAuthenticated, updateApplicationStatus);
router.get("/applications/:applicationId", isAuthenticated, getApplicationDetail);

export default router;
