import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINTS } from '../config/api'
import './Register.css'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    try {
      const response = await fetch(API_ENDPOINTS.register(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      })

      if (!response.ok) {
        setError('Registration failed. Please try again.')
        return
      }

      const user = await response.json()
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/')
    } catch (err) {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="register-container">
      <h1>Create account</h1>
      <form onSubmit={handleRegister}>
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error ? <p className="form-error">{error}</p> : null}
        <div className="form-actions">
          <button type="submit" className="register-btn">
            Register
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate('/')}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
