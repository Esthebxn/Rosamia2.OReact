import React, { useState, useEffect } from "react";
import { Download, CheckCircle } from "lucide-react";
import axios from "axios";
import "./CatalogoRosamia.css";

const API_BASE = "http://127.0.0.1:5001";

const CatalogoRosamia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [catalogo, setCatalogo] = useState(null);
  const [isLoadingCatalogo, setIsLoadingCatalogo] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalogo = async () => {
      try {
        setIsLoadingCatalogo(true);
        setError(null);

        const res = await axios.get(`${API_BASE}/api/catalogo`);
        setCatalogo(res.data);
      } catch (error) {
        console.error("Error cargando catálogo:", error);
        setError("No se pudo cargar el catálogo. Por favor, intenta más tarde.");
      } finally {
        setIsLoadingCatalogo(false);
      }
    };

    fetchCatalogo();
  }, []);

  const handleDownload = async () => {
    if (!catalogo) return;
    setIsLoading(true);

    try {
      const pdfUrl = `${API_BASE}/uploads/${catalogo.archivo_pdf}`;

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = catalogo.archivo_pdf || "rosamia7.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await axios.put(`${API_BASE}/api/catalogo/descarga/${catalogo.id}`);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (error) {
      alert("Error al descargar el archivo");
      console.error("Error en descarga:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingCatalogo) {
    return (
      <div className="catalogo-container">
        <div className="centered-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando catálogo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalogo-container">
        <div className="centered-content">
          <div className="error-message">
            <p>{error}</p>
            <button
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="catalogo-container">
      <div className="centered-content">
        <h1 className="catalogo-title">
          {catalogo ? `¡${catalogo.titulo || "Catálogo"} listo!` : "Catálogo"}
        </h1>

        <p className="catalogo-description">
          {catalogo
            ? `Obtén nuestro catálogo actualizado.${catalogo.anio ? ` Versión año: ${catalogo.anio}` : ""}`
            : "Obtén nuestro catálogo actualizado."}
        </p>

        <button
          className={`download-button ${isLoading ? "loading" : ""} ${downloadSuccess ? "success" : ""}`}
          onClick={handleDownload}
          disabled={isLoading || !catalogo}
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              Descargando...
            </>
          ) : downloadSuccess ? (
            <>
              <CheckCircle size={20} />
              ¡Descargado!
            </>
          ) : (
            <>
              <Download size={20} />
              Descargar Catálogo
            </>
          )}
        </button>

        {downloadSuccess && (
          <div className="success-message">
            <CheckCircle size={16} />
            <span>¡Catálogo descargado exitosamente!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogoRosamia;