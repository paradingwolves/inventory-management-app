import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/auth/useLogin';
import useGetStores from '../../hooks/stores/useGetStores';
import useAuth from '../../hooks/auth/auth';
import { ROOT } from '../../lib/routes';

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { login, error: loginError, loading: loginLoading, userData } = useLogin();
  const { stores, loading: storesLoading, error: storesError } = useGetStores();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeId, setStoreId] = useState('');

  useEffect(() => {
    // If the user is already logged in, redirect to the ROOT page
    if (!loading && user) {
      navigate(ROOT, { replace: true }); // Use replace to avoid pushing the login to history
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storeId) {
      alert('Please select a store.');
      return;
    }
    await login(email, password, storeId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return null; // Logged in → don't show the login form
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '22rem' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email or Username</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Store Dropdown */}
          <div className="mb-3">
            <label htmlFor="store" className="form-label">Select Store</label>
            <select
              className="form-select"
              id="store"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              disabled={storesLoading}
            >
              <option value="">-- Select a Store --</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.store_name || store.id}
                </option>
              ))}
            </select>
            {storesError && <div className="text-danger mt-1">{storesError}</div>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100" disabled={loginLoading}>
            {loginLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Error/Success Feedback */}
          {loginError && <div className="alert alert-danger mt-3">{loginError}</div>}
          {userData && (
            <div className="alert alert-success mt-3">
              Welcome, {userData.username}!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
