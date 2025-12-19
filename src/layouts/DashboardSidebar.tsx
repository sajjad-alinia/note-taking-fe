import { useEffect } from "react";
import useNoteStore from "../store/store";
import { TNOte } from "../types/types";
import { getNoteById } from "../db/db";
import ThemeToggle from "../common/utils/ThemeToggle";
import { stripHtmlTags } from "../common/utils/HtmlStripper";

const DashboardSidebar = () => {
  const { createNote, setNoteSelected } = useNoteStore();

  const createHandler = async () => {
    const date = new Date().toISOString();
    const data: TNOte = {
      title: "",
      content: "",
      createdAt: date,
      updatedAt: date,
      setting: {
        theme: {
          background: "bg-note-2",
        },
      },
    };

    await createNote(data).then((id) => {
      data.id = id;
      setNoteSelected(data);
    });
  };

  return (
    <div className="w-full md:w-[300px] h-full p-3  bg-secondary">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <ThemeToggle />
        </div>
        <div className="flex gap-4">
          <button
            className={`w-full py-2 text-text  bg-primary rounded-md cursor-pointer `}
            onClick={createHandler}
          >
            یادداشت جدید +
          </button>
        </div>
        <NoteList />
      </div>
    </div>
  );
};

export default DashboardSidebar;

const NoteList = () => {
  const { notes, setNoteSelected, fetchNotes } = useNoteStore();

  const ClickHandler = async (data: TNOte) => {
    const note = await getNoteById(data.id!);
    setNoteSelected(note);
  };

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
      <span className="text-text text-sm text-center border-b border-primary pb-2.5">
        لیست یادداشت ها
      </span>
      {notes.map((item) => (
        <div
          className={`flex flex-col gap-2 p-3 rounded-md cursor-pointer ${item.setting?.theme.background}`}
          key={item.id}
          onClick={() => ClickHandler(item)}
        >
          <p className="text-sm font-bold">{item.title || "بدون عنوان"}</p>
          <p className="line-clamp-2 text-xs truncate">
            {stripHtmlTags(item.content) || "بدون محتوا"}
          </p>
        </div>
      ))}
    </div>
  );
};
