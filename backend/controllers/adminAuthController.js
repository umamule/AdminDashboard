// controllers/adminAuthController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import dotenv from 'dotenv';
dotenv.config();

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM admins_schema.admins WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = result.rows[0];

    if (!admin.is_active) {
      return res.status(403).json({ message: "Admin account is deactivated" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: "Login successful",
      token,
      admin: { id: admin.id, name: admin.name, email: admin.email }
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
