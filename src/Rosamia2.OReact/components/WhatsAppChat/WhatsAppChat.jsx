import React from 'react';
import './WhatsAppChat.css';
import { FaWhatsapp } from 'react-icons/fa'; // Importa el ícono de WhatsApp desde react-icons

const WhatsAppChat = () => {
  // Número de WhatsApp de la empresa (reemplaza con el número real, incluyendo el código de país, sin "+" ni espacios)
  const phoneNumber = '51912345678'; // Ejemplo: Perú +51
  const message = '¡Hola! Estoy interesado en sus productos. ¿Me puedes ayudar?'; // Mensaje predefinido

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="whatsapp-chat" onClick={handleWhatsAppClick}>
      <FaWhatsapp size={40} color="#25D366" />
    </div>
  );
};

export default WhatsAppChat;


