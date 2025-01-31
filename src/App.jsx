import { useState, React } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');


  const loginAccount = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Create an account</h1>
      <form>
        <input type="text" value={email} onChange={setEmail} />
        <button type="submit" onClick={loginAccount}>Login</button>

        <h2>Find your account below</h2>
        <li>{email}</li>
      </form>
    </div>
  )
}

export default App;