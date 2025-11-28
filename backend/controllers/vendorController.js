import pool from "../config/db.js";
import bcrypt from "bcryptjs";

// ADD VENDOR
export const addVendor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      shop_act_no,
      shop_act_pdf,
      gst_no,
      gst_pdf,
      licence_no,
      licence_pdf,
      pan_no,
      pan_pdf
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "name, email, phone required" });
    }

    const exists = await pool.query(
      `SELECT id FROM vendor_schema.vendors WHERE email=$1 OR phone=$2`,
      [email, phone]
    );

    if (exists.rows.length > 0) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    const hashed = password ? await bcrypt.hash(password, 10) : null;

    const result = await pool.query(
      `INSERT INTO vendor_schema.vendors
      (name, email, password, phone, shop_act_no, shop_act_pdf,
       gst_no, gst_pdf, licence_no, licence_pdf, pan_no, pan_pdf)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        name,
        email,
        hashed,
        phone,
        shop_act_no || null,
        shop_act_pdf || null,
        gst_no || null,
        gst_pdf || null,
        licence_no || null,
        licence_pdf || null,
        pan_no || null,
        pan_pdf || null
      ]
    );

    res.status(201).json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error("addVendor:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE VENDOR
export const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      password,
      phone,
      shop_act_no,
      shop_act_pdf,
      gst_no,
      gst_pdf,
      licence_no,
      licence_pdf,
      pan_no,
      pan_pdf,
      is_active,
      is_approve
    } = req.body;

    const hashed = password ? await bcrypt.hash(password, 10) : null;

    const result = await pool.query(
      `UPDATE vendor_schema.vendors SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        phone = COALESCE($4, phone),
        shop_act_no = COALESCE($5, shop_act_no),
        shop_act_pdf = COALESCE($6, shop_act_pdf),
        gst_no = COALESCE($7, gst_no),
        gst_pdf = COALESCE($8, gst_pdf),
        licence_no = COALESCE($9, licence_no),
        licence_pdf = COALESCE($10, licence_pdf),
        pan_no = COALESCE($11, pan_no),
        pan_pdf = COALESCE($12, pan_pdf),
        is_active = COALESCE($13, is_active),
        is_approve = COALESCE($14, is_approve),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $15
      RETURNING *`,
      [
        name || null,
        email || null,
        hashed || null,
        phone || null,
        shop_act_no || null,
        shop_act_pdf || null,
        gst_no || null,
        gst_pdf || null,
        licence_no || null,
        licence_pdf || null,
        pan_no || null,
        pan_pdf || null,
        typeof is_active === "boolean" ? is_active : null,
        typeof is_approve === "boolean" ? is_approve : null,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error("updateVendor:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// DELETE VENDOR (SOFT DELETE)
export const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE vendor_schema.vendors
       SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error("deleteVendor:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET ALL VENDORS
export const getAllVendors = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM vendor_schema.vendors ORDER BY id DESC`
    );

    res.json({ success: true, data: result.rows });

  } catch (err) {
    console.error("getAllVendors:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET VENDOR BY ID
export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT * FROM vendor_schema.vendors WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ success: true, data: result.rows[0] });

  } catch (err) {
    console.error("getVendorById:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPLOAD VENDOR DOCUMENTS (PDFs)
export const uploadVendorDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    const files = req.files;

    if (!files || Object.keys(files).length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const updateFields = {
      shop_act_pdf: files.shop_act_pdf?.[0]?.path || null,
      gst_pdf: files.gst_pdf?.[0]?.path || null,
      licence_pdf: files.licence_pdf?.[0]?.path || null,
      pan_pdf: files.pan_pdf?.[0]?.path || null,
    };

    const result = await pool.query(
      `UPDATE vendor_schema.vendors SET
        shop_act_pdf = COALESCE($1, shop_act_pdf),
        gst_pdf = COALESCE($2, gst_pdf),
        licence_pdf = COALESCE($3, licence_pdf),
        pan_pdf = COALESCE($4, pan_pdf),
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [
        updateFields.shop_act_pdf,
        updateFields.gst_pdf,
        updateFields.licence_pdf,
        updateFields.pan_pdf,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Documents uploaded successfully",
      data: result.rows[0],
    });

  } catch (error) {
    console.error("uploadVendorDocuments:", error);
    res.status(500).json({ error: error.message });
  }
};
