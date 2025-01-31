import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.jsx';
// import TodoList from './components/TodoList.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
            <Route path="/users" element={<App />} />
            {/* <Route path={`/users/${userId}/todos`} element={<IncompleteList />} /> */}
          </Routes>
      </BrowserRouter>
  </StrictMode>
)