import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROOT } from '../../../lib/routes';
import useLogout from '../../../hooks/auth/useLogout';
import useAuth from '../../../hooks/auth/auth';

const Header = () => {
  const { profile } = useAuth(); // Check if a user is signed in
  const { logout, loading: logoutLoading } = useLogout(); // Handle logout

  const [showMobileNav, setShowMobileNav] = useState(false);

  const toggleMobileNav = () => setShowMobileNav(!showMobileNav);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to={ROOT}>
          Timberline Inventory
        </Link>
        
        {/* Hamburger Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={showMobileNav}
          aria-label="Toggle navigation"
          onClick={toggleMobileNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${showMobileNav ? 'show' : ''}`}>
        <ul className="navbar-nav">
          {/* Add links here */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
