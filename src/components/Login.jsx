import { useState, React } from 'react';

function Login() {
    const [email, setEmail] = useState('');

    const loginAccount = (e) => {
        e.preventDefault();
    }

    const handleUserChange = () => {
        navigate('/todo');
    }

    return (
        <div>
            <h1>Login to your account</h1>
            <form>
                <input type="text" value={email} onChange={setEmail} />
                <button type="submit" onClick={loginAccount}>Login</button>

                <h2>Find your account below</h2>
                <li>Test</li>
            </form>
        </div>
    )
}

export default Login;