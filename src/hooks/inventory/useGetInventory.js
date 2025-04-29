import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const useGetInventory = (storeId) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!storeId) return;

    const fetchInventory = async () => {
      setLoading(true);
      setError(null);

      try {
        const db = getFirestore();
        const inventoryCollection = collection(db, "stores", storeId, "inventory");
        const inventorySnapshot = await getDocs(inventoryCollection);

        const items = inventorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setInventory(items);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [storeId]);

  return { inventory, loading, error };
};

export default useGetInventory;
