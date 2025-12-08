import {cgs_admin} from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Login controller for cgadmin
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await cgs_admin.findOne({ where: { EmailId: email } });
    if (!admin) return res.status(401).json({ error: "User not found" });
    // Compare password
    // const valid = await bcrypt.compare(password, admin.cgs_password);
    const valid = password === admin.Password; // Temporary plain text comparison for testing
    if (!valid) return res.status(401).json({ error: "Wrong password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.cgs_id, role: "cgs" },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ token, role: "cgs", user: { id: admin.cgs_id, name: admin.cgs_name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all admins
export const getAllAdmins = async (req, res) => {
  try { 
    const admins = await cgs_admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single admin by cgs_id
export const getAdminById = async (req, res) => {
  try {
    const admin = await cgs_admin.findByPk(req.params.cgs_id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new admin
export const createAdmin = async (req, res) => {
  try {
    const newAdmin = await cgs_admin.create(req.body);
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an admin
export const updateAdmin = async (req, res) => {
  try {
    const admin = await cgs_admin.findByPk(req.params.cgs_id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    await admin.update(req.body);
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await cgs_admin.findByPk(req.params.cgs_id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    await admin.destroy();
    res.json({ message: "Admin deleted successfully" });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};