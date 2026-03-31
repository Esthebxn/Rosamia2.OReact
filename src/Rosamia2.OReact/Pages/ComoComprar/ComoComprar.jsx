// ComoComprar.jsx
import React, { useState } from 'react';
import { FiMaximize, FiMinimize, FiX } from 'react-icons/fi';
import './ComoComprar.css';

const ComoComprar = () => {
  const [showEnvio, setShowEnvio] = useState(true);

  return (
    <div className="comocomprar-container">
      <section className="comocomprar-hero">
        <h1>Cómo Comprar</h1>
        <p>Guía simple para realizar tu pedido en Florería Elegante</p>
      </section>

      <section className="pasos-section">
        <h2>Proceso de Compra</h2>
        <div className="pasos-container">
          <div className="paso-card">
            <div className="paso-numero">1</div>
            <h3>Elige tu arreglo</h3>
            <p>Explora nuestra galería y selecciona el diseño que más te guste.</p>
          </div>
          <div className="paso-card">
            <div className="paso-numero">2</div>
            <h3>Personaliza</h3>
            <p>
              Selecciona colores, añade un mensaje personalizado o modifica el
              diseño según tus preferencias.
            </p>
          </div>
          <div className="paso-card">
            <div className="paso-numero">3</div>
            <h3>Completa tus datos</h3>
            <p>
              Proporciona información de envío y contacto para procesar tu
              pedido.
            </p>
          </div>
          <div className="paso-card">
            <div className="paso-numero">4</div>
            <h3>Realiza el pago</h3>
            <p>Elige tu método de pago preferido y confirma tu compra.</p>
          </div>
          <div className="paso-card">
            <div className="paso-numero">5</div>
            <h3>Recibe tu pedido</h3>
            <p>
              Preparamos y entregamos tu arreglo floral en el lugar y fecha
              indicados.
            </p>
          </div>
        </div>
      </section>


    

     
    </div>
  );
};

export default ComoComprar;
