import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Outlet />
    </div>
  );
};

export default HomeLayout;
