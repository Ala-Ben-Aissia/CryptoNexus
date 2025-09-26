import type { Dispatch, SetStateAction } from 'react'

export default function LimitSelector({
  limit,
  onLimitChange,
}: {
  limit: number
  onLimitChange: Dispatch<SetStateAction<number>>
}) {
  return (
    <div className="controls">
      <label htmlFor="limit">
        Show:
        <select
          name="limit"
          id="limit"
          value={limit}
          onChange={(e) => {
            onLimitChange(+e.currentTarget.value)
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
    </div>
  )
}
