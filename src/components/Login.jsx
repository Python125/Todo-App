import { useState, React } from 'react';

function Login() {
    const [email, setEmail] = useState('');

    return (
        <div>
            <h1>Add an account</h1>
            <form>
                <input type="text" value={email} onChange={setEmail} />
                <button type="submit">Add</button>

                <h2>Find your account below</h2>
                <li>{email}</li>
            </form>
        </div>
    )
}

export default Login;