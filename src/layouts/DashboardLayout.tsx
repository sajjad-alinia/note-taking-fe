import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="w-full h-screen bg-slate-100">
      <Navbar />
      <div className="flex w-full h-full">
        <Sidebar />
        <main className="p-3">
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

const Sidebar = () => {
  return (
    <div className="w-2/12 h-full border-l border-slate-300 p-3">asdfasdf</div>
  );
};
