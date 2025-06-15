
import {collection,getDocs} from "firebase/firestore";
import {db} from "../firebase";
export async function getCapsules(uid) {
  const snapshot = await getDocs(collection(db, "users", uid, "capsules"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
