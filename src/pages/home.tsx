import { useState } from 'react'
import Header from '@components/Header'
import CoinCard from '@components/CoinCard'
import LimitSelector from '@components/LimitSelector'
import FilterInput from '@components/FilterInput'
import { useCoins } from '../hooks/useCoins'
import type { Order, Limit, Filter } from '../types'
import SortSelector from '@components/SortSelector'

export default function HomePage() {
  const [limit, setLimit] = useState<Limit>(10)
  const [filter, setFilter] = useState<Filter>('')
  const [sortBy, setSortBy] = useState<Order>('market_cap_desc')

  const { coins, pending, error } = useCoins({
    filter,
    limit,
    sortBy,
  })

  return (
    <div>
      <Header />
      {pending && <pre>Loading...</pre>}
      {error && <pre className="error">{error.message}</pre>}
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
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
