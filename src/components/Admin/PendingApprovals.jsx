import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { deleteUser, getAuth } from "firebase/auth";
import useGetRegisterRequests from "../../hooks/admin/useGetRegisterRequests";

export const PendingApprovals = () => {
  const { requests, loading, error } = useGetRegisterRequests();
  const [localRequests, setLocalRequests] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const auth = getAuth(); // Initialize once at top

  useEffect(() => {
    setLocalRequests(requests);
  }, [requests]);

  const handleApprove = async (req) => {
    try {
      setActionLoading(true);

      const pendingRef = doc(db, "pending-approvals", req.id);
      await updateDoc(pendingRef, { approved: true });

      const storeRef = doc(db, "stores", req.store_id);
      await updateDoc(storeRef, { approved: true });

      // Update local state
      setLocalRequests(prev =>
        prev.map(r => r.id === req.id ? { ...r, approved: true } : r)
      );

      setActionLoading(false);
    } catch (err) {
      console.error("Error approving request:", err);
      setActionLoading(false);
    }
  };

  const handleReject = async (req) => {
    try {
      setActionLoading(true);
  
      // Step 1: Delete from pending-approvals
      const pendingRef = doc(db, "pending-approvals", req.id);
      await deleteDoc(pendingRef);
  
      // Step 2: Delete from stores
      const storeRef = doc(db, "stores", req.store_id);
      await deleteDoc(storeRef);
  
      // Step 3: Delete user
      if (req.user_id) {
        const user = await auth.getUser(req.submitted_by_id);
        await deleteUser(user);
      }
  
      // Remove from local UI immediately
      setLocalRequests(prev =>
        prev.filter(r => r.id !== req.id)
      );
  
      setActionLoading(false);
    } catch (err) {
      console.error("Error rejecting request:", err);
      setActionLoading(false);
    }
  };

  const handleTurnOff = async (req) => {
    try {
      setActionLoading(true);

      const pendingRef = doc(db, "pending-approvals", req.id);
      await updateDoc(pendingRef, { approved: false });

      const storeRef = doc(db, "stores", req.store_id);
      await updateDoc(storeRef, { approved: false });

      // Update local state
      setLocalRequests(prev =>
        prev.map(r => r.id === req.id ? { ...r, approved: false } : r)
      );

      setActionLoading(false);
    } catch (err) {
      console.error("Error turning off store:", err);
      setActionLoading(false);
    }
  };

  if (loading) return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger" role="alert">Error: {error}</div>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Pending Approvals</h2>

      {localRequests.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No pending approvals.
        </div>
      ) : (
        <div className="list-group">
          {localRequests.map(req => (
            <div key={req.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center flex-wrap">
              <div className="mb-2">
                <h5 className="mb-1">{req.store_name}</h5>
                <small className="text-muted">Submitted by {req.submitted_by}</small>
              </div>
              <div className="d-flex gap-2 align-items-center">
                {req.approved ? (
                  <>
                    <span className="badge bg-success">Active</span>
                    <button 
                      className="btn btn-warning btn-sm"
                      onClick={() => handleTurnOff(req)}
                      disabled={actionLoading}
                    >
                      Turn Off
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="btn btn-success btn-sm"
                      onClick={() => handleApprove(req)}
                      disabled={actionLoading}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(req)}
                      disabled={actionLoading}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
