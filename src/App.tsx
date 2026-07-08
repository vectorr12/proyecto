import { useEffect, useState } from 'react'
import './App.css'
import FavoritesSidebar from './components/BarraFavoritos'
import GameCard from './components/TarjetaJuego'
import Header from './components/Encabezado'
import SearchFilters from './components/BuscadorFiltros'
import type { Game } from './types'

function getSpanishDescription(game: Game) {
  const genre = game.genre.toLowerCase()
  const platform = game.platform.toLowerCase()

  if (genre.includes('mmo')) {
    return `Explora un universo online con misiones, progresión y encuentros constantes en ${platform}.`
  }

  if (genre.includes('shooter')) {
    return `Disfruta de acción intensa y combates dinámicos en ${platform}.`
  }

  if (genre.includes('strategy')) {
    return `Pon a prueba tus habilidades de planificación y control en ${platform}.`
  }

  if (genre.includes('racing')) {
    return `Acelera y compite en emocionantes carreras con mucha velocidad en ${platform}.`
  }

  if (genre.includes('sports')) {
    return `Vive partidas competitivas y retos deportivos en ${platform}.`
  }

  return `Descubre una experiencia entretenida de ${genre} disponible en ${platform}.`
}

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('todos')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('todos')
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favoriteGames')
    return saved ? JSON.parse(saved) : []
  })
  const [lockedGames, setLockedGames] = useState<number[]>(() => {
    const saved = localStorage.getItem('lockedGames')
    return saved ? JSON.parse(saved) : []
  })
  const [showSidebar, setShowSidebar] = useState(false)

  const genres = Array.from(new Set(games.map((game) => game.genre))).sort()
  const platforms = Array.from(new Set(games.map((game) => game.platform))).sort()
  const favoriteGames = games.filter((game) => favorites.includes(game.id))

  const toggleFavorite = (gameId: number) => {
    setFavorites(prev => {
      const updated = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
      localStorage.setItem('favoriteGames', JSON.stringify(updated))
      return updated
    })
  }

  const toggleLocked = (gameId: number) => {
    setLockedGames(prev => {
      const updated = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
      localStorage.setItem('lockedGames', JSON.stringify(updated))
      return updated
    })

    setFavorites(prev => {
      const updated = prev.filter(id => id !== gameId)
      localStorage.setItem('favoriteGames', JSON.stringify(updated))
      return updated
    })
  }

  const filteredGames = games.filter((game) => {
    const isLocked = lockedGames.includes(game.id)
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'todos' || game.genre === selectedGenre
    const matchesPlatform = selectedPlatform === 'todos' || game.platform === selectedPlatform
    return !isLocked && matchesSearch && matchesGenre && matchesPlatform
  })

  useEffect(() => {
    const controller = new AbortController()

    const loadGames = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('https://www.freetogame.com/api/games', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('No se pudieron cargar los juegos')
        }

        const data = (await response.json()) as Game[]
        setGames(data)
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }

        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado')
      } finally {
        setLoading(false)
      }
    }

    void loadGames()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="app-layout">
      <main className="catalog-page">
        <Header
          favoritesCount={favorites.length}
          onToggleSidebar={() => setShowSidebar((prev) => !prev)}
        />

        {!loading && !error && (
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedPlatform={selectedPlatform}
            setSelectedPlatform={setSelectedPlatform}
            genres={genres}
            platforms={platforms}
            totalGames={games.length}
            favoriteCount={favorites.length}
            lockedCount={lockedGames.length}
          />
        )}

        {loading && <p className="status">Cargando juegos...</p>}
        {error && <p className="status error">{error}</p>}

        {!loading && !error && (
          <section className="games-section">
            {filteredGames.length > 0 ? (
              <section className="games-grid" aria-label="Listado de videojuegos">
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    description={getSpanishDescription(game)}
                    isFavorite={favorites.includes(game.id)}
                    isLocked={lockedGames.includes(game.id)}
                    onToggleFavorite={() => toggleFavorite(game.id)}
                    onToggleLock={() => toggleLocked(game.id)}
                  />
                ))}
              </section>
            ) : (
              <p className="no-results">No se encontraron juegos que coincidan con tus criterios de búsqueda.</p>
            )}
          </section>
        )}
      </main>

      <FavoritesSidebar
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        favoriteGames={favoriteGames}
        onRemoveFavorite={(gameId) => toggleFavorite(gameId)}
      />
    </div>
  )
}

export default App
