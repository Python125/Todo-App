import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useParams } from 'react-router';
import App from './App';
import TodoList from './components/TodoList';
import { Provider } from './components/ui/provider';

function User() {
  const { userId } = useParams();
  return <TodoList userId={userId} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <div style={{ backgroundColor: 'lightgreen', height: '100vh' }}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path='/:userId' element={<User />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)