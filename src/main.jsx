import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import App from './App';
import IncompleteList from './components/IncompleteList';
import CompleteList from './components/CompleteList';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path='/:userId/todos' element={<IncompleteList />} />
            <Route path='/:userId/todos' element={<CompleteList />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)