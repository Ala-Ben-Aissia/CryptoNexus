import { useState } from 'react'
import { Link } from 'react-router'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      <div className="header-container">
        <div className="logo-container">
          <img src="/cryptos.webp" alt="crypto logo" className="logo-image" />
          <h1>
            <Link to="/">CryptoNexus</Link>
          </h1>
        </div>

        <nav className="desktop-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>

        <button
          className="burger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About
          </Link>
        </div>
      </div>
    </header>
  )
}
