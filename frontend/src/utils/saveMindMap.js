import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function saveMindMap(uid, mapId, data) {
  console.log("Saving mindmap with uid:", uid);
  await setDoc(doc(db, "users", uid, "mindmaps", mapId), data);
}