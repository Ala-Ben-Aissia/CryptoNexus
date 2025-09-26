import Header from '@components/Header'
import CoinCard from '@components/CoinCard'
import LimitSelector from '@components/LimitSelector'
import { useCoins } from './hooks/useCoins'

export default function App() {
  const { coins, pending, error, limit, onLimitChange } = useCoins()

  return (
    <div>
      <Header />
      {pending && <pre>Loading...</pre>}
      {error && <pre className="error">{error.message}</pre>}
      <LimitSelector limit={limit} onLimitChange={onLimitChange} />
      {!pending && !error && (
        <main className="grid">
          {coins.map((coin) => {
            return <CoinCard coin={coin} key={coin.id} />
          })}
        </main>
      )}
    </div>
  )
}
