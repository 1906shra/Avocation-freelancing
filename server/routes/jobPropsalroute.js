// routes/proposalRoutes.js

import express from "express";
import {
  submitProposal,
  getJobProposals,
  respondToProposal,
} from "../controllers/jobProposal.js";
import authMiddleware from "../middleware/Auth.js";

const router = express.Router();

router.post("/submit", authMiddleware, submitProposal); // Apply for a job
router.get("/get/:jobId", authMiddleware, getJobProposals); // View proposals for a job (job poster)
router.put("/res/:proposalId", authMiddleware, respondToProposal); // Accept/Reject

export default router;
