import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  // Datos del menú de navegación (resumen del Navbar)
  const menuSections = [
    {
      title: "INICIO",
      links: [
        { to: "/inicio", label: "INICIO" },
        { to: "/productos", label: "PRODUCTOS" },
        { to: "/nuestros-trabajos", label: "PRODUCTOS EN VIDEOS" },
        { to: "/catalogo", label: "DESCARGA NUESTRO CATÁLOGO" }, // CAMBIADO de "#" a "/catalogo"
      ]
    },
    {
      title: "INFORMACIÓN",
      links: [
        { to: "/nosotros", label: "NOSOTROS" },
      ]
    },
    {
      title: "AYUDA",
      links: [
        { to: "/como-comprar", label: "CÓMO COMPRAR" },
        { to: "/envios-y-entrega", label: "ENVÍOS Y ENTREGA" },
        { to: "/metodos-de-pago", label: "MÉTODOS DE PAGO" },
      ]
    }
  ];

  // Información de contacto (corregida según imagen)
  const contactInfo = {
    address: "Av. Principal 123, Huanuco, Perú",
    phone: "+51 987 654 321",
    email: "contacto@rosamia.com",
    hours: "Lun-Vie: 9:00 AM - 6:00 PM, Sáb: 10:00 AM - 2:00 PM"
  };

  // URL de Google Maps embebido (más precisa para Huanuco)
  const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249190.2035996733!2d-76.3862207!3d-9.9299445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a9a6c5b5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sHu%C3%A1nuco%2C%20Peru!5e0!3m2!1ses!2spe!4v1648661234567!5m2!1ses!2spe`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Logo y descripción - Ocupa más espacio */}
          <div className="footer-logo-section">
            <div className="footer-brand">
              <h2 className="footer-brand-title">Rosamia</h2>
              <p className="footer-brand-description">
                Productos de calidad para el hogar y la industria.
                Expertos en soluciones innovadoras para tus necesidades.
              </p>
            </div>
            
            {/* Información de contacto */}
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <p className="contact-label">Ubícanos</p>
                  <p className="contact-text">{contactInfo.address}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-label">Teléfono</p>
                  <p className="contact-text">{contactInfo.phone}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-text">{contactInfo.email}</p>
                </div>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <p className="contact-label">Horario de atención</p>
                  <p className="contact-text">{contactInfo.hours}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Menús de navegación - Según la imagen */}
          {menuSections.map((section, index) => (
            <div key={index} className="footer-menu-section">
              <h3 className="footer-menu-title">{section.title}</h3>
              <ul className="footer-menu-list">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="footer-menu-item">
                    <Link 
                      to={link.to} 
                      className="footer-menu-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Sección del Mapa de Google */}
        <div className="footer-map-section">
          <div className="map-header">
            <h2 className="map-title">Ubícanos en Google Maps</h2>
            <p className="map-description">
              Visita nuestra tienda física en Huanuco o contáctanos para cualquier consulta.
            </p>
          </div>
          
          {/* Mapa de Google Maps Embebido */}
          <div className="map-container">
            <div className="map-wrapper">
              <iframe
                title="Ubicación de Rosamia en Google Maps"
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-iframe"
              ></iframe>
            </div>
            <div className="map-attribution">
              <p>Huánuco, Perú - <a href={googleMapsEmbedUrl.replace('embed', 'view')} target="_blank" rel="noopener noreferrer" className="map-link">Ampliar el mapa</a></p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="copyright-section">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} <span className="brand-name">Rosamia</span>. Todos los derechos reservados.
            </p>
          </div>
          
          <div className="legal-links">
            <Link to="#" className="legal-link">Política de Privacidad</Link>
            <span className="link-separator">|</span>
            <Link to="#" className="legal-link">Términos y Condiciones</Link>
            <span className="link-separator">|</span>
            <Link to="#" className="legal-link">Aviso Legal</Link>
          </div>
          
          <div className="map-report">
            <a 
              href="https://www.google.com/maps" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-report-link"
            >
              Reportar un problema de Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 