import {
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";
import { db } from "../firebasedash";

export const ChatbotFirebaseService = {
  async getConfig() {
    const ref = doc(db, "chatbot_config", "main");
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  },

  async saveTraining(keyword, response) {
    await setDoc(doc(db, "chatbot_training", keyword.toLowerCase()), {
      keyword: keyword.toLowerCase(),
      response,
      active: true,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    }, { merge: true });

    return { success: true };
  },

  async getTrainingData() {
    const q = query(
      collection(db, "chatbot_training"),
      where("active", "==", true)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  }
};
