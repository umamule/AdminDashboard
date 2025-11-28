import express from "express";
import {
  createCompanyType,
//   getCompanyTypes,
//   updateCompanyType,
//   deleteCompanyType,
} from "../controllers/companyTypeController.js";

const router = express.Router();

// Admin APIs
router.post("/", createCompanyType);       // Create
// router.get("/", getCompanyTypes);          // Get all
// router.put("/:id", updateCompanyType);     // Update
// router.delete("/:id", deleteCompanyType);  // Delete

export default router;
