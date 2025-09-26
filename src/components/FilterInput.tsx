import type { Dispatch, SetStateAction } from 'react'
import type { Filter } from '../types'

export default function FilterInput({
  filter,
  onFilterChange,
}: {
  filter: Filter
  onFilterChange: Dispatch<SetStateAction<Filter>>
}) {
  return (
    <div className="filter">
      <input
        type="text"
        name="filter"
        value={filter}
        placeholder="Filter coins by name or symbol"
        onChange={(e) => {
          onFilterChange(e.currentTarget.value as typeof filter)
        }}
      />
    </div>
  )
}
