import { create } from "zustand";
import { TNOte } from "../types/types";
import { addNote, deleteNote, getNotes } from "../db/db";

type TNoteStore = {
  notes: TNOte[];
  fetchNotes: () => Promise<void>;
  createNote: (data: TNOte) => Promise<void>;
  removeNote: (id: number) => Promise<void>;
};

const useNoteStore = create<TNoteStore>((set) => ({
  notes: [],

  fetchNotes: async () => {
    const notes = await getNotes();
    set({ notes });
  },

  createNote: async (data: TNOte) => {
    await addNote({ ...data });
    const notes = await getNotes();
    set({ notes });
  },

  removeNote: async (id: number) => {
    await deleteNote(id);
    const notes = await getNotes();
    set({ notes });
  },
}));

export default useNoteStore;
