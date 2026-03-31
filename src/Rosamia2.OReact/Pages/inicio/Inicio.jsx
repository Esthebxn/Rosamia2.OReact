import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiVideo } from 'react-icons/fi';
import './Inicio.css';

// Importando la imagen con la ruta correcta desde Pages/inicio
import rosamiaDetalles from '../../asset/Images/Rosamiadetalles.png';

const Inicio = () => {
  const [showAbout, setShowAbout] = useState(true);
  const [flowers, setFlowers] = useState([]);
  const [clickedProductos, setClickedProductos] = useState(false);
  const [clickedVideos, setClickedVideos] = useState(false);
  const [effectTypeProductos, setEffectTypeProductos] = useState('');
  const [effectTypeVideos, setEffectTypeVideos] = useState('');

  // Array de emojis de flores
  const flowerEmojis = ['🌸', '🌺', '🌷', '🌹', '💐', '🥀', '🌻', '🌼', '🌾', '🪷'];

  // Generar flores dinámicamente
  useEffect(() => {
    const generatedFlowers = [];
    for (let i = 0; i < 15; i++) {
      generatedFlowers.push({
        id: i,
        emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 1.5,
        delay: -Math.random() * 10,
        duration: 15 + Math.random() * 15
      });
    }
    setFlowers(generatedFlowers);
  }, []);

  // Función para manejar el clic en el texto de productos
  const handleTextClickProductos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setClickedProductos(true);
    
    // Selecciona un efecto aleatorio cada vez
    const effects = ['effect-1', 'effect-2', 'effect-3', 'effect-4', 'effect-5'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    setEffectTypeProductos(randomEffect);
    
    // Crea partículas de burbuja
    createBubbleParticles(e, 'pink');
    
    // Navega a productos después de un pequeño delay para ver la animación
    setTimeout(() => {
      window.location.href = '/productos';
    }, 300);
    
    // Restablece después de la animación
    setTimeout(() => {
      setClickedProductos(false);
      setEffectTypeProductos('');
    }, 800);
  };

  // Función para manejar el clic en el texto de videos
  const handleTextClickVideos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setClickedVideos(true);
    
    // Selecciona un efecto aleatorio cada vez
    const effects = ['effect-1', 'effect-2', 'effect-3', 'effect-4', 'effect-5'];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    setEffectTypeVideos(randomEffect);
    
    // Crea partículas de burbuja
    createBubbleParticles(e, 'purple');
    
    // Navega a videos después de un pequeño delay para ver la animación
    setTimeout(() => {
      window.location.href = '/nuestros-trabajos';
    }, 300);
    
    // Restablece después de la animación
    setTimeout(() => {
      setClickedVideos(false);
      setEffectTypeVideos('');
    }, 800);
  };

  // Función para crear partículas de burbuja
  const createBubbleParticles = (e, color = 'pink') => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    
    // Crea contenedor de partículas si no existe
    let particlesContainer = button.querySelector('.bubble-particles');
    if (!particlesContainer) {
      particlesContainer = document.createElement('div');
      particlesContainer.className = 'bubble-particles';
      button.appendChild(particlesContainer);
    }
    
    // Limpia partículas anteriores
    particlesContainer.innerHTML = '';
    
    // Crea 15 partículas
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = `bubble-particle ${color}`;
      
      // Posición aleatoria alrededor del texto
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 30 + 10;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      // Tamaño aleatorio
      const size = Math.random() * 6 + 3;
      
      particle.style.cssText = `
        left: ${buttonRect.width / 2 + x}px;
        top: ${buttonRect.height / 2 + y}px;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${Math.random() * 0.2}s;
      `;
      
      particlesContainer.appendChild(particle);
    }
    
    // Crea efecto de ondas
    createRippleEffect(e, color);
    
    // Crea efecto de destello
    createFlashEffect(e, color);
    
    // Crea gotas
    createDroplets(e);
  };

  const createRippleEffect = (e, color = 'pink') => {
    const button = e.currentTarget;
    const ripple = document.createElement('div');
    ripple.className = `bubble-ripple ${color}`;
    ripple.style.cssText = `
      left: ${button.offsetWidth / 2}px;
      top: ${button.offsetHeight / 2}px;
      width: 10px;
      height: 10px;
    `;
    button.appendChild(ripple);
    
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 800);
  };

  const createFlashEffect = (e, color = 'pink') => {
    const button = e.currentTarget;
    const flash = document.createElement('div');
    flash.className = `bubble-flash ${color}`;
    button.appendChild(flash);
    
    setTimeout(() => {
      if (flash.parentNode) {
        flash.parentNode.removeChild(flash);
      }
    }, 400);
  };

  const createDroplets = (e) => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
      const droplet = document.createElement('div');
      droplet.className = 'bubble-droplet';
      
      droplet.style.cssText = `
        left: ${Math.random() * buttonRect.width}px;
        top: ${buttonRect.height}px;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      
      button.appendChild(droplet);
      
      setTimeout(() => {
        if (droplet.parentNode) {
          droplet.parentNode.removeChild(droplet);
        }
      }, 600);
    }
  };

  return (
    <div className="inicio-container">
      {/* Fondo con flores animadas */}
      <div className="flower-background">
        <div className="flowers-container">
          {flowers.map((flower) => (
            <div 
              key={flower.id}
              className="flower"
              style={{
                top: flower.top,
                left: flower.left,
                fontSize: `${flower.size}rem`,
                animationDelay: `${flower.delay}s`,
                animationDuration: `${flower.duration}s`
              }}
            >
              {flower.emoji}
            </div>
          ))}
        </div>
      </div>

      {showAbout && (
        <section className="about-preview">
          <div className="about-content">
            <h2>Nuestra Pasión por las Flores</h2>
            <p>
              En <strong>Rosamia</strong>, hacemos que cada detalle cuente. 🎁✨
              Te ayudamos a sorprender con los mejores ramos a un precio increíble, 
              llenos de belleza y significado. 🌹💕
            </p>
          </div>
          
          <div className="about-image">
            <img 
              src={rosamiaDetalles} 
              alt="Rosamia Detalles" 
            />
          </div>

          {/* Contenedor para ambos botones */}
          <div className="buttons-container">
            
            {/* Botón para Explora Nuestros Productos - LADO IZQUIERDO */}
            <div className="productos-button-wrapper left-button">
              <Link to="/productos" className="flower-button">
                <div className="flower-button-icon">
                  <FiShoppingBag className="bag-icon" />
                  <div className="flower-petals">
                    <div className="petal petal-1"></div>
                    <div className="petal petal-2"></div>
                    <div className="petal petal-3"></div>
                    <div className="petal petal-4"></div>
                    <div className="petal petal-5"></div>
                    <div className="petal petal-6"></div>
                  </div>
                </div>
                <span 
                  className={`flower-button-text ${clickedProductos ? effectTypeProductos : ''}`}
                  onClick={handleTextClickProductos}
                >
                  Explora Nuestros Productos
                </span>
              </Link>
            </div>

            {/* Botón para Nuestros Productos en Video - LADO DERECHO */}
            <div className="videos-button-wrapper right-button">
              <Link to="/nuestros-trabajos" className="flower-button video-button">
                <div className="flower-button-icon">
                  <FiVideo className="video-icon" />
                  <div className="flower-petals">
                    <div className="petal petal-1"></div>
                    <div className="petal petal-2"></div>
                    <div className="petal petal-3"></div>
                    <div className="petal petal-4"></div>
                    <div className="petal petal-5"></div>
                    <div className="petal petal-6"></div>
                  </div>
                </div>
                <span 
                  className={`flower-button-text ${clickedVideos ? effectTypeVideos : ''}`}
                  onClick={handleTextClickVideos}
                >
                  Nuestros Productos en Video
                </span>
              </Link>
            </div>

          </div>
        </section>
      )}
    </div>
  );
};

export default Inicio; 