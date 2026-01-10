import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import HabitCard from '../components/HabitCard'
import settingsIcon from '../assets/habitkit/settings.svg'
import barChartIcon from '../assets/habitkit/barchart.svg'
import addIcon from '../assets/habitkit/add.svg'
import nav1SelectedIcon from '../assets/habitkit/nav1Selected.svg'
import nav2Icon from '../assets/habitkit/nav2.svg'
import nav3Icon from '../assets/habitkit/nav3.svg'
import artIcon from '../assets/habitkit/art.svg'
import financeIcon from '../assets/habitkit/finance.svg'
import fitnessIcon from '../assets/habitkit/fitness.svg'
import healthIcon from '../assets/habitkit/health.svg'
import nutritionIcon from '../assets/habitkit/eat.svg'
import socialIcon from '../assets/habitkit/social.svg'
import studyIcon from '../assets/habitkit/study.svg'
import workIcon from '../assets/habitkit/work.svg'
import morningIcon from '../assets/habitkit/morning.svg'
import eveningIcon from '../assets/habitkit/evening.svg'
import otherIcon from '../assets/habitkit/diamond.svg'
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
  categories: string[]
  icon: string
  primaryColor: string
  secondaryColor: string
  streakGoal?: string
  reminder?: string
}

type CategoryOption = {
  name: string
  icon: string
}

const categoryOptions: CategoryOption[] = [
  { name: 'Art', icon: artIcon },
  { name: 'Finances', icon: financeIcon },
  { name: 'Fitness', icon: fitnessIcon },
  { name: 'Health', icon: healthIcon },
  { name: 'Nutrition', icon: nutritionIcon },
  { name: 'Social', icon: socialIcon },
  { name: 'Study', icon: studyIcon },
  { name: 'Work', icon: workIcon },
  { name: 'Morning', icon: morningIcon },
  { name: 'Evening', icon: eveningIcon },
  { name: 'Other', icon: otherIcon },
]

const categoryVisuals: Record<string, { icon: string; primary: string; secondary: string }> = {
  Art: { icon: artIcon, primary: '#DF7AF0', secondary: '#352238' },
  Finances: { icon: financeIcon, primary: '#7E8DE9', secondary: '#131524' },
  Fitness: { icon: fitnessIcon, primary: '#FAC033', secondary: '#382C1B' },
  Health: { icon: healthIcon, primary: '#43C5DD', secondary: '#053737' },
  Nutrition: { icon: nutritionIcon, primary: '#FAC033', secondary: '#382C1B' },
  Social: { icon: socialIcon, primary: '#DF7AF0', secondary: '#352238' },
  Study: { icon: studyIcon, primary: '#7E8DE9', secondary: '#131524' },
  Work: { icon: workIcon, primary: '#43C5DD', secondary: '#053737' },
  Morning: { icon: morningIcon, primary: '#FAC033', secondary: '#382C1B' },
  Evening: { icon: eveningIcon, primary: '#7E8DE9', secondary: '#131524' },
  Other: { icon: otherIcon, primary: '#DF7AF0', secondary: '#352238' },
}

const defaultHabits: Habit[] = []

function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const stateUser = (location.state as { user?: UserProfile } | null)?.user
  const storedUser = localStorage.getItem('user')
  const fallbackUser = storedUser ? (JSON.parse(storedUser) as UserProfile) : null
  const user = stateUser || fallbackUser
  const username = useMemo(() => user?.username ?? 'User', [user])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [habits, setHabits] = useState<Habit[]>(defaultHabits)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formCompletions, setFormCompletions] = useState('1')
  const [formStreakGoal, setFormStreakGoal] = useState('')
  const [formReminder, setFormReminder] = useState('')
  const [formCategories, setFormCategories] = useState<string[]>([])
  const [showStats, setShowStats] = useState(true)

  const filteredHabits = useMemo(() => {
    if (activeFilters.length === 0) {
      return habits
    }
    return habits.filter((habit) => habit.categories.some((category) => activeFilters.includes(category)))
  }, [activeFilters, habits])

  const stats = useMemo(() => {
    const categories = new Set(habits.flatMap((habit) => habit.categories))
    const dailyTarget = habits.reduce((total, habit) => total + habit.completionsPerDay, 0)
    return [
      { label: 'Total Habits', value: habits.length },
      { label: 'Daily Target', value: dailyTarget },
      { label: 'Categories', value: categories.size },
    ]
  }, [habits])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  const resetForm = () => {
    setFormName('')
    setFormDescription('')
    setFormCompletions('1')
    setFormStreakGoal('')
    setFormReminder('')
    setFormCategories([])
  }

  const handleOpenModal = () => {
    resetForm()
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const toggleFilter = (categoryName: string) => {
    setActiveFilters((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    )
  }

  const toggleFormCategory = (categoryName: string) => {
    setFormCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = formName.trim()
    const trimmedDescription = formDescription.trim()
    if (!trimmedName) {
      return
    }
    const parsedCompletions = Number.parseInt(formCompletions, 10)
    const safeCompletions = Number.isFinite(parsedCompletions) && parsedCompletions > 0 ? parsedCompletions : 1
    const categories = formCategories.length > 0 ? formCategories : ['Other']
    const visual = categoryVisuals[categories[0]] ?? categoryVisuals.Other
    const nextHabit: Habit = {
      id: crypto.randomUUID(),
      name: trimmedName,
      description: trimmedDescription,
      completionsPerDay: safeCompletions,
      categories,
      icon: visual.icon,
      primaryColor: visual.primary,
      secondaryColor: visual.secondary,
      streakGoal: formStreakGoal.trim() || undefined,
      reminder: formReminder.trim() || undefined,
    }
    setHabits((prev) => [nextHabit, ...prev])
    setIsModalOpen(false)
  }

  return (
    <div className="home-container habitkit-theme">
      <header className="habitkit-appbar">
        <div className="appbar-left">
          <button type="button" className="icon-button" aria-label="Settings">
            <img src={settingsIcon} alt="" />
          </button>
          <div className="app-brand">
            <span className="app-brand-primary">Habit</span>
            <span className="app-brand-accent">League</span>
          </div>
        </div>
        <div className="appbar-actions">
          <button
            type="button"
            className="icon-button"
            onClick={() => setShowStats((prev) => !prev)}
            aria-pressed={showStats}
            aria-label="Toggle statistics"
          >
            <img src={barChartIcon} alt="" />
          </button>
          <button type="button" className="icon-button" onClick={handleOpenModal} aria-label="Add habit">
            <img src={addIcon} alt="" />
          </button>
          <button type="button" className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="welcome-row">
        <div>
          <p className="welcome-eyebrow">Welcome, {username}</p>
          <h1 className="welcome-title">Your habits</h1>
        </div>
        <div className="stat-badge">
          <span>{habits.length}</span>
          <small>habits</small>
        </div>
      </section>

      {showStats ? (
        <section className="stats-section">
          <h2>Statistics</h2>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <p>{stat.label}</p>
                <span>{stat.value}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="category-section">
        <h2>Categories</h2>
        <div className="category-row">
          {categoryOptions.map((category) => (
            <button
              key={category.name}
              type="button"
              className={`category-chip${activeFilters.includes(category.name) ? ' category-chip--active' : ''}`}
              onClick={() => toggleFilter(category.name)}
            >
              <img src={category.icon} alt="" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="habit-section">
        <h2>Habits</h2>
        {filteredHabits.length === 0 ? (
          <div className="home-empty">
            <p>No Habits Recorded</p>
          </div>
        ) : (
          <div className="habit-grid">
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                name={habit.name}
                description={habit.description}
                completionsPerDay={habit.completionsPerDay}
                categories={habit.categories}
                icon={habit.icon}
                primaryColor={habit.primaryColor}
                secondaryColor={habit.secondaryColor}
                streakGoal={habit.streakGoal}
                reminder={habit.reminder}
              />
            ))}
          </div>
        )}
      </section>

      <div className="bottom-nav" aria-hidden="true">
        <img src={nav1SelectedIcon} alt="" />
        <img src={nav2Icon} alt="" />
        <img src={nav3Icon} alt="" />
      </div>

      {isModalOpen ? (
        <div className="modal-overlay" role="presentation">
          <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="add-habit-title">
            <div className="modal-header">
              <h2 id="add-habit-title">Add New Habit</h2>
              <button type="button" className="modal-close" onClick={handleCloseModal} aria-label="Close">
                x
              </button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <label className="modal-field">
                <span>Name</span>
                <input
                  type="text"
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  placeholder="Meditation"
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
              <div className="modal-grid">
                <label className="modal-field">
                  <span>Streak Goal</span>
                  <input
                    type="text"
                    value={formStreakGoal}
                    onChange={(event) => setFormStreakGoal(event.target.value)}
                    placeholder="30 days"
                  />
                </label>
                <label className="modal-field">
                  <span>Reminder</span>
                  <input
                    type="text"
                    value={formReminder}
                    onChange={(event) => setFormReminder(event.target.value)}
                    placeholder="08:00"
                  />
                </label>
              </div>
              <label className="modal-field">
                <span>Completions per day</span>
                <input
                  type="number"
                  min={1}
                  value={formCompletions}
                  onChange={(event) => setFormCompletions(event.target.value)}
                />
              </label>
              <div className="modal-field">
                <span>Categories</span>
                <div className="modal-category-row">
                  {categoryOptions.map((category) => (
                    <button
                      key={category.name}
                      type="button"
                      className={`modal-category-chip${
                        formCategories.includes(category.name) ? ' modal-category-chip--active' : ''
                      }`}
                      onClick={() => toggleFormCategory(category.name)}
                    >
                      <img src={category.icon} alt="" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="modal-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="modal-primary">
                  Save habit
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
