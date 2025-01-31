import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Login to your account</h1>
      <form>
        <input type="text" placeholder="Email" />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default App
