import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "./Productos.css";

const API_URL = "/api/productos";
const FALLBACK_IMAGE = "https://via.placeholder.com/500x500?text=Sin+Imagen";
const WHATSAPP_NUMBER = "51999999999";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success || !Array.isArray(data.data)) {
        throw new Error("La respuesta del servidor no tiene el formato esperado");
      }

      const productosActivos = data.data.filter((product) => {
        if (product.active === undefined || product.active === null) return true;
        return Number(product.active) === 1;
      });

      setProducts(productosActivos);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Error de conexión con el servidor");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = FALLBACK_IMAGE;
  };

  const handleComprar = (product) => {
    const nombre = product.name || "Producto";
    const precio = Number(product.price || 0).toFixed(2);
    const mensaje = `Hola, me interesa este producto:\nProducto: ${nombre}\nPrecio: S/ ${precio}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  if (loading) {
    return (
      <div className="productos-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="productos-container">
        <div className="error">
          <h2>Error HTTP: {error}</h2>
          <button onClick={fetchProductos}>Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="productos-container">
      <div className="header-content">
        <h1 className="productos-titulo">Nuestros Productos</h1>
        <p className="productos-subtitulo">
          Descubre nuestra selección exclusiva de flores y arreglos
        </p>
      </div>

      <div className="productos-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="producto-card">
              <div className="producto-image">
                <img
                  src={product.image || FALLBACK_IMAGE}
                  alt={product.name || "Producto"}
                  onError={handleImageError}
                />
              </div>

              <div className="producto-info">
                <h3>{product.name || "Producto sin nombre"}</h3>
                <p className="categoria">{product.category || "Sin categoría"}</p>
                <p className="precio">
                  S/ {Number(product.price || 0).toFixed(2)}
                </p>

                {product.description && (
                  <p className="descripcion">{product.description}</p>
                )}

                <div className="producto-actions">
                  <Link to={`/productos/${product.id}`} className="detalle-btn">
                    Ver detalles
                  </Link>

                  <button
                    className="whatsapp-btn"
                    onClick={() => handleComprar(product)}
                  >
                    <FaWhatsapp size={18} />
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="error">
            <h2>No hay productos disponibles</h2>
            <button onClick={fetchProductos}>Recargar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos;