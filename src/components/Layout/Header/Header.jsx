import React from 'react';
import { Link } from 'react-router-dom';
import { ROOT } from '../../../lib/routes';
import useLogout from '../../../hooks/auth/useLogout';
import useAuth from '../../../hooks/auth/auth';

const Header = () => {
  const { profile } = useAuth(); // Check if a user is signed in
  const { logout, loading: logoutLoading } = useLogout(); // Handle logout

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between">
        <Link className="navbar-brand" to={ROOT}>
          Timberline Inventory
        </Link>

        {profile && (
          <div className="d-flex align-items-center">
            <span className="text-white me-3">
              Signed in as <strong>{profile.username}</strong>
            </span>
            <button 
              className="btn btn-outline-light btn-sm" 
              onClick={logout}
              disabled={logoutLoading}
            >
              {logoutLoading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
