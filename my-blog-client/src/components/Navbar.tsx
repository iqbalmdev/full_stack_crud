import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { logout } from '../features/auth/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <nav
      className="navbar bg-base-200 shadow-md sticky top-0 z-50 px-6"
      style={{ width: '100vw', boxSizing: 'border-box' }} // 100vw + padding safe
    >
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
          MyBlog
        </Link>
      </div>

      {/* Add flex container with gap for spacing */}
      <div className="flex gap-6 items-center">
        <Link to="/profile" className="btn btn-ghost btn-sm">
          Profile
        </Link>
        <Link to="/posts/create" className="btn btn-primary btn-sm" style={{color:"white"}}>
          New Post
        </Link>
        <button onClick={handleLogout} className="btn btn-error btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
