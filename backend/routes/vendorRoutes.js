import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";

import {
  addVendor,
  updateVendor,
  deleteVendor,
  getAllVendors,
  getVendorById,
  uploadVendorDocuments
} from "../controllers/vendorController.js";

import { uploadVendorDocs } from "../middleware/multerConfig.js";

const router = express.Router();

// Vendor CRUD routes
router.post("/vendors", adminAuth, addVendor);
router.get("/vendors", adminAuth, getAllVendors);
router.get("/vendors/:id", adminAuth, getVendorById);
router.put("/vendors/:id", adminAuth, updateVendor);
router.delete("/vendors/:id", adminAuth, deleteVendor);

// Vendor document upload
router.post(
  "/vendors/:id/upload-docs",
  adminAuth,
  uploadVendorDocs.fields([
    { name: "shop_act_pdf", maxCount: 1 },
    { name: "gst_pdf", maxCount: 1 },
    { name: "licence_pdf", maxCount: 1 },
    { name: "pan_pdf", maxCount: 1 }
  ]),
  uploadVendorDocuments
);

export default router;
