import express from "express";
import {
  deleteReportedContent,
  listAllJobs,
  listAllUsers,
} from "../../controllers/admin/usersController.js";

const router = express.Router();

router.post("/users", listAllUsers);
router.post("/jobs", listAllJobs);
router.get("/reports", deleteReportedContent);

export default router;
