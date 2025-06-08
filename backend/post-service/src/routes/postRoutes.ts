import { Router } from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/postController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/',authenticateToken, getPosts);
router.get('/:id',authenticateToken, getPostById);

// Protected routes
router.post('/', authenticateToken, createPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router; 