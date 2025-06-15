import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
export async function saveNote(uid, noteId, data) {
  await setDoc(doc(db, "users", uid, "notes", noteId), data);
}
