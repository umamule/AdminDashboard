import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import adminRoutes from './routes/adminRoutes.js';
import companyRoutes from "./routes/companyRoutes.js";
import companyOtpRoutes from "./routes/companyOtpRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import vendorOtpRoutes from "./routes/vendorOtpRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// STATIC FOLDER FOR PDF PREVIEW
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use('/api', adminRoutes);
app.use('/api', companyRoutes);
app.use('/api', companyOtpRoutes);
app.use('/api', vendorRoutes);
app.use('/api', vendorOtpRoutes);
app.use('/api', documentRoutes);

// HEALTH CHECK
app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
