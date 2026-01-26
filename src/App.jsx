import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Inicio from "./Pages/inicio/Inicio";
import Nosotros from "./Pages/Nosotros/Nosotros";
import ComoComprar from "./Pages/ComoComprar/ComoComprar";
import Enviosyentrega from "./Pages/Enviosyentrega/Enviosyentrega";
import MetodosdePago from "./Pages/MetodosdePago/MetodosdePago";
import Productos from "./Pages/Productos/Productos";
import NuestrosProductosEnVideos from "./Pages/NuestrosProductosEnVideos/NuestrosProductosEnVideos";
import CatalogoRosamia from "./Pages/CatalogoRosamia/CatalogoRosamia"; // IMPORTANTE: Asegúrate de tener esta página

// Components
import WhatsAppChat from "./components/WhatsAppChat/WhatsAppChat";
import ChatbotRosamia from "./components/ChatbotRosamia/ChatbotRosamia";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/inicio" />} />
            
            {/* Rutas del Footer según la imagen */}
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nuestros-trabajos" element={<NuestrosProductosEnVideos />} />
            <Route path="/catalogo" element={<CatalogoRosamia />} /> {/* Página del catálogo */}
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/como-comprar" element={<ComoComprar />} />
            <Route path="/envios-y-entrega" element={<Enviosyentrega />} />
            <Route path="/metodos-de-pago" element={<MetodosdePago />} />
          </Routes>
        </main>
        
        <Footer />
        
        <ChatbotRosamia />
        <WhatsAppChat />
      </div>
    </Router>
  );
}

export default App; 