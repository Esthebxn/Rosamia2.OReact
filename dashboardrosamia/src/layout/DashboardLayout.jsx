import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-content-area">
        <Topbar />
        <main className="dashboard-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
