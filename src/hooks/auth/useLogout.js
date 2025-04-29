import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase"; // adjust if your firebase config path is different
import { useState } from "react";

const useLogout = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Sign out from Firebase Authentication
      await signOut(auth);

      // 2. Clear the store_name from localStorage
      localStorage.removeItem('store_name');
      localStorage.removeItem('store_id');

    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { logout, error, loading };
};

export default useLogout;
