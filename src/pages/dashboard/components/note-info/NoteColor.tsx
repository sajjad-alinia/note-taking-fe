import { useCallback } from "react";
// Types
import { TBackgroundColors } from "../../../../types/types";
// Store
import useNoteStore from "../../../../store/store";
// DB
import { updateNote } from "../../../../db/db";

const NoteColor = () => {
  const { noteSelected, setNoteSelected, fetchNotes } = useNoteStore();
  const backgroundColors: TBackgroundColors[] = [
    "bg-note-1",
    "bg-note-2",
    "bg-note-3",
    "bg-note-4",
  ];

  const updateColor = useCallback(
    async (color: TBackgroundColors) => {
      if (noteSelected?.id) {
        await updateNote(noteSelected.id, {
          setting: { theme: { background: color } },
        });
        setNoteSelected({
          ...noteSelected,
          setting: { theme: { background: color } },
        });
        fetchNotes();
      }
    },
    [noteSelected, setNoteSelected, fetchNotes]
  );

  return (
    <div className="flex gap-2">
      {backgroundColors.map((bgColor) => (
        <div key={bgColor} className="">
          <div
            onClick={() => updateColor(bgColor)}
            className={`w-8 h-8 rounded-md shadow-md cursor-pointer hover:scale-105 transition-all ${bgColor}`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default NoteColor;
