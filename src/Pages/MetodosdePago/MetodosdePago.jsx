import React, { useState } from 'react';
import './MetodosdePago.css';

const MetodosdePago = () => {
  const [showYapeQR, setShowYapeQR] = useState(false);

  // Número de WhatsApp para enviar comprobante
  const whatsappNumber = "51999999999"; // Reemplaza con tu número
  const yapePhone = "999888777"; // Reemplaza con tu número Yape
  const yapeQRImage = "/images/yape-qr.jpg"; // Ruta de tu imagen QR

  const handleWhatsAppClick = () => {
    const message = `Hola, acabo de realizar un pago via Yape al número ${yapePhone}. Adjunto comprobante de pago.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="metodos-pago">
      <h2>Métodos de Pago</h2>
      
      <div className="pago-grid">
        <div 
          className={`metodo-pago ${showYapeQR ? 'active' : ''}`}
          onClick={() => setShowYapeQR(!showYapeQR)}
        >
          <div className="pago-icon yape-icon">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <circle cx="12" cy="12" r="10" fill="#6fd256"/>
              <path fill="white" d="M16.5,7.5H15V15H7.5V13.5H6V15A1.5,1.5 0 0,0 7.5,16.5H16.5A1.5,1.5 0 0,0 18,15V9A1.5,1.5 0 0,0 16.5,7.5Z"/>
              <path fill="white" d="M12,9L8,13H11V17H13V13H16L12,9Z"/>
            </svg>
          </div>
          <h3>Yape</h3>
          <p className="pago-desc">Click para ver QR</p>
          
          {/* Efecto de pulso */}
          <div className="yape-pulse"></div>
        </div>

        <div className="metodo-pago">
          <div className="pago-icon">
            <svg viewBox="0 0 24 24" width="48" height="48">
              <circle cx="12" cy="12" r="10" fill="#ff9900"/>
              <path fill="white" d="M12,7C9.2,7 7,9.2 7,12C7,14.8 9.2,17 12,17C14.8,17 17,14.8 17,12C17,9.2 14.8,7 12,7M12,15.5C10.1,15.5 8.5,13.9 8.5,12C8.5,10.1 10.1,8.5 12,8.5C13.9,8.5 15.5,10.1 15.5,12C15.5,13.9 13.9,15.5 12,15.5Z"/>
              <circle cx="12" cy="12" r="2.5" fill="white"/>
            </svg>
          </div>
          <h3>Plin</h3>
          <p className="pago-desc">Transferencia rápida</p>
        </div>
      </div>

      {/* Modal QR de Yape */}
      {showYapeQR && (
        <div className="yape-qr-modal">
          <div className="qr-modal-content">
            <button 
              className="close-qr-btn"
              onClick={() => setShowYapeQR(false)}
            >
              ✕
            </button>
            
            <div className="qr-header">
              <div className="yape-logo-modal">
                <div className="yape-circle"></div>
                <span>YAPE</span>
              </div>
              <h3>Escanea para pagar</h3>
            </div>
            
            <div className="qr-container">
              <div className="qr-animation">
                {/* Aquí va tu QR real */}
                <div className="qr-real">
                  <div className="qr-frame">
                    <img 
                      src={yapeQRImage} 
                      alt="QR Code Yape" 
                      className="qr-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/200x200/6fd256/ffffff?text=QR+Yape";
                      }}
                    />
                    <div className="qr-scanner">
                      <div className="scanner-line"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="qr-info">
                <div className="qr-phone">
                  <div className="phone-icon">📱</div>
                  <div>
                    <p className="phone-label">Número Yape:</p>
                    <p className="phone-number">{yapePhone}</p>
                  </div>
                </div>
                
                <div className="qr-instruction">
                  <h4>Instrucciones:</h4>
                  <ol>
                    <li>Abre la app Yape</li>
                    <li>Toca <strong>"Pagar con Yape"</strong></li>
                    <li>Escanea el código QR</li>
                    <li>Confirma el pago</li>
                  </ol>
                </div>
                
                <div className="whatsapp-section">
                  <button 
                    className="whatsapp-btn"
                    onClick={handleWhatsAppClick}
                  >
                    <span className="whatsapp-icon">💬</span>
                    Enviar comprobante por WhatsApp
                  </button>
                  <p className="whatsapp-note">
                    Después de pagar, envíanos el comprobante para procesar tu pedido.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="qr-footer">
              <div className="qr-notice">
                <div className="notice-icon">⚠️</div>
                <p>
                  <strong>Importante:</strong> El pedido se procesará solo después de recibir el comprobante.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MetodosdePago;