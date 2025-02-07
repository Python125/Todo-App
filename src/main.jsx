import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from 'react-router';
import './App.css';
import App from './App';
import TodoList from './components/TodoList';

function User() {
  const { userId } = useParams();
  return <TodoList userId={userId} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path='/:userId' element={<User />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>
)