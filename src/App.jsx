import { useState, React, useEffect } from 'react';
import axios from 'axios';

const apiURL = import.meta.env.REACT_API_URL;
// console.log(`API URL: ${apiURL}`);

function App() {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const displayUsers = () => {
      const request = axios.get(`${apiURL}/users`);
      setUsers(request.data);
    };
    displayUsers();
  }, []);

  function addUser(e) {

    const newUser = {
      id: users.length + 1, 
      email: userInput,
      todos: [],
    }
    console.log(newUser);
  }

  return (
    <div>
      <h1>Login to your account</h1>
    </div>
  )
}

export default App;