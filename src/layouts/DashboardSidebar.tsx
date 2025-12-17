import { useEffect } from "react";
import useNoteStore from "../store/store";
import { TBackgroundColors, TNOte } from "../types/types";
import { getNoteById } from "../db/db";
import ThemeToggle from "../common/utils/ThemeToggle";

const DashboardSidebar = () => {
  const { createNote, setNoteSelected } = useNoteStore();

  const backgroundColors: TBackgroundColors[] = [
    "#F5F5DC",
    "#ADD8E6",
    "#98FF98",
    "#FFC0CB",
  ];

  const createHandler = async (color: TBackgroundColors) => {
    const date = new Date().toISOString();
    const data: TNOte = {
      title: "",
      content: "",
      createdAt: date,
      updatedAt: date,
      setting: {
        theme: {
          background: color,
        },
      },
    };

    await createNote(data).then((id) => {
      data.id = id;
      setNoteSelected(data);
    });
  };

  return (
    <div className="w-full md:w-[300px] h-full shadow-lg border-slate-300 p-3 bg-secondary">
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-text">یادداشت جدید</span>
          <ThemeToggle />
        </div>
        <div className="flex gap-4">
          {backgroundColors.map((item) => (
            <div
              key={item}
              style={{ backgroundColor: item }}
              className="w-full h-6 rounded-lg border border-gray-300 cursor-pointer"
              onClick={() => createHandler(item)}
            ></div>
          ))}
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
      {notes.map((item) => (
        <div
          className="flex flex-col gap-2 p-3 rounded-md cursor-pointer"
          style={{ backgroundColor: item.setting?.theme.background }}
          key={item.id}
          onClick={() => ClickHandler(item)}
        >
          <p className="text-sm font-bold">{item.title || "بدون عنوان"}</p>
          <p className="line-clamp-2 text-xs">{item.content || "بدون محتوا"}</p>
        </div>
      ))}
    </div>
  );
};
