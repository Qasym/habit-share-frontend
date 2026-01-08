import { useLocation, useNavigate } from 'react-router-dom'
import './Home.css'

type UserProfile = {
  id: string | number
  username: string
  email: string
}

function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const stateUser = (location.state as { user?: UserProfile } | null)?.user
  const storedUser = localStorage.getItem('user')
  const fallbackUser = storedUser ? (JSON.parse(storedUser) as UserProfile) : null
  const user = stateUser || fallbackUser

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="home-card">
        <p><strong>id:</strong> {user?.id ?? ''}</p>
        <p><strong>username:</strong> {user?.username ?? ''}</p>
        <p><strong>email:</strong> {user?.email ?? ''}</p>
      </div>
      <button type="button" className="home-btn" onClick={handleLogout}>
        Back to Login
      </button>
    </div>
  )
}

export default Home
