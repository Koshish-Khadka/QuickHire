import express from "express";

import {
  createReview,
  deleteReview,
  getJobReviews,
  getReviews,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
router.get("/:userId", getReviews);
router.get("/job/:jobId", getJobReviews);
router.put("/:reviewId", updateReview);

router.delete("/:reviewId", deleteReview);

export default router;
