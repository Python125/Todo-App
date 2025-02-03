import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import Login from './components/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)