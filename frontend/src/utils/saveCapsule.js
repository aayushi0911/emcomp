import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function saveCapsule(uid, capsuleId, data) {
  await setDoc(doc(db, "users", uid, "capsules", capsuleId), data);
}
