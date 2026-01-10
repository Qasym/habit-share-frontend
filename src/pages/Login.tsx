import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const response = await fetch(API_ENDPOINTS.token(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        setError('Login failed. Please check your credentials. code=' + response.status)
        return
      }

      const storedUser = localStorage.getItem('user')
      const user = storedUser ? JSON.parse(storedUser) : { username }
      navigate('/home', { state: { user } })
    } catch (err) {
      setError('Login failed. Please check your credentials. err=' + (err as Error).message)
    }
  }

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" className="login-btn">Login</button>
      </form>
      <button type="button" onClick={handleRegister} className="register-btn">
        Register
      </button>
    </div>
  )
}

export default Login
