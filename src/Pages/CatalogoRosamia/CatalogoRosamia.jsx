import React, { useState } from 'react';
import { Download, FileText, Flower, Star, CheckCircle } from 'lucide-react';
import './CatalogoRosamia.css';

const CatalogoRosamia = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Información del catálogo
  const catalogInfo = {
    title: "Catálogo Rosamia 2024",
    description: "Descubre nuestra exclusiva colección de productos con diseños florales únicos",
    fileSize: "8.5 MB",
    pages: 24,
    lastUpdate: "15 Noviembre 2024",
    featuredCategories: [
      "Decoración Floral",
      "Textiles con Flores",
      "Accesorios Botánicos",
      "Hogar y Jardín"
    ]
  };

  // URL del archivo PDF (reemplazar con tu archivo real)
  const pdfUrl = "/catalogo-rosamia-2024.pdf";

  const handleDownload = () => {
    setIsLoading(true);
    
    // Simulación de descarga
    setTimeout(() => {
      // Crear enlace temporal para descarga
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `catalogo-rosamia-${new Date().getFullYear()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsLoading(false);
      setDownloadSuccess(true);
      
      // Resetear mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="catalogo-container">
      {/* Banner floral */}
      <div className="catalogo-banner">
        <div className="floral-decoration">
          <Flower className="floral-icon floral-1" />
          <Flower className="floral-icon floral-2" />
          <Flower className="floral-icon floral-3" />
        </div>
        <h1 className="catalogo-title">
          <span className="title-flower">🌸</span>
          {catalogInfo.title}
          <span className="title-flower">🌸</span>
        </h1>
        <p className="catalogo-subtitle">
          Tu guía completa de productos con inspiración floral
        </p>
      </div>

      <div className="catalogo-content">
        {/* Información del catálogo */}
        <div className="catalogo-info-card">
          <div className="info-header">
            <FileText className="info-icon" />
            <h2>Detalles del Catálogo</h2>
          </div>
          
          <div className="info-details">
            <div className="detail-item">
              <span className="detail-label">Tamaño del archivo:</span>
              <span className="detail-value">{catalogInfo.fileSize}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Número de páginas:</span>
              <span className="detail-value">{catalogInfo.pages}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Última actualización:</span>
              <span className="detail-value">{catalogInfo.lastUpdate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Formato:</span>
              <span className="detail-value">PDF de alta calidad</span>
            </div>
          </div>

          {/* Categorías destacadas */}
          <div className="featured-categories">
            <h3>
              <Star className="star-icon" />
              Categorías Destacadas
            </h3>
            <ul className="categories-list">
              {catalogInfo.featuredCategories.map((category, index) => (
                <li key={index} className="category-item">
                  <CheckCircle className="check-icon" />
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Botón de descarga principal */}
        <div className="download-section">
          <div className="download-card">
            <div className="download-icon-container">
              <Download className="download-icon" />
            </div>
            
            <div className="download-info">
              <h3>¡Listo para Descargar!</h3>
              <p>
                Obtén nuestro catálogo completo en formato PDF. 
                Incluye fotografías en alta resolución, especificaciones 
                técnicas y precios de todos nuestros productos.
              </p>
              
              <div className="download-features">
                <div className="feature">
                  <span className="feature-badge">📱</span>
                  <span>Compatible con móviles</span>
                </div>
                <div className="feature">
                  <span className="feature-badge">🖨️</span>
                  <span>Listo para imprimir</span>
                </div>
                <div className="feature">
                  <span className="feature-badge">🔍</span>
                  <span>Texto buscable</span>
                </div>
              </div>
            </div>

            <button 
              className={`download-button ${isLoading ? 'loading' : ''} ${downloadSuccess ? 'success' : ''}`}
              onClick={handleDownload}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Procesando...
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle className="success-icon" />
                  ¡Descargado!
                </>
              ) : (
                <>
                  <Download className="button-icon" />
                  Descargar Catálogo
                </>
              )}
            </button>

            {/* Información adicional */}
            <div className="additional-info">
              <p className="file-info">
                <FileText className="small-icon" />
                Archivo: <strong>catalogo-rosamia-2024.pdf</strong>
              </p>
              <p className="note">
                * El catálogo se abrirá en una nueva ventana. 
                Puedes guardarlo en tu dispositivo para consultarlo offline.
              </p>
            </div>
          </div>

          {/* Previsualización */}
          <div className="preview-section">
            <h3>Vista Previa del Catálogo</h3>
            <div className="preview-images">
              <div className="preview-image preview-1">
                <div className="preview-label">Portada</div>
              </div>
              <div className="preview-image preview-2">
                <div className="preview-label">Productos Destacados</div>
              </div>
              <div className="preview-image preview-3">
                <div className="preview-label">Colección Floral</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mensaje de éxito */}
      {downloadSuccess && (
        <div className="success-message">
          <CheckCircle className="message-icon" />
          <div>
            <h4>¡Descarga completada!</h4>
            <p>El catálogo se ha descargado correctamente. Revisa tu carpeta de descargas.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogoRosamia; 