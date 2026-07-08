type HeaderProps = {
  favoritesCount: number
  onToggleSidebar: () => void
}

function Header({ favoritesCount, onToggleSidebar }: HeaderProps) {
  return (
    <section className="catalog-header">
      <div className="header-top">
        <div>
          <p className="eyebrow">Catálogo de videojuegos</p>
          <h1>Descubre títulos gratis y populares</h1>
        </div>
        <button
          className="favorites-toggle"
          onClick={onToggleSidebar}
          aria-label="Mostrar favoritos"
          type="button"
        >
          FAVORITOS {favoritesCount}
        </button>
      </div>
      <p className="subtitle">Victor Morales, Alex Crooker.</p>
    </section>
  )
}

export default Header
