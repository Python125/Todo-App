import { useState, React, useEffect } from 'react';
import axios from 'axios';
import { Text, Button, Input, Link, Box } from '@chakra-ui/react';

const apiURL = import.meta.env.VITE_API_URL;
console.log(`API URL: ${apiURL}`);

function App() {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${apiURL}/users`);
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  function addUser(e) {
    setUserInput(e.target.value);
  }

  function submitUser(e) {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    const newUser = {
      id: users.length + 1, 
      email: userInput,
      todos: [],
    }
    console.log(newUser);

    axios.post(`${apiURL}/users`, newUser).then(response => {
      setUsers([...users, response.data]);
      setUserInput('');
    })
  }

  return (
    <Box textAlign='center'>
      <Text fontWeight='bold' fontSize='2xl'>Login to your account</Text>
      <form onSubmit={submitUser}>
        <Input variant='subtle' width='200px' marginTop='15px' type='text' value={userInput} onChange={addUser} />
        <Button variant='surface' marginLeft='5px' marginBottom='5px' width='70px' fontWeight='bold' type="submit" onClick={submitUser}>Add</Button>
        <Text fontWeight='bold' fontSize='xl' marginTop='5px'>Find your username below</Text>
      </form>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              <Link variant="plain" href={`/${user.id}`}>{user.email}</Link>
            </li>
          )
        })}
      </ul>
    </Box>
  )
}

export default App;