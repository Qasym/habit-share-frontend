import type { CSSProperties } from 'react'
import './HabitCard.css'

type HabitCardProps = {
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

function HabitCard({
  name,
  description,
  completionsPerDay,
  categories,
  icon,
  primaryColor,
  secondaryColor,
  streakGoal,
  reminder,
}: HabitCardProps) {
  const style = {
    '--habit-primary': primaryColor,
    '--habit-secondary': secondaryColor,
  } as CSSProperties

  const heatmapCells = Array.from({ length: 18 }, (_, index) => {
    return (index + completionsPerDay) % 5 === 0 || index % 7 === 0
  })

  return (
    <article className="habit-card" style={style}>
      <div className="habit-card__header">
        <div className="habit-card__title">
          <div className="habit-card__icon">
            <img src={icon} alt="" />
          </div>
          <div>
            <h3>{name}</h3>
            <p>{description || 'No description yet.'}</p>
          </div>
        </div>
        <div className="habit-card__check" aria-hidden="true">
          ✓
        </div>
      </div>

      <div className="habit-card__meta">
        <span>{completionsPerDay} per day</span>
        {streakGoal ? <span>Goal: {streakGoal}</span> : null}
        {reminder ? <span>Reminder: {reminder}</span> : null}
      </div>

      {categories.length > 0 ? (
        <div className="habit-card__categories">
          {categories.map((category) => (
            <span key={category} className="habit-card__chip">
              {category}
            </span>
          ))}
        </div>
      ) : null}

      <div className="habit-card__heatmap" aria-hidden="true">
        {heatmapCells.map((isActive, index) => (
          <span
            key={`${name}-${index}`}
            className={`habit-card__heatmap-cell${isActive ? ' habit-card__heatmap-cell--active' : ''}`}
          />
        ))}
      </div>
    </article>
  )
}

export default HabitCard
