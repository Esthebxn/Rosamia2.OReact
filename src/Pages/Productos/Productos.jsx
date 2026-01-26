import React, { useState, useEffect } from 'react';
import './Productos.css';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/productos');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        setError('Error al cargar productos');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="productos-container">
        <div className="loading">
          
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="productos-container">
        <div className="error">
          <h2>{error}</h2>
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
        
        </p>
      </div>
      
      <div className="productos-grid">
        {products.map((product) => (
          <div key={product.id} className="producto-card">
            <div className="producto-image">
              <img 
                src={product.image} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=Sin+Imagen';
                }}
              />
            </div>
            <div className="producto-info">
              <h3>{product.name}</h3>
              <p className="categoria">{product.category}</p>
              <p className="precio">S/ {parseFloat(product.price).toFixed(2)}</p>
              {product.description && (
                <p className="descripcion">{product.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos; 