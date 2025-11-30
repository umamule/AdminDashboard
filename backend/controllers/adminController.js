
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

export const createAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await pool.query(
      "SELECT * FROM admins_schema.admins WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO admins_schema.admins (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashed]
    );

    res.status(201).json({ message: "Admin created successfully" });

  } catch (e) {
    console.error("Error creating admin:", e.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
