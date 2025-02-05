import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="bg-slate-300 w-fit h-screen">
      <Outlet />
    </div>
  );
};

export default HomeLayout;
