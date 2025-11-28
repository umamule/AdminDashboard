import multer from "multer";
import path from "path";
import fs from "fs";

// Convert __dirname for ES Modules
const __dirname = path.resolve();

// Upload directory
const uploadPath = path.join(__dirname, "uploads/vendors");

// Ensure folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  }
});

// Accept only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// THIS IS THE FIX 👇
// Correct ESM Export
export const uploadVendorDocs = multer({
  storage,
  fileFilter
});
