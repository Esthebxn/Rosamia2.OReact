import React from "react";
import "./NuestrosProductosEnVideos.css";

const NuestrosProductosEnVideos = () => {
  return (
    <div className="videos-page">
      <div className="videos-header">
        <h1>Nuestros Productos en Video</h1>
        <p>Mira nuestra presentación en video con audio.</p>
      </div>

      <div className="video-wrapper">
        <video
          className="video-player"
          controls
          preload="auto"
        >
          <source src="/productosenvideo.mp4" type="video/mp4" />
          Tu navegador no soporta video.
        </video>
      </div>
    </div>
  );
};

export default NuestrosProductosEnVideos;
