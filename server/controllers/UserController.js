import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import transporter from '../config/emailConfig.js';
import crypto from 'crypto';
import cloudinary from '../config/cloudinary.js'
import streamifier from 'streamifier';
import asyncHandler from "express-async-handler";


// Generate a 6-digit numeric OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

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
    const {  fullName,
      username,
      email,
      password,
      role
 } = req.body;

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
        lastSentAt: new Date(),
        attempts: 0,
      },
    });

    await sendVerificationEmail(email, otpCode);
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

    if (!user.otp || !user.otp.code) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }

    if (new Date() > new Date(user.otp.expiresAt)) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (user.otp.attempts >= 5) {
      return res.status(429).json({ message: 'Too many failed attempts. Please request a new OTP.' });
    }

    if (user.otp.code !== otp) {
      user.otp.attempts += 1;
      await user.save();
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.isEmailVerified = true;
    user.otp = {
      code: '',
      expiresAt: null,
      attempts: 0,
      lastSentAt: null,
    };
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

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    const now = new Date();
    if (user.otp?.lastSentAt && now - new Date(user.otp.lastSentAt) < 60 * 1000) {
      return res.status(429).json({ message: 'Please wait at least 1 minute before requesting a new OTP' });
    }

    const otpCode = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = {
      code: otpCode,
      expiresAt: otpExpires,
      lastSentAt: now,
      attempts: 0,
    };
    await user.save();

    await sendVerificationEmail(email, otpCode);
    console.log(`Resent OTP for ${email}: ${otpCode}`);

    res.status(200).json({ message: 'OTP resent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};











export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    console.log("Login attempt with:", { emailOrUsername, password });

    if (!emailOrUsername || !password) {
      console.log("Missing emailOrUsername or password");
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    }).select('+password');

    if (!user) {
      console.log("User not found for:", emailOrUsername);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", user.email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isEmailVerified) {
      console.log("User email not verified:", user.email);
      return res.status(403).json({ message: 'Please verify your email first' });
    }

    const token = generateToken(user._id);
    console.log("Login successful for:", user.email);

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
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
};

export const logoutUser = (req, res) => {
    try {
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed", error: error.message });
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



// userController.js
export const uploadAvatar = async (req, res) => {
  try {
    console.log('Starting uploadAvatar');
    console.log('File received:', req.file);

    const userId = req.user._id;
    const file = req.file;

    if (!file) {
      console.log('No file provided');
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    console.log('Fetching user:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Checking for existing avatar');
    if (user.avatar?.public_id) {
      console.log('Destroying old avatar:', user.avatar.public_id);
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    console.log('Saving new avatar:', file.public_id, file.path);
    user.avatar = {
      public_id: file.public_id, // From multer-storage-cloudinary
      url: file.path, // Cloudinary secure URL
    };

    await user.save();
    console.log('Avatar saved successfully');

    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatar: user.avatar,
    });
  } catch (err) {
    console.error('Error in uploadAvatar:', err.message);
    res.status(500).json({ message: 'Failed to upload avatar', error: err.message });
  }
};

export const uploadCoverImage = async (req, res) => {
  try {
    console.log('Starting uploadCoverImage');
    console.log('File received:', req.file);

    const userId = req.user._id;
    const file = req.file;

    if (!file) {
      console.log('No file provided');
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    console.log('Fetching user:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Checking for existing cover image');
    if (user.coverImage?.public_id) {
      console.log('Destroying old cover image:', user.coverImage.public_id);
      await cloudinary.uploader.destroy(user.coverImage.public_id);
    }

    console.log('Saving new cover image:', file.public_id, file.path);
    user.coverImage = {
      public_id: file.public_id,
      url: file.path,
    };

    await user.save();
    console.log('Cover image saved successfully');

    res.status(200).json({
      message: 'Cover image uploaded successfully',
      coverImage: user.coverImage,
    });
  } catch (err) {
    console.error('Error in uploadCoverImage:', err.message);
    res.status(500).json({ message: 'Failed to upload cover image', error: err.message });
  }
};







export const uploadResume = async (req, res) => {
  try {
    console.log('Starting uploadResume');
    console.log('File received:', req.file);

    if (!req.file) {
      console.log('No file provided');
      return res.status(400).json({ message: 'No resume file uploaded' });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'raw',
            folder: 'resumes',
            public_id: `resume_${user._id}_${Date.now()}`,
            allowed_formats: ['pdf', 'doc', 'docx'],
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    console.log('Uploading to Cloudinary');
    const result = await streamUpload(req.file.buffer);

    if (user.resume?.public_id) {
      console.log('Deleting old resume:', user.resume.public_id);
      await cloudinary.uploader.destroy(user.resume.public_id, { resource_type: 'raw' });
    }

    user.resume = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    console.log('Saving user with new resume:', user.resume);
    await user.save();

    // Refetch to confirm save worked
    const updatedUser = await User.findById(user._id);
    console.log('Updated resume from DB:', updatedUser.resume);

    res.status(200).json({
      message: 'Resume uploaded successfully',
      resume: updatedUser.resume,
    });
  } catch (err) {
    console.error('Error in uploadResume:', err);
    res.status(500).json({ message: 'Failed to upload resume', error: err.message });
  }
};


export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password -otp -resetToken -resetTokenExpires');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
