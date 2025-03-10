import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
// style
import "./index.css";
// toast
import { ToastContainer } from "react-toastify";
// pages
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer />
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        {/* <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Route> */}
      </Routes>
    </HashRouter>
  </StrictMode>
);
