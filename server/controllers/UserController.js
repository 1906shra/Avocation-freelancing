import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import nodemailer from 'nodemailer';
import transporter from '../config/emailConfig.js';
import crypto from 'crypto';

// Generate a 6-digit numeric OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Configure nodemailer transporter


// Send verification email
const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Freelance Platform" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>This OTP will expire in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// -------- Signup --------
export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otpCode = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role,
      otp: {
        code: otpCode,
        expiresAt: otpExpires,
      },
    });

    // Send OTP via email
    await sendVerificationEmail(email, otpCode);

    // Also log OTP for Postman testing
    console.log(`OTP for ${email}: ${otpCode}`);

    res.status(201).json({
      message: 'User registered. Verification OTP sent to email.',
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------- Verify Email --------
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.otp || user.otp.code !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > new Date(user.otp.expiresAt)) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    user.isEmailVerified = true;
    user.otp = { code: '', expiresAt: null };
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------- Resend OTP --------
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otpCode = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = {
      code: otpCode,
      expiresAt: otpExpires,
    };
    await user.save();

    await sendVerificationEmail(email, otpCode);
    console.log(`Resent OTP for ${email}: ${otpCode}`);

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------- Login --------
export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    }).select('+password');

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user._id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const user = await User.findById(userId);

    // Delete old avatar from Cloudinary if exists
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    user.avatar = {
      public_id: file.public_id, // comes from multer-storage-cloudinary
      url: file.path,            // Cloudinary secure URL
    };

    await user.save();

    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const uploadCoverImage = async (req, res) => {
  try {
    const userId = req.user._id;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const user = await User.findById(userId);

    // Delete old cover image if exists
    if (user.coverImage?.public_id) {
      await cloudinary.uploader.destroy(user.coverImage.public_id);
    }

    user.coverImage = {
      public_id: file.public_id,
      url: file.path,
    };

    await user.save();

    res.status(200).json({
      message: 'Cover image uploaded successfully',
      coverImage: user.coverImage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updates = req.body;

    const allowedFields = ['bio', 'skills', 'availability', 'website', 'github', 'linkedin'];
    const updateData = {};

    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        updateData[field] = updates[field];
      }
    });

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const sendPasswordResetLink = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: `"Freelance Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>This link will expire in 10 minutes.</p>`,
    };
    console.log(resetUrl); // Log the reset URL for testing
    

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = '';
    user.resetTokenExpires = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
