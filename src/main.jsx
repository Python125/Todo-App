import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import App from './App';
import TodoList from './components/TodoList';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path='/:userId/todos' element={<TodoList />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)