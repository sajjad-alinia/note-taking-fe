import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-slate-300 h-screen w-full">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
