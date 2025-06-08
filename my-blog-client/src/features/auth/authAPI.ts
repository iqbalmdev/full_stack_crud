// src/features/auth/authAPI.ts
import axiosInstance from '../../api/authApi';

 // adjust your backend URL

export const loginUser = async (email: string, password: string) => {
    const response = await axiosInstance.post('/login', { email, password });
    return response.data;
  };
