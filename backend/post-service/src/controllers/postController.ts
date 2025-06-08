// @ts-ignore
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { AppError } from '../utils/errorHandler';
import logger from '../utils/logger';
import User from '../schemas/UserSchema'; // your User schema import

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await Post.create({ title, content, authorId });
    res.status(201).json(post);
  } catch (error) {
    logger.error('Error creating post:', error);
    throw new AppError('Failed to create post', 500);
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('authorId', 'name'); // populate author name

    res.json(posts);
  } catch (error) {
    logger.error('Error fetching posts:', error);
    throw new AppError('Failed to fetch posts', 500);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate('authorId', 'name');
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    res.json(post);
  } catch (error) {
    logger.error('Error fetching post:', error);
    throw new AppError('Failed to fetch post', 500);
  }
};


export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(id, { title, content }, { new: true }).populate('authorId', 'name');
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    res.json(post);
  } catch (error) {
    logger.error('Error updating post:', error);
    throw new AppError('Failed to update post', 500);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      throw new AppError('Post not found', 404);
    }
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting post:', error);
    throw new AppError('Failed to delete post', 500);
  }
};
