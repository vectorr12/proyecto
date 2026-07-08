import type { Game } from '../types'

type FavoritesSidebarProps = {
  isOpen: boolean
  onClose: () => void
  favoriteGames: Game[]
  onRemoveFavorite: (gameId: number) => void
}

function FavoritesSidebar({ isOpen, onClose, favoriteGames, onRemoveFavorite }: FavoritesSidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Mis Favoritos</h2>
        <button className="sidebar-close" onClick={onClose} aria-label="Cerrar favoritos" type="button">
          ✕
        </button>
      </div>
      <div className="sidebar-content">
        {favoriteGames.length > 0 ? (
          <ul className="favorites-list">
            {favoriteGames.map((game) => (
              <li key={game.id} className="favorite-item">
                <img src={game.thumbnail} alt={game.title} />
                <div className="favorite-info">
                  <h3>{game.title}</h3>
                  <span className="badge-small">{game.genre}</span>
                  <button
                    className="remove-favorite"
                    onClick={() => onRemoveFavorite(game.id)}
                    aria-label="Quitar de favoritos"
                    type="button"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-favorites">Aún no tienes favoritos. ¡Agrega algunos juegos!</p>
        )}
      </div>
    </aside>
  )
}

export default FavoritesSidebar
