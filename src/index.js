import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/app.scss';

if (typeof window !== 'undefined') {
  const rootNode = document.getElementById('root');

  if (rootNode) {
    ReactDOM.createRoot(rootNode).render(
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>,
    );
  }
}
