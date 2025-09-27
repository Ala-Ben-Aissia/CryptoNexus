import { Link } from 'react-router'

export default function CoinDetailsSkeleton() {
  return (
    <div className="coin-details-container">
      <Link to="/">← Go Back Home</Link>

      <div
        className="skeleton-block"
        style={{
          width: '40%',
          height: '3rem',
          margin: '0 auto 32px auto',
        }}
      />

      {/* Coin image */}
      <div
        className="skeleton-block"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          margin: '0 auto 20px auto',
        }}
      ></div>

      {[1, 2, 3].map((_) => (
        <div
          key={_}
          className="skeleton-block"
          style={{
            width: '80%',
            height: '1rem',
            margin: '0 auto 15px auto',
          }}
        />
      ))}

      {/* Coin info stats */}
      <div className="coin-details-info">
        {Array.from({ length: 10 }).map((_, i) =>
          i > 1 ? (
            <div
              key={i}
              className="skeleton-block"
              style={{
                width: i % 3 === 0 ? '60%' : '40%',
                height: '1.5rem',
                margin: '10px auto',
              }}
            />
          ) : (
            <div className="skeleton-rank" key={i} />
          )
        )}
      </div>

      {/* External links */}
      <div
        className="coin-details-links"
        style={{ marginTop: '30px' }}
      >
        <div
          className="skeleton-block"
          style={{
            width: '150px',
            height: '1rem',
            margin: '10px auto',
          }}
        ></div>
        <div
          className="skeleton-block"
          style={{
            width: '180px',
            height: '1rem',
            margin: '10px auto',
          }}
        ></div>
        <div
          className="skeleton-block"
          style={{
            width: '200px',
            height: '1rem',
            margin: '10px auto',
          }}
        ></div>
      </div>
    </div>
  )
}
