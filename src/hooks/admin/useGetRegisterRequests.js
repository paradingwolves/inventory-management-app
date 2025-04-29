import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const useGetRegisterRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const querySnapshot = await getDocs(collection(db, "pending-approvals"));
        const fetchedRequests = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRequests(fetchedRequests);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching register requests:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return { requests, loading, error };
};

export default useGetRegisterRequests;
