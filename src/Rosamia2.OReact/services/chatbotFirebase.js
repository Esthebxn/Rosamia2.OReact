import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  doc,
  setDoc,
  getDoc,
  limit
} from "firebase/firestore";
import { db } from "../firebase";

export const ChatbotFirebaseService = {
  async getConfig() {
    const ref = doc(db, "chatbot_config", "main");
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  },

  async createSession(sessionId) {
    await setDoc(doc(db, "chatbot_sessions", sessionId), {
      sessionId,
      active: true,
      createdAt: serverTimestamp(),
      lastActivity: serverTimestamp()
    }, { merge: true });
  },

  async getMessages(sessionId) {
    const q = query(
      collection(db, "chatbot_messages"),
      where("sessionId", "==", sessionId),
      orderBy("timestamp", "asc"),
      limit(100)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      firebaseId: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || new Date()
    }));
  },

  async saveMessage(message, sessionId) {
    const docRef = await addDoc(collection(db, "chatbot_messages"), {
      sessionId,
      text: message.text,
      sender: message.sender,
      timestamp: serverTimestamp()
    });

    return docRef.id;
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
