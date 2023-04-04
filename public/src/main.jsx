import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import NotFound from './NotFound.jsx';
import './styles/styles.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <div id="main">
            <App />
          </div>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
