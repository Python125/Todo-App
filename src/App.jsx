import { useState, React } from 'react';
import './App.css';
import Login from './components/Login';

const apiURL = import.meta.env.REACT_API_URL;
console.log(`API URL: ${apiURL}`);

function App() {

  return (
    <div>
      <Login />
    </div>
  )
}

export default App;