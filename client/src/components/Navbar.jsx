import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../slices/userSlice';
import { serverUrl } from '../App';

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${serverUrl}/api/users/logout`, { method: 'POST' });
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 mx-4 my-4 px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm font-medium gap-4 md:gap-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">T</div>
        <Link to="/" className="text-xl font-bold heading-gradient">TreeBay</Link>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
        <Link to="/" className="text-[var(--text-secondary)] hover:text-white transition-colors">Home</Link>
        <Link to="/form" className="text-[var(--text-secondary)] hover:text-white transition-colors">Form</Link>
        {user && user.isAdmin && (
          <Link to="/admin" className="text-[var(--text-secondary)] hover:text-white transition-colors">Admin</Link>
        )}
        
        {user && user._id ? (
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[var(--panel-border)]">
            <span className="text-[var(--accent-color)]">{user.name || user.email}</span>
            <button onClick={handleLogout} className="text-[var(--error-color)] hover:text-red-400 transition-colors">Logout</button>
          </div>
        ) : (
          <Link to="/signup" className="md:ml-4 btn-primary py-2 px-4 shadow-none">Sign Up</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
