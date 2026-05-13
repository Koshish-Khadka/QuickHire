import express from "express";

import {
  deleteAccount,
  getUserProfile,
  updatePassword,
  updateUserProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/:userId", getUserProfile);
router.patch("/profile", updateUserProfile);
router.patch("/password", updatePassword);
router.delete("/:userId", deleteAccount);

export default router;
