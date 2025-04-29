import { useState } from "react";
import { initializeApp, deleteApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { firebaseConfig } from "../../lib/firebase";

const useRegisterStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerStore = async (email, password, username, storeName) => {
    setLoading(true);
    setError(null);

    try {
      const secondaryApp = initializeApp(firebaseConfig, "Secondary");
      const secondaryAuth = getAuth(secondaryApp);
      const secondaryDb = getFirestore(secondaryApp);

      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      const storeId = uuidv4();
      const db = getFirestore();

      const storeRef = doc(db, "stores", storeId);
      await setDoc(storeRef, {
        store_name: storeName,
        store_id: storeId,
        approved: false,
      });

      const userRef = doc(collection(storeRef, "users"), user.uid);
      await setDoc(userRef, {
        access_level: "admin",
        email,
        username,
        uid: user.uid,
      });

      // ✅ Step 7: Create default inventory item and logs
      const inventoryRef = doc(collection(storeRef, "inventory"));
      await setDoc(inventoryRef, {
        sku_number: "INIT-SKU-001",
        barcode_number: "000000000001",
        quantity: 0,
        category: "Uncategorized",
        date_modified: serverTimestamp(),
      });

      const logsRef = collection(inventoryRef, "logs");
      await addDoc(logsRef, {
        edited_by: username,
        log_message: "Initial inventory entry created upon store registration.",
        date: serverTimestamp(),
      });

      // Step 8: Add initial log
      const logRef = collection(userRef, "user-logs");
      await addDoc(logRef, {
        date: serverTimestamp(),
        log_message: "User registered and assigned as admin.",
      });

      // Step 9: Create pending approval record
      const approvalRef = collection(db, "pending-approvals");
      await addDoc(approvalRef, {
        approved: false,
        date_requested: serverTimestamp(),
        store_id: storeId,
        store_name: storeName,
        submitted_by: email,
        username,
        submitted_by_uid: user.uid,
      });

      await secondaryAuth.signOut();
      await deleteApp(secondaryApp);

      setLoading(false);
      return { success: true, user };
    } catch (err) {
      console.error("Error registering store:", err);
      setError(err.message);
      setLoading(false);
      return { success: false };
    }
  };

  return { registerStore, loading, error };
};

export default useRegisterStore;