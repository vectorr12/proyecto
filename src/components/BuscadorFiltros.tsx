type SearchFiltersProps = {
  searchTerm: string
  setSearchTerm: (value: string) => void
  selectedGenre: string
  setSelectedGenre: (value: string) => void
  selectedPlatform: string
  setSelectedPlatform: (value: string) => void
  genres: string[]
  platforms: string[]
  totalGames: number
  favoriteCount: number
  lockedCount: number
}

function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  selectedPlatform,
  setSelectedPlatform,
  genres,
  platforms,
  totalGames,
  favoriteCount,
  lockedCount,
}: SearchFiltersProps) {
  return (
    <section className="search-filters">
      <div className="stats-grid" aria-label="Estadísticas del catálogo">
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <strong>{totalGames}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Favoritos</span>
          <strong>{favoriteCount}</strong>
        </div>
        <div className="stat-card">
          <span className="stat-label">Bloqueados</span>
          <strong>{lockedCount}</strong>
        </div>
      </div>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="search-input"
      />
      <div className="filters">
        <select
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}
          className="filter-select"
          aria-label="Filtrar por género"
        >
          <option value="todos">Todos los géneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <select
          value={selectedPlatform}
          onChange={(event) => setSelectedPlatform(event.target.value)}
          className="filter-select"
          aria-label="Filtrar por plataforma"
        >
          <option value="todos">Todas las plataformas</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}

export default SearchFilters
