export default function CoinCardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-header">
        <div className="skeleton-image"></div>
        <div style={{ flex: 1 }}>
          <div className="skeleton-name skeleton-block"></div>
          <div className="skeleton-symbol skeleton-block"></div>
        </div>
      </div>
      <div className="skeleton-price skeleton-block"></div>
      <div className="skeleton-price-change skeleton-block"></div>
      <div className="skeleton-market-cap skeleton-block"></div>
    </div>
  )
}
