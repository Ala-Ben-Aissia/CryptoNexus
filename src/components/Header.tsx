export default function Header() {
  return (
    <div
      style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}
    >
      <img
        src="cryptos.png"
        alt="crypto logo"
        style={{ alignSelf: 'center' }}
        height={48}
        width={48}
      />
      <h1 style={{ marginBottom: 0 }}>Crypto Nexus</h1>
    </div>
  )
}
