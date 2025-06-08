import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, logoutUser, refreshToken } from "../services/authService";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const result = await logoutUser(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.body;
    const result = await refreshToken(token);
    res.json(result);
  } catch (error) {
    next(error);
  }
}; 