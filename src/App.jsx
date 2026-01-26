import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Inicio from "./Pages/inicio/Inicio";
import Productos from "./Pages/Productos/Productos";
import Nosotros from "./Pages/Nosotros/Nosotros";
import ComoComprar from "./Pages/ComoComprar/ComoComprar";
import Enviosyentrega from "./Pages/Enviosyentrega/Enviosyentrega";
import MetodosdePago from "./Pages/MetodosdePago/MetodosdePago";
import NuestrosProductosEnVideos from "./Pages/NuestrosProductosEnVideos/NuestrosProductosEnVideos";
import CatalogoRosamia from "./Pages/CatalogoRosamia/CatalogoRosamia";

// Components
import WhatsAppChat from "./components/WhatsAppChat/WhatsAppChat";
import ChatbotRosamia from "./components/ChatbotRosamia/ChatbotRosamia";
import Loading from "./components/Loading/Loading"; // 👈 NUEVO

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // ⏳ duración del loading (ms)

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* Redirección inicial */}
            <Route path="/" element={<Navigate to="/inicio" replace />} />

            {/* Rutas principales */}
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/catalogo" element={<CatalogoRosamia />} />
            <Route
              path="/nuestros-trabajos"
              element={<NuestrosProductosEnVideos />}
            />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/como-comprar" element={<ComoComprar />} />
            <Route path="/envios-y-entrega" element={<Enviosyentrega />} />
            <Route path="/metodos-de-pago" element={<MetodosdePago />} />

            {/* Ruta 404 */}
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </main>

        <Footer />

        {/* Componentes flotantes */}
        <ChatbotRosamia />
        <WhatsAppChat />
      </div>
    </Router>
  );
}

export default App;
 