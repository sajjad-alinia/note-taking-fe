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
  const notes = await db.getAll("notes");
  return notes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const deleteNote = async (id: number) => {
  const db = await getDB();
  return await db.delete("notes", id);
};

export const clearNotes = async () => {
  const db = await getDB();
  return await db.clear("notes");
};

export const updateNote = async (id: number, updatedData: Partial<TNOte>) => {
  const db = await getDB();
  const existingNote = await db.get("notes", id);

  if (!existingNote) {
    throw new Error("Note not found");
  }

  const updatedNote = { ...existingNote, ...updatedData };
  return await db.put("notes", updatedNote);
};

export const getNoteById = async (id: number) => {
  const db = await getDB();

  const note = await db.get("notes", id);
  return note;
};

export default dbPromise;
