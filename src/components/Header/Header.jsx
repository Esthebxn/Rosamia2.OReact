import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Header.css';

const Header = () => {
  return (
    <header className="Header">
      <div className="header-top">
        <h1>Rosamia Detalles</h1>
      </div>
      <Navbar />
    </header>
  );
};

export default Header; 