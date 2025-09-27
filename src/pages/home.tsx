import CoinCard from '@components/CoinCard'
import LimitSelector from '@components/LimitSelector'
import FilterInput from '@components/FilterInput'
import useMarket from '../hooks/useMarket'
import type { Order, Limit, Filter } from '../types'
import SortSelector from '@components/SortSelector'
import CoinCardSkeleton from '@components/CoinCardSkeleton'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function HomePage() {
  const [limit, setLimit] = useLocalStorage<Limit>('per_page', 10)
  const [filter, setFilter] = useLocalStorage<Filter>('filter', '')
  const [sortBy, setSortBy] = useLocalStorage<Order>('order', 'market_cap_desc')

  const { coins, pending, error } = useMarket({
    filter,
    limit,
    sortBy,
  })

  return (
    <div>
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>
      <main className="grid">
        {error ? (
          <pre className="error">{error.message}</pre>
        ) : pending ? (
          Array.from({ length: limit }).map((_, index) => (
            <CoinCardSkeleton key={index} />
          ))
        ) : coins.length > 0 ? (
          coins.map((coin) => {
            return <CoinCard coin={coin} key={coin.id} />
          })
        ) : (
          <p>No matching coins</p>
        )}
      </main>
    </div>
  )
}
