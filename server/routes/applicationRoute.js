import express from "express";

import {
  applyToJob,
  getApplicationDetail,
  getJobApplications,
  getWorkerApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", applyToJob);
router.get("/:jobId/applications", getJobApplications);
router.get("/workers/applications", getWorkerApplications);
router.put("/applications/:applicationId", updateApplicationStatus);

router.get("/applications/:applicationId", getApplicationDetail);

export default router;
