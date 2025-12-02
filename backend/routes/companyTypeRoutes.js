// import express from "express";
// import {
//   createCompanyType,
//   getCompanyTypes,
//   updateCompanyType,
//   deleteCompanyType,
// } from "../controllers/companyTypeController.js";

// const router = express.Router();

// // Admin APIs
// router.post("/company-type", createCompanyType);         // CREATE
// router.get("/company-type", getCompanyTypes);            // READ
// router.put("/company-type/:id", updateCompanyType);      // UPDATE
// router.delete("/company-type/:id", deleteCompanyType);   // DELETE

// export default router;
// routes/companyTypeRoutes.js
import express from "express";
import {
  createCompanyType,
  getCompanyTypes,
  updateCompanyType,
  deleteCompanyType,
} from "../controllers/companyTypeController.js";

const router = express.Router();

// Use plural "company-types" to match the request you made in Postman
router.post("/company-types", createCompanyType);         // CREATE
router.get("/company-types", getCompanyTypes);           // READ
router.put("/company-types/:id", updateCompanyType);     // UPDATE
router.delete("/company-types/:id", deleteCompanyType);  // DELETE

export default router;
