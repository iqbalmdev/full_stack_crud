import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { loginUser } from '../features/auth/authAPI';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser(email, password);
      dispatch(setCredentials(data));
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 " style={{width:"100vw"}}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Login</h2>
        {error && (
          <p className="text-red-600 text-center mb-6 font-medium">{error}</p>
        )}
        <input
          type="email"
          className="input input-bordered input-primary w-full mb-5"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <input
          type="password"
          className="input input-bordered input-primary w-full mb-7"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit" className="btn btn-primary w-full text-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
