import { useState, React } from 'react';

function Login() {
    const [email, setEmail] = useState('');

    const loginAccount = (e) => {
        e.preventDefault();
    }

    const handleUserChange = () => {
        navigate('/incomplete');
    }

    return (
        <div>
            <h1>Login to your account</h1>
            <form>
                <input type="text" value={email} onChange={setEmail} />
                <button type="submit" onClick={loginAccount}>Login</button>
            </form>
            <h2>Find your account below</h2>
            <ul>
                <li>Test</li>
            </ul>
        </div>
    )
}

export default Login;