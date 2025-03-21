import useNoteStore from "../store/store";
import { TBackgroundColors, TNOte } from "../types/types";

const DashboardSidebar = () => {
  const { createNote } = useNoteStore();

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

    await createNote(data);
  };

  return (
    <div className="w-full md:w-[300px] h-full border-l border-slate-300 p-3">
      <div className="flex flex-col gap-2">
        <span>یادداشت جدید</span>
        <div className="flex gap-4">
          {backgroundColors.map((item) => (
            <div
              key={item}
              style={{ backgroundColor: item }}
              className="w-full h-6 rounded-lg border border-white cursor-pointer"
              onClick={() => createHandler(item)}
            ></div>
          ))}
        </div>
      </div>
      {/* <button
        onClick={() => createHandler()}
        className="w-full p-3 bg-orange-400 hover:bg-orange-600 text-white rounded-full transition-all "
      >
        یادداشت جدید
      </button> */}
    </div>
  );
};

export default DashboardSidebar;
