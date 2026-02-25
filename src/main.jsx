import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Importa los estilos de Tailwind y estilos base
import './i18n';

/**
 * Punto de entrada principal para la aplicación React.
 * Monta el componente 'App' dentro del elemento <div id="root"> en index.html.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode es útil para detectar problemas y advertencias en el desarrollo.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);