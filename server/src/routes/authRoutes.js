import express from "express";
import { me, cgsLogin, supervisorLogin, studentLogin, refreshToken, logout } from "../controllers/authController.js";
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/cgs/login', cgsLogin);
router.post('/masterstu/login', studentLogin);
router.post('/supervisors/login', supervisorLogin);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get("/me", protect(), me);

export default router;