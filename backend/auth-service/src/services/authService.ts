// @ts-ignore
import mongoose from 'mongoose';
// @ts-ignore
import jwt, { JwtPayload } from 'jsonwebtoken';
// @ts-ignore
import bcrypt from 'bcrypt';
import { AppError } from '../utils/errorHandler';
import logger from '../utils/logger';

// Define the User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB

export const registerUser = async (name: string,email: string, password: string) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });
    return user;
  } catch (error) {
    logger.error('Error registering user:', error);
    throw new AppError('Failed to register user', 500);
  }
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError('User not found', 404);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new AppError('Invalid password', 401);

  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  return { accessToken, refreshToken, user };
};


export const getCurrentUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  } catch (error) {
    logger.error('Error fetching user:', error);
    throw new AppError('Failed to fetch user', 500);
  }
};

export const refresh = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'your-secret-key') as JwtPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  } catch (error) {
    logger.error('Error refreshing token:', error);
    throw new AppError('Failed to refresh token', 500);
  }
};

export const logoutUser = async (userId: string) => {
  // In a real app, you might invalidate the token or clear session data
  return { message: 'Logged out successfully' };
};

export const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.userId);
    if (!user) throw new AppError('User not found', 404);

    const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '15m' });
    const newRefreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (err) {
    throw new AppError('Invalid refresh token', 403);
  }
};
