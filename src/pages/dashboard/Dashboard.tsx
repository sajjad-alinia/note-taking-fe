import { useEffect } from "react";
import useNoteStore from "../../store/store";
import NoteList from "./components/NoteList";

const Dashboard = () => {
  const { fetchNotes, notes, filteredNotes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="w-full">
      {filteredNotes.length ? (
        <div className="p-3">{filteredNotes.length} نوت</div>
      ) : (
        ""
      )}
      <NoteList notes={filteredNotes.length ? filteredNotes : notes} />
    </div>
  );
};
export default Dashboard;
