import { useState, React, useEffect } from 'react';
// import axios from 'axios';

function Login() {
    const [users, setUsers] = useState([]);
    const [userInput, setUserInput] = useState('');

    const addUser = (e) => {
        setUserInput(e.target.value);
    }

    function loginUser(e) {
        e.preventDefault();
    }

    const deleteUser = (id) => {}

    return (
        <div>
            <h1>Login to your account</h1>
            <form>
                <input type="text" />
                <button type="submit">Login</button>
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