import type { Dispatch, SetStateAction } from 'react'
import type { Limit } from '../types'

const LimitSelector: React.FC<{
  limit: Limit
  onLimitChange: Dispatch<SetStateAction<Limit>>
}> = ({ limit, onLimitChange }) => {
  return (
    <div className="controls">
      <label htmlFor="limit">Show:</label>
      <select
        name="limit"
        id="limit"
        value={limit}
        onChange={(e) => {
          onLimitChange(+e.currentTarget.value as Limit)
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  )
}

export default LimitSelector
