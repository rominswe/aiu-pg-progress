import express from "express";
import {
  listSubmissions,
  createSubmission,
  updateSubmission,
} from "../controllers/submissionController.js";

const router = express.Router();

router.get("/", listSubmissions);
router.post("/", createSubmission);
router.patch("/:id", updateSubmission);
router.put("/:id", updateSubmission);

export default router;


