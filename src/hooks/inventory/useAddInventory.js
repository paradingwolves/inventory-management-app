import { useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const useReceiveInventoryItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const storeId = localStorage.getItem("store_id");
  const userId = localStorage.getItem("user_id");

  const receiveItemByBarcode = async ({ barcode, username }) => {
    setLoading(true);
    setError(null);
  
    try {
      const db = getFirestore();
      const inventoryRef = collection(db, "stores", storeId, "inventory");
      const q = query(inventoryRef, where("barcode_number", "==", barcode));
      const snapshot = await getDocs(q);
  
      if (!snapshot.empty) {
        const itemDoc = snapshot.docs[0];
        const itemRef = doc(db, "stores", storeId, "inventory", itemDoc.id);
        const currentData = itemDoc.data();
  
        // Update the inventory item
        await updateDoc(itemRef, {
          quantity: currentData.quantity + 1,
          date_modified: serverTimestamp(),
        });
  
        // Add a log entry to the item's logs collection
        const logsRef = collection(itemRef, "logs");
        await addDoc(logsRef, {
          edited_by: userId,
          log_message: `Quantity increased by 1 via barcode scan (${barcode})`,
          date: serverTimestamp(),
        }).catch((error) => {
          console.error("Error adding log entry to item's logs:", error);
          setError("Failed to add log entry.");
        });
  
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        return { success: false, message: "Barcode not found in inventory." };
      }
    } catch (err) {
      console.error("Error processing barcode:", err);
      setError(err.message);
      setLoading(false);
      return { success: false };
    }
  };
  
  

  return { receiveItemByBarcode, loading, error };
};

export default useReceiveInventoryItem;
