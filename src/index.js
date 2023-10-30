import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-loading-skeleton/dist/skeleton.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
