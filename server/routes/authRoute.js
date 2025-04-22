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
  resetPassword
} from '../controllers/UserController.js';
import upload from '../middleware/multer.js'; // explained below
import authMiddleware from '../middleware/Auth.js'; // make sure this sets `req.user`

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOtp);
router.patch('/avatar', authMiddleware, upload.single('avatar'), uploadAvatar);
router.patch("/cover", authMiddleware, upload.single("file"), uploadCoverImage);
router.patch('/profile', authMiddleware, updateProfile);
// In your routes file
router.post('/forgot-password', sendPasswordResetLink);
router.post('/reset-password/:token', resetPassword);


export default router;
