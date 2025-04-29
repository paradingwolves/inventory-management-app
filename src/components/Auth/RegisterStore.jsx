import React, { useState } from 'react';
import useRegisterStore from '../../hooks/auth/useRegisterStore';

const RegisterStore = () => {
  const { registerStore, loading, error } = useRegisterStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [storeName, setStoreName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const result = await registerStore(email, password, username, storeName);
    if (result.success) {
      setSuccessMessage('Store and admin user registered successfully!');
      setEmail('');
      setPassword('');
      setUsername('');
      setStoreName('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card p-4 shadow" style={{ width: '26rem' }}>
        <h2 className="text-center mb-4">Register New Store</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Store Name */}
          <div className="mb-3">
            <label htmlFor="storeName" className="form-label">Store Name</label>
            <input
              type="text"
              className="form-control"
              id="storeName"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
            />
          </div>

          {/* Admin Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Admin Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Admin Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Admin Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Admin Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Admin Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register Store'}
          </button>

          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success mt-3" role="alert">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterStore;
