import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <h1 className="loading-title">Rosamia Detalles</h1>
        <p className="loading-text">Cargando tu experiencia...</p>
        
        <div className="spinner">
          <div className="spinner-circle"></div>
          <div className="rose-center"></div>
        </div>
        
        {/* Rosas flotantes */}
        <div className="roses-container">
          <div className="rose rose-1">
            <div className="petal p1"></div>
            <div className="petal p2"></div>
            <div className="petal p3"></div>
            <div className="petal p4"></div>
            <div className="petal p5"></div>
            <div className="rose-center-small"></div>
          </div>
          
          <div className="rose rose-2">
            <div className="petal p1"></div>
            <div className="petal p2"></div>
            <div className="petal p3"></div>
            <div className="petal p4"></div>
            <div className="petal p5"></div>
            <div className="rose-center-small"></div>
          </div>
          
          <div className="rose rose-3">
            <div className="petal p1"></div>
            <div className="petal p2"></div>
            <div className="petal p3"></div>
            <div className="petal p4"></div>
            <div className="petal p5"></div>
            <div className="rose-center-small"></div>
          </div>
          
          <div className="rose rose-4">
            <div className="petal p1"></div>
            <div className="petal p2"></div>
            <div className="petal p3"></div>
            <div className="petal p4"></div>
            <div className="petal p5"></div>
            <div className="rose-center-small"></div>
          </div>
          
          <div className="rose rose-5">
            <div className="petal p1"></div>
            <div className="petal p2"></div>
            <div className="petal p3"></div>
            <div className="petal p4"></div>
            <div className="petal p5"></div>
            <div className="rose-center-small"></div>
          </div>
        </div>
        
        <p className="loading-subtext">Preparando algo especial para ti...</p>
      </div>
    </div>
  );
};

export default Loading;