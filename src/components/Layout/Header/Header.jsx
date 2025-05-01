import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROOT } from '../../../lib/routes';
import useLogout from '../../../hooks/auth/useLogout';
import useAuth from '../../../hooks/auth/auth';
import "./Header.css";

const Header = () => {
  const { profile } = useAuth();
  const { logout, loading: logoutLoading } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Main Header */}
      <nav className={`navbar navbar-dark bg-dark px-4 header ${menuOpen ? "header-hidden" : ""}`}>
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand fw-bold" to={ROOT}>Timberline Inventory</Link>
          <button className="navbar-toggler d-lg-none" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Overlay to dim background when menu is open */}
      {menuOpen && <div className={`overlay ${menuOpen ? "show" : ""}`} onClick={toggleMenu}></div>}

      {/* Sleek Mobile Navbar */}
      <div className={`mobile-nav ${menuOpen ? "show" : ""}`}>
        <button className="btn btn-outline-light btn-sm mb-3" onClick={toggleMenu}>
          Close
        </button>

        <nav>
          <ul className="list-unstyled">
            <li><Link to={ROOT} className="text-white">Home</Link></li>
            {profile && (
              <>
                <li className="text-white mb-2">Signed in as <strong>{profile.username}</strong></li>
                <li>
                  <button className="btn btn-outline-light btn-sm w-100" onClick={logout} disabled={logoutLoading}>
                    {logoutLoading ? 'Logging out...' : 'Logout'}
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;