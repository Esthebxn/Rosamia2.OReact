import React from 'react';
import './NuestroEquipo.css';

const NuestroEquipo = () => {
  const miembros = [
    {
      id: 1,
      nombre: "Ana Rodríguez",
      puesto: "Directora Creativa",
      descripcion: "Especialista en diseño floral con más de 15 años de experiencia.",
      imagen: "https://via.placeholder.com/300x300?text=Ana+R."
    },
    {
      id: 2,
      nombre: "Carlos Méndez",
      puesto: "Florista Principal",
      descripcion: "Maestro en composiciones florales para bodas y eventos especiales.",
      imagen: "https://via.placeholder.com/300x300?text=Carlos+M."
    },
    {
      id: 3,
      nombre: "María López",
      puesto: "Especialista en Plantas",
      descripcion: "Conocedora de botánica y cuidados especializados de plantas exóticas.",
      imagen: "https://via.placeholder.com/300x300?text=María+L."
    },
    {
      id: 4,
      nombre: "Javier Torres",
      puesto: "Atención al Cliente",
      descripcion: "Encargado de hacer realidad los sueños florales de nuestros clientes.",
      imagen: "https://via.placeholder.com/300x300?text=Javier+T."
    }
  ];

  return (
    <section id="equipo" className="section section-light">
      <div className="container">
        <h2 className="section-title">Nuestro Equipo</h2>
        <p className="text-center mb-5">Conoce al talentoso equipo que hace posible la magia en Florería Elegante</p>
        
        <div className="row">
          {miembros.map(miembro => (
            <div key={miembro.id} className="col-3 col-md-6 col-sm-12">
              <div className="team-card card fade-in">
                <div className="team-image-container">
                  <img src={miembro.imagen} alt={miembro.nombre} className="team-image" />
                  <div className="flower-icon-overlay">
                    <div className="css-flower"></div>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h3 className="card-title">{miembro.nombre}</h3>
                  <p className="text-primary flower-badge">{miembro.puesto}</p>
                  <p className="team-description">{miembro.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NuestroEquipo; 