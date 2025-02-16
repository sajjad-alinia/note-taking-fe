import { useEffect } from "react";
import useNoteStore from "../../store/store";
import NoteList from "./components/NoteList";

const Dashboard = () => {
  const { fetchNotes, notes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="w-full">
      <NoteList notes={notes} />
    </div>
  );
};
export default Dashboard;
