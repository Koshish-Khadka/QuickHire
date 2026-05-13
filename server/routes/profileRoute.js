import express from "express";

import {
  deleteAccount,
  getUserProfile,
  updatePassword,
  updateUserProfile,
} from "../controllers/profileController.js";

const router = express.Router();

router.put("/:userId", getUserProfile);
router.put("/profile", updateUserProfile);
router.put("/password", updatePassword);
router.delete("/:userId", deleteAccount);

export default router;
