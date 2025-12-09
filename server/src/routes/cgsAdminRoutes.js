import express from 'express';
import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/cgAdminController.js';
import {protect} from '../middleware/authmiddleware.js';
import { cgsLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", cgsLogin);

// Protect each route explicitly
router.get('/', protect(['cgs']), getAllAdmins);
router.get('/:admin_id', protect(['cgs']), getAdminById);
router.post('/', protect(['cgs']), createAdmin);
router.put('/:admin_id', protect(['cgs']), updateAdmin);
router.delete('/:admin_id', protect(['cgs']), deleteAdmin);

export default router;
