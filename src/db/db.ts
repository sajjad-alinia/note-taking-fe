import { openDB } from "idb";
import { TNOte } from "../types/types";

const dbPromise = openDB("noteDB", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("notes")) {
      db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
    }
  },
});

export const getDB = async () => {
  return await dbPromise;
};

export const addNote = async (data: TNOte) => {
  const db = await getDB();
  return await db.put("notes", { ...data });
};

export const getNotes = async (): Promise<TNOte[]> => {
  const db = await getDB();
  return await db.getAll("notes");
};

export const deleteNote = async (id: number) => {
  const db = await getDB();
  return await db.delete("notes", id);
};

export const clearNotes = async () => {
  const db = await getDB();
  return await db.clear("notes");
};

export default dbPromise;
