import { create } from "zustand";
import { TNOte } from "../types/types";
import { addNote, deleteNote, getNotes } from "../db/db";

type TNoteStore = {
  notes: TNOte[];
  filteredNotes: TNOte[];
  noteSelected: TNOte | null;

  fetchNotes: () => Promise<void>;
  createNote: (data: TNOte) => Promise<number>;
  removeNote: (id: number) => Promise<void>;
  searchNotes: (query: string) => Promise<void>;
  setNoteSelected: (data: TNOte | null) => void;
};
const useNoteStore = create<TNoteStore>((set) => ({
  notes: [],
  filteredNotes: [],
  noteSelected: null,

  fetchNotes: async () => {
    const notes = await getNotes();
    set({ notes });
  },

  createNote: async (data: TNOte) => {
    const id = await addNote({ ...data });
    data.id = Number(id);
    set((state) => ({
      notes: [data, ...state.notes],
      filteredNotes: [],
    }));
    return data.id;
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

  setNoteSelected: (data: TNOte | null) => {
    set({ noteSelected: data });
  },
}));

export default useNoteStore;
