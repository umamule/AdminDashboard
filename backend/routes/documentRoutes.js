import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  previewVendorDocument,
  downloadVendorDocument
} from "../controllers/documentController.js";

const router = express.Router();

// Preview (view in browser)
router.get("/vendors/docs/preview/:filename", adminAuth, previewVendorDocument);

// Download file
router.get("/vendors/docs/download/:filename", adminAuth, downloadVendorDocument);

export default router;
