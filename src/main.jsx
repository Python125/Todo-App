import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import App from './App';
import Login from './components/Login';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/users/:userId/todos' element={<App />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)