// controllers/proposalController.js

import Proposal from "../model/proposal.js";
import Job from "../model/jobSchema.js";

// ✅ Submit a Proposal
export const submitProposal = async (req, res) => {
  try {
    const { jobId, coverLetter, bidAmount, timeline } = req.body;
    const freelancerId = req.user._id; // Assume auth middleware sets this

    const job = await Job.findById(jobId);
    if (!job || !job.isOpen) {
      return res.status(404).json({ message: "Job not found or closed." });
    }

    const existingProposal = await Proposal.findOne({ jobId, freelancerId });
    if (existingProposal) {
      return res.status(400).json({ message: "You have already submitted a proposal." });
    }

    const proposal = await Proposal.create({
      jobId,
      freelancerId,
      coverLetter,
      bidAmount,
      timeline,
    });

    res.status(201).json({ proposal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Proposals for a Job (Only job owner should access this)
export const getJobProposals = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Ensure only job poster can view
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied." });
    }

    const proposals = await Proposal.find({ jobId })
      .populate("freelancerId", "name email avatar");

    res.status(200).json({ proposals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Accept or Reject Proposal
export const respondToProposal = async (req, res) => {
  try {
    const { proposalId } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const proposal = await Proposal.findById(proposalId).populate("jobId");

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found." });
    }

    const job = await Job.findById(proposal.jobId._id);
    if (job.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can't modify this proposal." });
    }

    proposal.status = status;
    await proposal.save();

    res.status(200).json({ proposal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
