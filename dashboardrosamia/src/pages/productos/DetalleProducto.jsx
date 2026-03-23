import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import "./DetalleProducto.css";

const API_URL = "/api/productos";
const FALLBACK_IMAGE = "https://via.placeholder.com/600x600?text=Sin+Imagen";
const WHATSAPP_NUMBER = "51999999999";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
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

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Detalle del producto"
          subtitle="Revisa la informaciÃ³n completa del producto seleccionado."
        />
        <div className="loading-box">
          <div className="loading-center">
            <div className="spinner"></div>
            <div>
              <strong>Cargando producto...</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader
          title="Detalle del producto"
          subtitle="Revisa la informaciÃ³n completa del producto seleccionado."
        />
        <div className="error-box">
          <h3>âš ï¸ Error</h3>
          <p>{error}</p>
          <div className="detalle-actions">
            <button className="btn-primary" onClick={fetchProducto}>
              Reintentar
            </button>
            <button className="btn-secondary" onClick={() => navigate("/productos")}>
              Volver a productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div>
        <PageHeader
          title="Detalle del producto"
          subtitle="Revisa la informaciÃ³n completa del producto seleccionado."
        />
        <div className="empty-box">
          <h3>Producto no encontrado</h3>
          <button className="btn-primary" onClick={() => navigate("/productos")}>
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  const mensaje = `Hola, me interesa este producto:\nProducto: ${producto.name}\nPrecio: S/ ${Number(
    producto.price || 0
  ).toFixed(2)}`;

  return (
    <div>
      <PageHeader
        title="Detalle del producto"
        subtitle="Revisa la informaciÃ³n completa del producto seleccionado."
      />

      <div className="detalle-breadcrumb">
        <Link to="/dashboard">Inicio</Link>
        <span> / </span>
        <Link to="/productos">Productos</Link>
        <span> / </span>
        <span>{producto.name}</span>
      </div>

      <div className="detalle-producto-card">
        <div className="detalle-imagen">
          <img
            src={producto.image || FALLBACK_IMAGE}
            alt={producto.name || "Producto"}
            onError={handleImageError}
          />
        </div>

        <div className="detalle-info">
          <span className="detalle-categoria">
            {producto.category || "Sin categorÃ­a"}
          </span>

          <h1>{producto.name || "Producto sin nombre"}</h1>

          <p className="detalle-precio">
            S/ {Number(producto.price || 0).toFixed(2)}
          </p>

          <p
            className={`detalle-estado ${
              Number(producto.active) === 1 ? "activo" : "inactivo"
            }`}
          >
            {Number(producto.active) === 1 ? "Disponible" : "No disponible"}
          </p>

          <div className="detalle-descripcion">
            <h3>DescripciÃ³n</h3>
            <p>
              {producto.description || "Este producto no tiene descripciÃ³n registrada."}
            </p>
          </div>

          <div className="detalle-actions">
            <button
              onClick={() => navigate("/productos")}
              className="btn-secondary"
            >
              Volver
            </button>

            <a
              className="btn-success"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
