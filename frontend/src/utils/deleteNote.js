import {doc,deleteDoc } from "firebase/firestore";
import {db} from "../firebase";
export async function deleteNote(uid, noteId) {
  await deleteDoc(doc(db, "users", uid, "notes", noteId));
}
