import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (currentUser) => {
    setProfile(null);
    setStoreName(null);
    setLoading(true);

    if (currentUser) {
      try {
        const storeId = localStorage.getItem('store_id');

        if (storeId) {
          // Fetch user profile inside store
          const userRef = doc(db, 'stores', storeId, 'users', currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setProfile(userSnap.data());
          } else {
            console.error("No user profile found in Firestore!");
          }

          // Fetch store document to get store_name
          const storeRef = doc(db, 'stores', storeId);
          const storeSnap = await getDoc(storeRef);

          if (storeSnap.exists()) {
            const data = storeSnap.data();
            if (data?.store_name) {
              setStoreName(data.store_name);
            } else {
              console.error("store_name not found in store document");
            }
          } else {
            console.error("Store document not found");
          }

        } else {
          console.error("No store_id found in localStorage!");
        }
      } catch (error) {
        console.error("Error fetching user/store data:", error);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      fetchUserData(currentUser);
    });

    const handleStorageChange = () => {
      if (user) {
        fetchUserData(user);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      unsubscribe();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

  return { user, profile, storeName, loading };
};

export default useAuth;
