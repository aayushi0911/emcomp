import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
export async function getMindMaps(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "mindmaps"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
