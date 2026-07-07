import { useEffect, useState } from 'react'
import './App.css'

type Game = {
  id: number
  title: string
  thumbnail: string
  short_description: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  game_url: string
}

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
    <main className="catalog-page">
      <section className="catalog-header">
        <p className="eyebrow">Catálogo de videojuegos</p>
        <h1>Descubre títulos gratis y populares</h1>
        <p className="subtitle">
          Explora una selección sencilla de juegos cargados desde una API pública.
        </p>
      </section>

      {loading && <p className="status">Cargando juegos...</p>}
      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <section className="games-grid" aria-label="Listado de videojuegos">
          {games.map((game) => (
            <article className="game-card" key={game.id}>
              <img src={game.thumbnail} alt={game.title} />
              <div className="game-content">
                <div className="game-top">
                  <h2>{game.title}</h2>
                  <span className="badge">{game.genre}</span>
                </div>
                <p>{getSpanishDescription(game)}</p>
                <div className="meta">
                  <span>Plataforma: {game.platform}</span>
                  <span>Editor: {game.publisher}</span>
                </div>
                <div className="game-footer">
                  <span>Publicado: {game.release_date}</span>
                  <a href={game.game_url} target="_blank" rel="noreferrer">
                    Ver más
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
