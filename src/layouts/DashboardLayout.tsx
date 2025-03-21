import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent } from "react";
import useNoteStore from "../store/store";

const DashboardLayout = () => {
  return (
    <div className="w-full h-screen bg-slate-100">
      <Navbar />
      <div className="flex flex-col md:flex-row w-full h-full">
        <DashboardSidebar />
        <main className="w-full p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

const Navbar = () => {
  return (
    <div className="centering w-full shadow-md p-3">
      <Search />
    </div>
  );
};

const Search = () => {
  const { searchNotes } = useNoteStore();
  const changeHandler = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      searchNotes(query);
    },
    700
  );

  return (
    <div className="flex rounded-full px-2 shadow-md bg-white w-full md:w-[20%]">
      <input
        className="outline-0 bg-transparent w-full p-2"
        placeholder="جستجو"
        onChange={(e) => changeHandler(e)}
      />
      <div className="centering">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.742a6.5 6.5 0 1 0-1.397 1.397h-.002l3.646 3.646a1 1 0 0 0 1.415-1.415l-3.646-3.646zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>
    </div>
  );
};
