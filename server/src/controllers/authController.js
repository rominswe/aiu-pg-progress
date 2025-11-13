import { masterStu, supervisor } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Decryption function (mirror of client-side encryption)
const decryptData = (encryptedData, key) => {
  try {
    const decrypted = atob(encryptedData); // Base64 decode
    let result = "";
    for (let i = 0; i < decrypted.length; i++) {
      result += String.fromCharCode(decrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch (err) {
    console.error("Decryption error:", err);
    return encryptedData;
  }
};

// Login controller
export const login = async (req, res) => {
  const { role } = req.params; // 'student', 'supervisor', 'examiner', or 'cgs-admin'
  let { email, password } = req.body;
  const { securityKey } = req.body;

  console.log("=== LOGIN ATTEMPT ===");
  console.log("Role:", role);
  console.log("Email:", email);

  try {
    let user;

    if (role === "student") {
      user = await masterStu.findOne({ where: { stu_email: email } });
    } else if (role === "supervisor") {
      user = await supervisor.findOne({ where: { emp_email: email } });
    } else if (role === "examiner") {
      // For Examiner, use supervisor table
      user = await supervisor.findOne({ where: { emp_email: email } });
    } else if (role === "cgs-admin") {
      // For CGS admin, use supervisor table and decrypt password
      user = await supervisor.findOne({ where: { emp_email: email } });
      
      // Decrypt the encrypted password if security key is provided
      if (password && securityKey) {
        try {
          password = decryptData(password, securityKey);
        } catch (err) {
          console.error("Failed to decrypt password:", err);
        }
      }
    } else {
      return res.status(401).json({ error: "Invalid role" });
    }

    if (!user) return res.status(401).json({ error: "User not found" });

    // Compare password
    // const valid = await bcrypt.compare(password, user.Password);
    const valid = password === user.Password; // Temporary plain text comparison for testing
    if (!valid) return res.status(401).json({ error: "Wrong password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.stu_id || user.emp_id, role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.stu_id || user.emp_id, name: user.Name || user.Name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};