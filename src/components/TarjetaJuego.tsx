import type { Game } from '../types'

type GameCardProps = {
  game: Game
  description: string
  isFavorite: boolean
  isLocked: boolean
  onToggleFavorite: () => void
  onToggleLock: () => void
}

function GameCard({
  game,
  description,
  isFavorite,
  isLocked,
  onToggleFavorite,
  onToggleLock,
}: GameCardProps) {
  return (
    <article className={`game-card ${isLocked ? 'locked' : ''}`}>
      <div className="card-image-wrapper">
        <img src={game.thumbnail} alt={game.title} />
        <div className="card-actions">
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={onToggleFavorite}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            disabled={isLocked}
            type="button"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <button
            className={`lock-btn ${isLocked ? 'active' : ''}`}
            onClick={onToggleLock}
            aria-label={isLocked ? 'Desbloquear elemento' : 'Bloquear elemento'}
            type="button"
          >
            {isLocked ? '🔒' : '🔓'}
          </button>
        </div>
      </div>
      <div className="game-content">
        <div className="game-top">
          <h2>{game.title}</h2>
          <span className="badge">{game.genre}</span>
        </div>
        <p>{description}</p>
        <div className="meta">
          <span>Plataforma: {game.platform}</span>
          <span>Editor: {game.publisher}</span>
        </div>
        <div className="game-footer">
          <span>Publicado: {game.release_date}</span>
          <span className={isLocked ? 'locked-label' : 'available-label'}>
            {isLocked ? 'Bloqueado' : 'Disponible'}
          </span>
        </div>
      </div>
    </article>
  )
}

export default GameCard
