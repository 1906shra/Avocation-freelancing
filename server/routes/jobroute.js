// routes/jobRoutes.js
import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";
import authMiddleware from '../middleware/Auth.js'; // Ensure the import path is correct

const router = express.Router();

// POST - Create a new job
router.post("/create", authMiddleware, createJob);

// GET - Get all jobs
router.get("/get", getAllJobs);

// GET - Get job by ID
router.get("/get/:id", getJobById);  // Corrected the route

// PUT - Update job by ID
router.put("/update/:id", authMiddleware, updateJob);  // Corrected the route

// DELETE - Delete job by ID
router.delete("/delete/:id", authMiddleware, deleteJob);  // Corrected the route

export default router;
