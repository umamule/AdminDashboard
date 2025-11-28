import path from "path";
import fs from "fs";

// For ES Modules __dirname
const __dirname = path.resolve();

// PREVIEW PDF (Open in Browser)
export const previewVendorDocument = (req, res) => {
  try {
    const { filename } = req.params;

    const filePath = path.join(__dirname, "uploads", "vendors", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");

    fs.createReadStream(filePath).pipe(res);

  } catch (error) {
    console.error("previewVendorDocument:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

// DOWNLOAD PDF
export const downloadVendorDocument = (req, res) => {
  try {
    const { filename } = req.params;

    const filePath = path.join(__dirname, "uploads", "vendors", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.download(filePath);

  } catch (error) {
    console.error("downloadVendorDocument:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
