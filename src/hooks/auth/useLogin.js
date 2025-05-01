import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ROOT } from "../../lib/routes";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../lib/firebase";
import useAuth from "./auth";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { user, profile, loading: authLoading } = useAuth(); // Use useAuth to get updated states

  const login = async (email, password, store_id) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // 2. Save store_id to localStorage for later use
      localStorage.removeItem('store_id');
      localStorage.setItem('store_id', store_id);
      localStorage.setItem('user_id', uid);

      // 3. Fetch user document from Firestore (this part will be handled by useAuth)
      const userDocRef = doc(db, 'stores', store_id, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        throw new Error('User document not found.');
      }

      // Wait for the `useAuth` hook to refresh user profile state
      setTimeout(() => {
        navigate(ROOT);
      }, 500); // Adding a small delay to ensure state is refreshed

    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading, userData, user, profile, authLoading };
};

export default useLogin;
