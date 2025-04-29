import React from 'react';
import { PendingApprovals } from './PendingApprovals';
import useAuth from '../../hooks/auth/auth';

const AdminIndex = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!user || !profile || profile.access_level !== 'admin') {
    return (
      <div className="text-center mt-5">
        <h3>Access Denied</h3>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <PendingApprovals />
    </div>
  );
};

export default AdminIndex;
