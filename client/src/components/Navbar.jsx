import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { logout as logoutAPI } from '../services/authService.js';
import toast from 'react-hot-toast';
import '../styles/navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAPI();
    } catch {
      // ignore
    }
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">⚡ CodeTranslater</Link>
      <div className="navbar-links">
        <Link to="/">Editor</Link>
        <Link to="/history">History</Link>
      </div>
      <div className="navbar-user">
        {user?.picture && (
          <img src={user.picture} alt={user.name} referrerPolicy="no-referrer" />
        )}
        <span>{user?.name}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;