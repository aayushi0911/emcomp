import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function getNotes(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "notes"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
