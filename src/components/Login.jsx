import { useState, React, useEffect } from 'react';
import axios from 'axios';

const apiURL = import.meta.env.REACT_API_URL;
console.log(`API URL: ${apiURL}`);

function Login() {
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(`${apiURL}/users`);
            setUsers(response.data);
        }
        
        fetchUsers();
    }, [])

    const addUser = (e) => {
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
        })
    }

    const deleteUser = (id) => {
        axios.delete(`${apiURL}/users/${id}`).then(response => {})
    }

    return (
        <div>
            <h1>Login to your account</h1>
            <form onSubmit={submitUser}>
                <input type="text" />
                <button type="submit" onClick={addUser}>Add</button>
                <h2>Find your account below</h2>    
            </form>
        </div>
    )
}

export default Login;