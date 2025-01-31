import { useState, React } from 'react';
import './App.css';
import Login from './components/Login.jsx';

function App() {

  return (
    <div>
      <button onClick={Login}><Login /></button>
    </div>
  )
}

export default App;