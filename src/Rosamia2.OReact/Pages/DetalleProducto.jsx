import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "./DetalleProducto.css";

const API_URL = "/api/productos";
const FALLBACK_IMAGE = "https://via.placeholder.com/900x900?text=Sin+Imagen";
const WHATSAPP_NUMBER = "51999999999";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [selectedImage, setSelectedImage] = useState(FALLBACK_IMAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducto();
  }, [id]);

  const fetchProducto = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "No se pudo cargar el producto");
      }

      setProducto(result.data);
    } catch (err) {
      console.error("Error detalle producto:", err);
      setError(err.message || "Error al cargar el producto");
    } finally {
      setLoading(false);
    }
  };

  const images = useMemo(() => {
    if (!producto) return [FALLBACK_IMAGE];

    const lista = [
      producto.image,
      producto.image2,
      producto.image3,
      producto.image4
    ].filter(Boolean);

    return lista.length ? lista : [FALLBACK_IMAGE];
  }, [producto]);

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  if (loading) {
    return (
      <div className="detalle-page">
        <div className="detalle-status-card">
          <div className="spinner"></div>
          <p>Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detalle-page">
        <div className="detalle-status-card">
          <h2>Error HTTP: {error}</h2>
          <div className="detalle-status-actions">
            <button onClick={fetchProducto}>Reintentar</button>
            <button onClick={() => navigate("/productos")}>Volver</button>
          </div>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="detalle-page">
        <div className="detalle-status-card">
          <h2>Producto no encontrado</h2>
          <button onClick={() => navigate("/productos")}>Volver a productos</button>
        </div>
      </div>
    );
  }

  const precioEfectivo = Number(producto.price || 0);
  const precioTarjeta = precioEfectivo * 1.05;
  const codigo = String(producto.id).padStart(6, "0");

  const mensaje = `Hola, me interesa este producto:
Producto: ${producto.name}
Precio en efectivo: S/ ${precioEfectivo.toFixed(2)}
Precio con tarjeta: S/ ${precioTarjeta.toFixed(2)}`;

  return (
    <div className="detalle-page">
      <div className="detalle-breadcrumb">
        <Link to="/inicio">Inicio</Link>
        <span> / </span>
        <Link to="/productos">Productos</Link>
        <span> / </span>
        <span>{producto.name}</span>
      </div>

      <div className="detalle-layout">
        <div className="detalle-gallery">
          <div className="detalle-thumbs">
            {images.map((img, index) => (
              <button
                type="button"
                key={`${img}-${index}`}
                className={`thumb-item ${selectedImage === img ? "active" : ""}`}
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`Vista ${index + 1}`}
                  onError={handleImageError}
                />
              </button>
            ))}
          </div>

          <div className="detalle-main-image">
            <img
              src={selectedImage || FALLBACK_IMAGE}
              alt={producto.name || "Producto"}
              onError={handleImageError}
            />
          </div>
        </div>

        <aside className="detalle-summary">
          <div className="detalle-brand">
            {(producto.category || "ROSAMIA").toUpperCase()}
          </div>

          <h1 className="detalle-title">
            {String(producto.name || "Producto sin nombre").toUpperCase()}
          </h1>

          <p className="detalle-code">
            <strong>Código:</strong> {codigo}
          </p>

          <a
            className="detalle-whatsapp-btn"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={24} />
            <span>Compra vía WhatsApp</span>
          </a>

          <div className="detalle-price-box">
            <p className="detalle-price-label">Pagando con Efectivo</p>
            <div className="detalle-price-row">
              <span className="detalle-price-main">S/. {precioEfectivo.toFixed(2)}</span>
            </div>
          </div>

          <div className="detalle-price-box">
            <p className="detalle-price-label">Pagando con Tarjeta (+5%)</p>
            <div className="detalle-price-row">
              <span className="detalle-price-secondary">S/. {precioTarjeta.toFixed(2)}</span>
            </div>
          </div>

          <p className="detalle-igv">El precio incluye IGV.</p>

          <div className="detalle-description-box">
            <h3>Descripción</h3>
            <p>
              {producto.description || "Este producto no tiene descripción registrada."}
            </p>
          </div>

          <div className="detalle-extra-actions">
            <button onClick={() => navigate("/productos")} className="btn-back">
              Volver a productos
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DetalleProducto;