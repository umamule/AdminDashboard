import pool from "../config/db.js";

// Helper: Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// SEND OTP
export const sendOtpToCompany = async (req, res) => {
  try {
    const { company_id, phone } = req.body;

    if (!company_id || !phone) {
      return res.status(400).json({ message: "company_id and phone required" });
    }

    const company = await pool.query(
      `SELECT id FROM company_schema.companies WHERE id = $1`,
      [company_id]
    );

    if (company.rows.length === 0) {
      return res.status(404).json({ message: "Company not found" });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await pool.query(
      `INSERT INTO company_schema.company_otp
       (company_id, phone, otp_code, expires_at)
       VALUES ($1, $2, $3, $4)`,
      [company_id, phone, otp, expiresAt]
    );

    res.json({
      success: true,
      message: "OTP sent successfully",
      otp,
      expires_at: expiresAt
    });

  } catch (error) {
    console.error("sendOtpToCompany:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// VERIFY OTP
export const verifyCompanyOtp = async (req, res) => {
  try {
    const { company_id, otp_code } = req.body;

    if (!company_id || !otp_code) {
      return res.status(400).json({ message: "company_id and otp_code required" });
    }

    const result = await pool.query(
      `SELECT * FROM company_schema.company_otp
       WHERE company_id = $1
       ORDER BY created_at DESC LIMIT 1`,
      [company_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "OTP not found" });
    }

    const otpRecord = result.rows[0];

    if (new Date() > otpRecord.expires_at) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (otpRecord.otp_code !== otp_code) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    res.json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error("verifyCompanyOtp:", error.message);
    res.status(500).json({ error: error.message });
  }
};
