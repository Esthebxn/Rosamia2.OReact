import React from "react";

const Topbar = () => {
  const fecha = new Date().toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="topbar">
      <div className="topbar-title">Dashboard Rosamia</div>
      <div className="topbar-date">{fecha}</div>
    </header>
  );
};

export default Topbar;
