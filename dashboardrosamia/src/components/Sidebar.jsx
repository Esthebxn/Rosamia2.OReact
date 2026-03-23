import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">Rosamia</div>
        <div className="sidebar-subtitle">Dashboard de administración</div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/productos"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          Productos
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        Panel interno Rosamia
      </div>
    </aside>
  );
};

export default Sidebar;
