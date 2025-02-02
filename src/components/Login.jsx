import { useState, React, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState('');

    const addUser = (e) => {
        setUserInput(e.target.value);
    }

    function submitUser(e) {
        e.preventDefault();

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

    const deleteUser = (id) => {}

    return (
        <div>
            <h1>Login to your account</h1>
            <form onSubmit={submitUser}>
                <input type="text" />
                <button type="submit">Add</button>
                <h2>Find your account below</h2>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <button onClick={() => loginAccount(user.email)}>Login</button>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </form>
        </div>
    )
}

export default Login;