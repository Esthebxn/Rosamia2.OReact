import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto para cerrar menú al cambiar ruta
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  // Agrupar enlaces en categorías - CENTRADO
  const menuCategories = [
    {
      title: "INICIO",
      links: [
        { to: "/inicio", label: "INICIO" },
        { to: "/productos", label: "PRODUCTOS" },
        { to: "/nuestros-trabajos", label: "PRODUCTOS EN VIDEOS" },
        { to: "/catalogo", label: "DESCARGA NUESTRO CATÁLOGO" },
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

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <>
      {/* Navbar principal */}
      <nav className={`flower-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          {/* Menú principal - CENTRADO */}
          <div className={`nav-links ${isOpen ? "open" : ""}`}>
            {menuCategories.map((category, index) => (
              <div 
                key={index}
                className={`nav-category ${dropdownOpen === index ? "active" : ""}`}
                onMouseEnter={() => window.innerWidth > 768 && setDropdownOpen(index)}
                onMouseLeave={() => window.innerWidth > 768 && setDropdownOpen(null)}
              >
                <button 
                  className="category-title"
                  onClick={() => toggleDropdown(index)}
                >
                  {category.title}
                  <FiChevronDown className="dropdown-icon" />
                </button>
                <div className="dropdown-menu">
                  {category.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      to={link.to}
                      className={`dropdown-link ${location.pathname === link.to ? "active" : ""} ${
                        link.label === "DESCARGA NUESTRO CATÁLOGO" ? "catalogo-link" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Acciones - Solo botón hamburguesa */}
          <div className="nav-actions">
            <button 
              className="menu-toggle" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Indicador de página activa */}
        <div className="active-indicator">
          <div className="indicator-bar"></div>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 