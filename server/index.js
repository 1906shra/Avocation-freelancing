// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import jobRoutes from './routes/jobroute.js';
import proposalRoutes from './routes/jobPropsalroute.js'; // Import proposal routes

dotenv.config();
const app = express();

app.use(express.json()); // Handles JSON bodies

// ✅ DO NOT use express-fileupload
// app.use(fileUpload()); ❌ REMOVE THIS

// Connect DB
mongoose.connect(process.env.DATABASE_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/proposals', proposalRoutes); // Use proposal routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
