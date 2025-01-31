import { useState, React } from 'react';
import './App.css';
import Login from './components/Login.jsx';
import IncompleteList from './components/IncompleteList.jsx';

function App() {

  return (
    <div>
      <button onClick={Login}><Login /></button>
    </div>
  )
}

export default App;