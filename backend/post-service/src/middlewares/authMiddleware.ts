import { Request, Response, NextFunction } from 'express';

import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { AppError } from '../utils/errorHandler';
interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { userId: decoded.userId };
    req.body = {
      ...req.body,authorId:decoded.userId
    }
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(403).json({ message: 'Access token expired' });
    }
    return res.status(403).json({ message: 'Invalid token' });
  }
};