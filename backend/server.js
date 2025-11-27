// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// const app = express();
// app.use(express.json());

// app.use(cors());
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', adminRoutes);

// health
app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
