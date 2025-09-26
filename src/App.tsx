import { useState } from 'react'
import Header from '@components/Header'
import CoinCard from '@components/CoinCard'
import LimitSelector from '@components/LimitSelector'
import FilterInput from '@components/FilterInput'
import { useCoins } from './hooks/useCoins'

export default function App() {
  const [limit, setLimit] = useState(10)
  const [filter, setFilter] = useState('')

  const { coins, pending, error } = useCoins({ filter, limit })

  return (
    <div>
      <Header />
      {pending && <pre>Loading...</pre>}
      {error && <pre className="error">{error.message}</pre>}
      <div className="top-control">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>
      {!pending && !error && (
        <main className="grid">
          {coins.length > 0 ? (
            coins.map((coin) => {
              return <CoinCard coin={coin} key={coin.id} />
            })
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  )
}
