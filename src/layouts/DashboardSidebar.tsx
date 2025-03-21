import useNoteStore from "../store/store";
import { TNOte } from "../types/types";

const DashboardSidebar = () => {
  const { createNote } = useNoteStore();

  const createHandler = async () => {
    const date = new Date().toISOString();
    const data: TNOte = {
      title: "",
      content: "",
      createdAt: date,
      updatedAt: date,
    };
    await createNote(data);
  };

  return (
    <div className="w-full md:w-[300px] h-full border-l border-slate-300 p-3">
      <button
        onClick={() => createHandler()}
        className="w-full p-3 bg-orange-400 hover:bg-orange-600 text-white rounded-full transition-all "
      >
        یادداشت جدید
      </button>
    </div>
  );
};

export default DashboardSidebar;
