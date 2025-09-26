import type { Dispatch, SetStateAction } from 'react'
import type { Order } from '../types'

export default function SortSelector({
  sortBy,
  onSortChange,
}: {
  sortBy: Order
  onSortChange: Dispatch<SetStateAction<Order>>
}) {
  return (
    <div className="controls">
      <label htmlFor="order">Sort by:</label>
      <select
        id="order"
        value={sortBy}
        onChange={(e) => onSortChange(e.currentTarget.value as Order)}
      >
        <option value="current_price_asc">
          Price &nbsp;(Low → High)
        </option>
        <option value="current_price_desc">
          Price &nbsp;(High → Low)
        </option>

        <option value="price_change_percentage_24h_asc">
          24h Change &nbsp;(Low → High)
        </option>
        <option value="price_change_percentage_24h_desc">
          24h Change &nbsp;(High → Low)
        </option>

        <option value="market_cap_asc">
          Market Cap &nbsp;(Low → High)
        </option>
        <option value="market_cap_desc">
          Market Cap &nbsp;(High → Low)
        </option>
      </select>
    </div>
  )
}
