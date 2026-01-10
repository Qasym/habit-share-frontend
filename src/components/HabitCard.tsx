import './HabitCard.css'

type HabitCardProps = {
  name: string
  description: string
  completionsPerDay: number
}

function HabitCard({ name, description, completionsPerDay }: HabitCardProps) {
  return (
    <article className="habit-card">
      <h2>{name}</h2>
      <p>{description || 'No description yet.'}</p>
      <span className="habit-meta">
        {completionsPerDay} completion{completionsPerDay === 1 ? '' : 's'} per day
      </span>
    </article>
  )
}

export default HabitCard
