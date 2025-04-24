import express from 'express';
import {
  signup,
  login,
  verifyEmail,
  resendOtp,
  uploadAvatar,
  uploadCoverImage ,
  updateProfile 
,
  sendPasswordResetLink,
  resetPassword,
  uploadResume
} from '../controllers/UserController.js';
import upload from '../middleware/multer.js'; // explained below
import authMiddleware from '../middleware/Auth.js'; // make sure this sets `req.user`
import upload1 from '../middleware/multer1.js'; // explained below

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOtp);
router.post('/upload-avatar', authMiddleware, upload.single('avatar'), uploadAvatar);
router.post('/upload-cover-image', authMiddleware, upload.single('coverImage'), uploadCoverImage);
router.patch('/profile', authMiddleware, updateProfile);
// In your routes file
router.post('/forgot-password', sendPasswordResetLink);
router.post('/reset-password/:token', resetPassword);
router.post("/upload-resume", authMiddleware, upload1.single("resume"), uploadResume);




export default router;
