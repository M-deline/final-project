import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bulma/css/bulma.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);