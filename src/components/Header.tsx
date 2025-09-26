import { Link } from 'react-router'

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        padding: '0 1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <img
          style={{ width: '48px', height: '48px' }}
          src="cryptos.png"
          alt="crypto logo"
        />
        <h1 style={{ margin: 0 }}>
          <Link to="/">CryptoNexus</Link>
        </h1>
      </div>

      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}
