import { useState, React } from 'react';

function Login() {
    const [users, setUsers] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    const loginAccount = (e) => {
        setUserEmail(e.target.value);
    }

    const addUser = (e) => {
        e.preventDefault();

        const newUser = {
            id: users.length + 1,
            email: userEmail,
            todos: [],
        }
    }
    
    return (
        <div>
            <h1>Login to your account</h1>
            <form>
                <input type="text" />
                <button type="submit">Login</button>
                <h2>Find your account below</h2>
                <ul>
                    <li>Test</li>
                </ul>
            </form>
        </div>
    )
}

export default Login;