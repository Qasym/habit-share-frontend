import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import HabitCard from '../components/HabitCard'
import './Home.css'

type UserProfile = {
  id: string | number
  username: string
  email: string
}

type Habit = {
  id: string
  name: string
  description: string
  completionsPerDay: number
}

function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const stateUser = (location.state as { user?: UserProfile } | null)?.user
  const storedUser = localStorage.getItem('user')
  const fallbackUser = storedUser ? (JSON.parse(storedUser) as UserProfile) : null
  const user = stateUser || fallbackUser
  const username = useMemo(() => user?.username ?? 'User', [user])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [habits, setHabits] = useState<Habit[]>([])
  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formCompletions, setFormCompletions] = useState('1')

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  const resetForm = () => {
    setFormName('')
    setFormDescription('')
    setFormCompletions('1')
  }

  const handleOpenModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = formName.trim()
    const trimmedDescription = formDescription.trim()
    if (!trimmedName) {
      return
    }
    const parsedCompletions = Number.parseInt(formCompletions, 10)
    const safeCompletions = Number.isFinite(parsedCompletions) && parsedCompletions > 0 ? parsedCompletions : 1
    const nextHabit: Habit = {
      id: crypto.randomUUID(),
      name: trimmedName,
      description: trimmedDescription,
      completionsPerDay: safeCompletions,
    }
    setHabits((prev) => [nextHabit, ...prev])
    setIsModalOpen(false)
  }

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">{username}'s Habits</h1>
        <div className="home-actions">
          <button type="button" className="add-habit-btn" onClick={handleOpenModal}>
            Add habit
          </button>
          <button type="button" className="home-link-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {habits.length === 0 ? (
        <div className="home-empty">
          <p>No habits yet. Click "Add habit" to get started.</p>
        </div>
      ) : (
        <div className="habit-grid">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              name={habit.name}
              description={habit.description}
              completionsPerDay={habit.completionsPerDay}
            />
          ))}
        </div>
      )}

      {isModalOpen ? (
        <div className="modal-overlay" role="presentation">
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="add-habit-title">
            <div className="modal-header">
              <h2 id="add-habit-title">Add a habit</h2>
              <button type="button" className="modal-close" onClick={handleCloseModal} aria-label="Close">
                x
              </button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label className="modal-field">
                <span>Habit name</span>
                <input
                  type="text"
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  placeholder="Morning run"
                  required
                />
              </label>
              <label className="modal-field">
                <span>Description</span>
                <textarea
                  value={formDescription}
                  onChange={(event) => setFormDescription(event.target.value)}
                  placeholder="Quick note about this habit"
                  rows={3}
                />
              </label>
              <label className="modal-field">
                <span>Completions per day</span>
                <input
                  type="number"
                  min={1}
                  value={formCompletions}
                  onChange={(event) => setFormCompletions(event.target.value)}
                />
              </label>
              <div className="modal-actions">
                <button type="button" className="modal-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="modal-primary">
                  Add habit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Home
