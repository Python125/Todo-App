import { useState, React } from 'react';

function Login() {
    const [email, setEmail] = useState('');

    const loginAccount = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Login to your account</h1>
            <form>
                <input type="text" value={email} onChange={setEmail} />
                <button type="submit" onClick={handleUserChange}>Login</button>
                <h2>Find your account below</h2>
                <ul>
                    <li>{email}</li>
                </ul>
            </form>
        </div>
    )
}

export default Login;