import React from 'react';
import ReactDOM from 'react-dom/client';
// HashRouter keeps client-side routing working on any static host (Coolify,
// nginx, S3…) with no server rewrites — deep links and refresh never 404.
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
