import { create } from "zustand";
import { TNOte } from "../types/types";
import { addNote, deleteNote, getNotes } from "../db/db";

type TNoteStore = {
  notes: TNOte[];
  filteredNotes: TNOte[];
  fetchNotes: () => Promise<void>;
  createNote: (data: TNOte) => Promise<void>;
  removeNote: (id: number) => Promise<void>;
  searchNotes: (query: string) => Promise<void>;
};

const useNoteStore = create<TNoteStore>((set) => ({
  notes: [],
  filteredNotes: [],

  fetchNotes: async () => {
    const notes = await getNotes();
    set({ notes });
  },

  createNote: async (data: TNOte) => {
    await addNote({ ...data }).then((id) => {
      data.id = Number(id);
      set((state) => ({
        notes: [...state.notes, data],
        filteredNotes: [],
      }));
    });
    // const notes = await getNotes();
  },

  removeNote: async (id: number) => {
    await deleteNote(id);
    const notes = await getNotes();
    set({ notes });
  },
  searchNotes: async (query: string) => {
    const notes = await getNotes();
    if (!query.length) {
      set({ filteredNotes: [] });
      return;
    }

    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );

    set({ filteredNotes });
  },
}));

export default useNoteStore;
