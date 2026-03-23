import React, { useState, useEffect } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import axios from 'axios';
import './CatalogoRosamia.css';

const CatalogoRosamia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [catalogo, setCatalogo] = useState(null);
  const [isLoadingCatalogo, setIsLoadingCatalogo] = useState(true); // Nuevo estado para la carga del catÃƒÂ¡logo
  const [error, setError] = useState(null); // Estado para manejar errores

  // 1. Cargar el catÃƒÂ¡logo desde la API al iniciar
  useEffect(() => {
    const fetchCatalogo = async () => {
      try {
        setIsLoadingCatalogo(true);
        setError(null);
        const res = await axios.get("/api/catalogo"); 
        setCatalogo(res.data);
      } catch (error) {
        console.error("Error cargando catÃƒÂ¡logo:", error);
        setError("No se pudo cargar el catÃƒÂ¡logo. Por favor, intenta mÃƒÂ¡s tarde.");
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
      // 2. Ruta dinÃƒÂ¡mica usando la URL de tu backend y el nombre del archivo de la BD
      const pdfUrl = `/uploads/${catalogo.archivo_pdf}`;
      
      // Crear un enlace para descargar
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = catalogo.archivo_pdf || 'catalogo.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3. Opcional: Avisar al backend que hubo una descarga
      await axios.put(`/api/catalogo/descarga/${catalogo.id}`);

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
          <p className="loading-text">Cargando catÃƒÂ¡logo...</p>
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
        {/* Usamos el tÃƒÂ­tulo que viene de la base de datos con validaciÃƒÂ³n */}
        <h1 className="catalogo-title">
          {catalogo ? `Ã‚Â¡${catalogo.titulo || "CatÃƒÂ¡logo"} listo!` : "CatÃƒÂ¡logo"}
        </h1>

        <p className="catalogo-description">
          {catalogo 
            ? `ObtÃƒÂ©n nuestro catÃƒÂ¡logo actualizado. ${catalogo.anio ? `VersiÃƒÂ³n aÃƒÂ±o: ${catalogo.anio}` : ''}`
            : "ObtÃƒÂ©n nuestro catÃƒÂ¡logo actualizado."}
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
              Ã‚Â¡Descargado!
            </>
          ) : (
            <>
              <Download size={20} />
              Descargar CatÃƒÂ¡logo
            </>
          )}
        </button>

        {downloadSuccess && (
          <div className="success-message">
            <CheckCircle size={16} />
            <span>Ã‚Â¡CatÃƒÂ¡logo descargado exitosamente!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogoRosamia;