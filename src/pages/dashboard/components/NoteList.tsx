import { TNOte } from "../../../types/types";
import NoteItem from "./NoteItem";

type TNoteList = {
  notes: TNOte[];
};

const NoteList = ({ notes }: TNoteList) => {
  return (
    <div className="grid grid-cols-4 gap-2.5 w-full">
      {notes.map((note) => (
        <NoteItem {...note} key={note.id} />
      ))}
    </div>
  );
};

export default NoteList;
