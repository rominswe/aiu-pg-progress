import express from 'express';
import {
  login,
  getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
} from '../controllers/cgsAdminController.js';
const router = express.Router();

// Login route
router.post("/login", login);

// CRUD endpoints
router.get('/', getAllAdmins);
router.get('/:admin_id', getAdminById);
router.post('/', createAdmin);
router.put('/:admin_id', updateAdmin);
router.delete('/:admin_id', deleteAdmin);

export default router;