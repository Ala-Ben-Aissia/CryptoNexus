import type { Dispatch, SetStateAction } from 'react'

export default function FilterInput({
  filter,
  onFilterChange,
}: {
  filter: string
  onFilterChange: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="filter">
      <input
        type="text"
        name="filter"
        value={filter}
        placeholder="Filter coins by name or symbol"
        onChange={(e) => {
          onFilterChange(e.currentTarget.value)
        }}
      />
    </div>
  )
}
