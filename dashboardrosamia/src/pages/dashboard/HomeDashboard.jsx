import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";

const API_URL = "/api/productos";

const HomeDashboard = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (response.ok && result.success && Array.isArray(result.data)) {
          setTotal(result.data.length);
        }
      } catch (error) {
        console.error("Error cargando resumen:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumen();
  }, []);

  return (
    <div>
      <PageHeader
        title="Inicio"
        subtitle="Resumen general del panel administrativo de Rosamia."
      />

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-label">Productos registrados</div>
          <div className="stat-value">{loading ? "..." : total}</div>
          <Link className="stat-link" to="/productos">
            Ver catÃƒÂ¡logo
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-label">Estado del backend</div>
          <div className="stat-value">OK</div>
          <a
            className="stat-link"
            href="/api/health"
            target="_blank"
            rel="noopener noreferrer"
          >
            Probar health
          </a>
        </div>
      </div>

      <div className="home-panels">
        <div className="content-card">
          <h3 className="panel-title">Acciones rÃƒÂ¡pidas</h3>
          <p className="muted">
            Desde aquÃƒÂ­ puedes revisar el listado de productos y abrir el detalle.
          </p>

          <div className="quick-actions">
            <Link to="/productos" className="btn-primary">
              Ir a productos
            </Link>

            <a
              href="/api/productos"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Abrir API
            </a>
          </div>
        </div>

        <div className="content-card">
          <h3 className="panel-title">Estado del proyecto</h3>
          <p className="muted">
            Este dashboard ya viene conectado al backend Express y a MariaDB usando la tabla <strong>productos</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
