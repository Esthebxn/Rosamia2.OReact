import React, { useState } from 'react';
import './Productos.css';

const Productos = () => {
  const [products] = useState([
    { 
      id: 1, 
      name: 'Combo AMOR', 
      price: 445.00, 
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 2, 
      name: 'Combo Cumpleaños', 
      price: 340.00, 
      image: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 3, 
      name: 'Dulce Chocolate de Nutella', 
      price: 250.00, 
      image: 'https://images.unsplash.com/photo-1570913149827-b2b1d16b4f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 4, 
      name: 'Dulce Corazón', 
      price: 110.00, 
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 5, 
      name: 'Dulzura de Oreo', 
      price: 185.00, 
      image: 'https://images.unsplash.com/photo-1623334044303-241021148842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 6, 
      name: 'Mi Chocolatito', 
      price: 150.00, 
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 7, 
      name: 'Ositos dulces', 
      price: 200.00, 
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 8, 
      name: 'Pastel - Enamorados', 
      price: 220.00, 
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 9, 
      name: 'Torta de Frutas', 
      price: 280.00, 
      image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 10, 
      name: 'Cupcakes Especiales', 
      price: 165.00, 
      image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ]);

  return (
    <div className="productos-container">
      <div className="header-content">
        <h1 className="productos-titulo">Nuestros Productos</h1>
      </div>
      
      <div className="productos-grid">
        {products.map((product) => (
          <div key={product.id} className="producto-card">
            <div className="producto-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="producto-info">
              <h3>{product.name}</h3>
              <p className="precio">S/ {product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;  