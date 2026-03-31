import React from 'react';
import './Enviosyentrega.css';

const Enviosyentrega = ({ showEnvio = true }) => {
  if (!showEnvio) return null;

  // URL de la imagen de Huánuco
  const huanucoImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQavvCoM90paU8OFuCnLRqyfKNbhHpUoR3BtA&s";

  return (
    <section className="envio-section">
      <div className="container">
        <h2>Envíos y Entregas a todo Huánuco 🚀</h2>

        <div className="envio-grid">
          {/* Columna izquierda - Información */}
          <div className="envio-info">
            <h3>Zonas de entrega</h3>
            <p>
              Realizamos envíos a toda la ciudad de Huánuco y provincias aledañas. 
              <strong> ¡Llegamos a donde estés!</strong>
            </p>

            <h3>Tiempos de entrega</h3>
            <ul>
              <li>Ciudad de Huánuco: <strong>24 horas</strong></li>
              <li>Provincias cercanas: <strong>48-72 horas</strong></li>
              <li>Zonas rurales: <strong>Consultar disponibilidad</strong></li>
            </ul>

            <h3>Costo de envío</h3>
            <ul>
              <li>Centro de Huánuco: <strong>Gratis</strong> (pedidos mínimos S/ 80)</li>
              <li>Distritos aledaños: <strong>S/ 5 - S/ 10</strong></li>
              <li>Provincias: <strong>S/ 10 - S/ 25</strong> según distancia</li>
            </ul>

            <h3>Horarios de entrega</h3>
            <ul>
              <li>Lunes a Sábado: <strong>8:00 am - 8:00 pm</strong></li>
              <li>Domingos y feriados: <strong>9:00 am - 6:00 pm</strong></li>
              <li>Entregas express disponibles</li>
            </ul>

            <div className="contact-info">
              <h3>¿Necesitas ayuda?</h3>
              <p>📞 (062) 123456</p>
              <p>📧 envios@tuempresa.com</p>
              <p>📍 Av. Leoncio Prado 123, Huánuco</p>
            </div>
          </div>

          {/* Columna derecha - Imagen + cobertura */}
          <div className="envio-visual">
            <div className="huanuco-image-container">
              <img
                src={huanucoImage}
                alt="Mapa de cobertura de envíos en Huánuco"
                className="huanuco-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />

              {/* Overlay con información */}
              <div className="image-overlay">
                <h3>Cobertura Total en Huánuco</h3>
                <p>Entregamos en toda la región</p>
              </div>
            </div>

            <div className="coverage-list">
              <h4>🗺️ Zonas de Cobertura</h4>
              <div className="coverage-columns">
                <ul>
                  <li><span className="checkmark">✓</span> Huánuco Centro</li>
                  <li><span className="checkmark">✓</span> Pillco Marca</li>
                  <li><span className="checkmark">✓</span> Amarilis</li>
                  <li><span className="checkmark">✓</span> Ambo</li>
                </ul>
                <ul>
                  <li><span className="checkmark">✓</span> Yacus</li>
                  <li><span className="checkmark">✓</span> Margos</li>
                  <li><span className="checkmark">✓</span> Santa María</li>
                  <li><span className="checkmark">✓</span> San Rafael</li>
                </ul>
              </div>
            </div>

            {/* Timeline de entrega */}
            <div className="delivery-process">
              <h4>📦 Proceso de Entrega</h4>
              <div className="delivery-timeline">
                <div className="timeline-step active">
                  <div className="step-icon">📝</div>
                  <div className="step-content">
                    <div className="step-title">Pedido</div>
                    <div className="step-desc">Recibimos tu pedido</div>
                  </div>
                </div>
                
                <div className="timeline-step">
                  <div className="step-icon">👩‍🍳</div>
                  <div className="step-content">
                    <div className="step-title">Preparación</div>
                    <div className="step-desc">Preparamos tu pedido</div>
                  </div>
                </div>
                
                <div className="timeline-step">
                  <div className="step-icon">🚚</div>
                  <div className="step-content">
                    <div className="step-title">Envío</div>
                    <div className="step-desc">Lo enviamos a tu zona</div>
                  </div>
                </div>
                
                <div className="timeline-step">
                  <div className="step-icon">🏠</div>
                  <div className="step-content">
                    <div className="step-title">Entrega</div>
                    <div className="step-desc">Llega a tu domicilio</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="important-note">
          <div className="note-icon">💡</div>
          <div className="note-content">
            <h5>Información Importante</h5>
            <p>
              Para pedidos fuera de la ciudad de Huánuco, consulta disponibilidad 
              y tiempos con anticipación. Aceptamos pagos contra entrega en la mayoría de zonas.
            </p>
          </div>
        </div>

        <div className="delivery-features">
          <div className="feature">
            <div className="feature-icon">🚀</div>
            <h5>Envío Rápido</h5>
            <p>Entregas express disponibles</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📱</div>
            <h5>Seguimiento</h5>
            <p>Rastrea tu pedido en tiempo real</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔄</div>
            <h5>Flexibilidad</h5>
            <p>Cambia hora/lugar de entrega</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enviosyentrega; 