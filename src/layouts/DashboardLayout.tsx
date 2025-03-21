import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

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
  const fullname = localStorage.getItem("fullname");
  return <div className="w-full shadow-md p-3">{fullname}</div>;
};
