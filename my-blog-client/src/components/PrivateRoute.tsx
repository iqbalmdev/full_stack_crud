import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import Login from '../pages/Login';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  return token ? children : <Login />;
};

export default PrivateRoute;