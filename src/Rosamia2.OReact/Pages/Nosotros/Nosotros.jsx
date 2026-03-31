import React, { useState, useEffect } from 'react';
import { FiUsers, FiTarget, FiAward, FiHeart, FiStar, FiCheckCircle, FiChevronDown } from 'react-icons/fi';
import './Nosotros.css';

const Nosotros = () => {
  const [showHistory, setShowHistory] = useState(true);
  const [animatedCards, setAnimatedCards] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Array de emojis para partículas flotantes
  const valueEmojis = ['🚀', '✨', '💡', '🌟', '🎯', '❤️', '🌱', '🤝', '⚡', '🌈'];

  // Estado para las partículas flotantes
  const [particles, setParticles] = useState([]);

  // Generar partículas flotantes
  useEffect(() => {
    const generatedParticles = [];
    for (let i = 0; i < 20; i++) {
      generatedParticles.push({
        id: i,
        emoji: valueEmojis[Math.floor(Math.random() * valueEmojis.length)],
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 1.5,
        delay: -Math.random() * 10,
        duration: 15 + Math.random() * 15
      });
    }
    setParticles(generatedParticles);
  }, []);

  // Efecto para animar cards cuando son visibles
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Animar cards cuando están en vista
      const cards = document.querySelectorAll('.valor-card, .team-card');
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        
        if (isVisible && !animatedCards.includes(index)) {
          setAnimatedCards(prev => [...prev, index]);
          card.classList.add('animate-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al cargar

    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedCards]);

  return (
    <div className="nosotros-container">
      {/* Fondo con partículas flotantes */}
      <div className="floating-particles">
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className="particle"
            style={{
              top: particle.top,
              left: particle.left,
              fontSize: `${particle.size}rem`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      {/* Hero Section con animación */}
      <section className="nosotros-hero">
        <div className="hero-content">
          <h1 className="hero-title animate-text">
            Sobre <span className="highlight">Nosotros</span>
          </h1>
          <p className="hero-subtitle fade-in">
            Conoce la historia detrás de nuestra pasión por la innovación y la excelencia
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <FiUsers className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number" data-target="50">0</span>
                <span className="stat-label">Miembros</span>
              </div>
            </div>
            <div className="stat-item">
              <FiTarget className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number" data-target="200">0</span>
                <span className="stat-label">Proyectos</span>
              </div>
            </div>
            <div className="stat-item">
              <FiAward className="stat-icon" />
              <div className="stat-content">
                <span className="stat-number" data-target="15">0</span>
                <span className="stat-label">Premios</span>
              </div>
            </div>
          </div>
          <button 
            className="scroll-indicator"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <FiChevronDown className="bounce" />
          </button>
        </div>
      </section>

      {/* Historia Section */}
      {showHistory && (
        <section className="historia-section slide-in">
          <div className="historia-content">
            <div className="section-header">
              <h2 className="section-title">
                Nuestra <span className="gradient-text">Historia</span>
              </h2>
              <div className="title-decoration"></div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">2015</div>
                <div className="timeline-content">
                  <h3>Fundación</h3>
                  <p>Rosamia comenzó como un pequeño proyecto familiar con una gran pasión por las flores y los detalles.</p>
                </div>
                <div className="timeline-dot pulse"></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2018</div>
                <div className="timeline-content">
                  <h3>Expansión</h3>
                  <p>Crecimos y diversificamos nuestros productos, llegando a más clientes enamorados de nuestros diseños.</p>
                </div>
                <div className="timeline-dot pulse"></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2023</div>
                <div className="timeline-content">
                  <h3>Reconocimiento</h3>
                  <p>Nos convertimos en líderes en diseño floral innovador, ganando múltiples premios de excelencia.</p>
                </div>
                <div className="timeline-dot pulse"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Valores Section */}
      <section className="valores-section">
        <div className="section-header">
          <h2 className="section-title">
            Nuestros <span className="gradient-text">Valores</span>
          </h2>
          <p className="section-subtitle">Los principios que guían cada uno de nuestros proyectos</p>
        </div>
        
        <div className="valores-grid">
          <div className="valor-card">
            <div className="valor-icon-wrapper">
              <div className="valor-icon">
                <FiHeart />
              </div>
              <div className="icon-glow"></div>
            </div>
            <h3>Pasión</h3>
            <p>
              Cada flor, cada detalle es tratado con el amor y dedicación que merece. 
              Transformamos emociones en arte floral.
            </p>
            <div className="valor-decoration"></div>
          </div>
          
          <div className="valor-card">
            <div className="valor-icon-wrapper">
              <div className="valor-icon">
                <FiStar />
              </div>
              <div className="icon-glow"></div>
            </div>
            <h3>Excelencia</h3>
            <p>
              Buscamos la perfección en cada ramo, asegurando calidad y belleza 
              en todos nuestros productos.
            </p>
            <div className="valor-decoration"></div>
          </div>
          
          <div className="valor-card">
            <div className="valor-icon-wrapper">
              <div className="valor-icon">
                <FiCheckCircle />
              </div>
              <div className="icon-glow"></div>
            </div>
            <h3>Compromiso</h3>
            <p>
              Nos dedicamos a superar expectativas, entregando puntualidad 
              y atención personalizada a cada cliente.
            </p>
            <div className="valor-decoration"></div>
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">
            Nuestro <span className="gradient-text">Equipo</span>
          </h2>
          <p className="section-subtitle">Los talentos creativos detrás de cada diseño</p>
        </div>
        
        <div className="team-grid">
          <div className="team-card">
            <div className="team-image">
              <div className="image-overlay"></div>
              <div className="team-social">
                <span>🌹</span>
                <span>🌸</span>
                <span>🌺</span>
              </div>
            </div>
            <h3>Diseñadores Florales</h3>
            <p>Artistas que transforman flores en emociones</p>
          </div>
          
          <div className="team-card">
            <div className="team-image">
              <div className="image-overlay"></div>
              <div className="team-social">
                <span>🎁</span>
                <span>✨</span>
                <span>💝</span>
              </div>
            </div>
            <h3>Especialistas en Detalles</h3>
            <p>Expertos en embalaje y presentación</p>
          </div>
          
          <div className="team-card">
            <div className="team-image">
              <div className="image-overlay"></div>
              <div className="team-social">
                <span>📞</span>
                <span>💬</span>
                <span>🤝</span>
              </div>
            </div>
            <h3>Atención al Cliente</h3>
            <p>Siempre listos para hacer tu experiencia especial</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;