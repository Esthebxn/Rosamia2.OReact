import React, { useState, useEffect } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import axios from 'axios';
import './CatalogoRosamia.css';

const CatalogoRosamia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [catalogo, setCatalogo] = useState(null);
  const [isLoadingCatalogo, setIsLoadingCatalogo] = useState(true); // Nuevo estado para la carga del catálogo
  const [error, setError] = useState(null); // Estado para manejar errores

  // 1. Cargar el catálogo desde la API al iniciar
  useEffect(() => {
    const fetchCatalogo = async () => {
      try {
        setIsLoadingCatalogo(true);
        setError(null);
        const res = await axios.get("http://localhost:5000/api/catalogo"); 
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
      // 2. Ruta dinámica usando la URL de tu backend y el nombre del archivo de la BD
      const pdfUrl = `http://localhost:5000/uploads/${catalogo.archivo_pdf}`;
      
      // Crear un enlace para descargar
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = catalogo.archivo_pdf || 'catalogo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3. Opcional: Avisar al backend que hubo una descarga
      await axios.put(`http://localhost:5000/api/catalogo/descarga/${catalogo.id}`);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (error) {
      alert("Error al descargar el archivo");
      console.error("Error en descarga:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar estado de carga
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

  // Mostrar error si hay
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
        {/* Usamos el título que viene de la base de datos con validación */}
        <h1 className="catalogo-title">
          {catalogo ? `¡${catalogo.titulo || "Catálogo"} listo!` : "Catálogo"}
        </h1>

        <p className="catalogo-description">
          {catalogo 
            ? `Obtén nuestro catálogo actualizado. ${catalogo.anio ? `Versión año: ${catalogo.anio}` : ''}`
            : "Obtén nuestro catálogo actualizado."}
        </p>

        <button 
          className={`download-button ${isLoading ? 'loading' : ''} ${downloadSuccess ? 'success' : ''}`}
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