import { Link, useParams } from 'react-router'
import useCoin from '../hooks/useCoin'
import CoinDetailsSkeleton from '@components/CoinDetailsSkeleton'
import CoinCard from '@components/CoinCard'
import CoinChart from '@components/CoinChart'

export default function CoinDetailsPage() {
  const { id } = useParams()
  const { coin, pending, error } = useCoin({ id: id! })

  if (pending) {
    return <CoinDetailsSkeleton />
  }

  return (
    <div className="coin-details-container">
      <Link to="/">← Go Back Home</Link>

      <h1 className="coin-details-title">
        {coin && `${coin.name} (${coin.symbol.toUpperCase()})`}
      </h1>
      {coin ? (
        <>
          <img
            src={coin.image.large}
            alt={coin.id}
            className="coin-details-image"
          />
          <p>{coin.description.en.split('. ')[0]}</p>
          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: $
              {coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>
              24h High: $
              {coin.market_data.high_24h.usd.toLocaleString()}
            </h4>
            <h4>
              24h Low: $
              {coin.market_data.low_24h.usd.toLocaleString()}
            </h4>
            <h4>
              24h Price Change: $
              {coin.market_data.price_change_24h.toFixed(2)} (
              {coin.market_data.price_change_percentage_24h} %)
            </h4>
            <h4>
              Ciculating Supply:{' '}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{' '}
              {coin.market_data.total_supply.toLocaleString()}
            </h4>
            <h4>
              All-Time-High: $
              {coin.market_data.ath.usd.toLocaleString()} on{' '}
              {new Date(
                coin.market_data.ath_date.usd
              ).toLocaleDateString()}
            </h4>
            <h4>
              All-Time-Low: $
              {coin.market_data.atl.usd.toLocaleString()} on{' '}
              {new Date(
                coin.market_data.atl_date.usd
              ).toLocaleDateString()}
            </h4>
            <h4>
              Last updated:{' '}
              {new Date(coin.last_updated).toLocaleString('en')}
            </h4>
          </div>
          <CoinChart coinId={coin.id} />
          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <p>
                🌐{' '}
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  Visit Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                🧩{' '}
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  Explore BlockChain
                </a>
              </p>
            )}
            {coin.categories.length > 0 && (
              <p className="categories">
                <b>Catergories:</b> {coin.categories.join(', ')}
              </p>
            )}
          </div>
        </>
      ) : null}
      {error && (
        <pre className="error" style={{ color: 'red' }}>
          {error.message}
        </pre>
      )}
    </div>
  )
}
