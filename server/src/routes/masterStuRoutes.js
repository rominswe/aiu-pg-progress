import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/masterStuController.js";
import { studentLogin } from "../controllers/authController.js";
import {protect} from '../middleware/authmiddleware.js';

const router = express.Router();

router.post("/login", studentLogin);

// CRUD endpoints
router.get("/", protect(["student"]),getAllStudents);
router.get("/:stu_id", protect(["student"]), getStudentById);
router.post("/", protect(["student"]),createStudent);
router.put("/:stu_id", protect(["student"]),updateStudent);
router.delete("/:stu_id", protect(["student"]),deleteStudent);

export default router;