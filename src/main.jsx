import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import App from './App';
import IncompleteList from './components/IncompleteList';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path='/users/:userId/todos' element={<IncompleteList />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)