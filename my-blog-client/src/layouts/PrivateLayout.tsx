import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import { useAppSelector } from '../hooks';
const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useAppSelector((s)=>s.auth)
  return state.accessToken && state?.user ? <>{children}</> : <Login/>;
};

export default PrivateLayout;

