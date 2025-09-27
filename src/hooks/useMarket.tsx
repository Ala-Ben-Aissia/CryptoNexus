import { useEffect, useState } from 'react'
import type { Coin, Order } from '../types'
import { fetchData } from '../utils'

type State = {
  coins: Coin[]
  pending: boolean
  error: Error | null
}

const API_URL = import.meta.env.VITE_MARKET_API_URL

export default function useMarket({
  filter,
  limit,
  sortBy,
}: {
  filter: string
  limit: number
  sortBy: Order
}) {
  const [state, setState] = useState<State>({
    coins: [],
    pending: false,
    error: null,
  })

  const filteredCoins = state.coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_asc':
          return a.market_cap - b.market_cap
        case 'market_cap_desc':
          return b.market_cap - a.market_cap
        case 'current_price_asc':
          return a.current_price - b.current_price
        case 'current_price_desc':
          return b.current_price - a.current_price
        case 'price_change_percentage_24h_asc':
          return (
            a.price_change_percentage_24h -
            b.price_change_percentage_24h
          )
        case 'price_change_percentage_24h_desc':
          return (
            b.price_change_percentage_24h -
            a.price_change_percentage_24h
          )
        default:
          throw new Error('This should be impossible!', sortBy)
      }
    })

  useEffect(() => {
    async function fetchCoins() {
      setState((prevState) => ({ ...prevState, pending: true }))
      try {
        const response = await fetchData(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        )
        if (!response.ok) {
          setState((prevState) => ({
            ...prevState,
            error: new Error(
              `Failed to fetch: ${response.statusText}`
            ),
          }))
          return
        }
        const data = (await response.json()) as Coin[]
        setState((prevState) => ({
          ...prevState,
          pending: false,
          coins: data,
        }))
      } catch (error: unknown) {
        if (error instanceof Error) {
          setState((prevState) => ({
            ...prevState,
            error: new Error(
              `Failed to fetch data! ${error.message}`
            ),
          }))
        } else {
          setState((prevState) => ({
            ...prevState,
            error: new Error('Unknown error occurred!'),
          }))
        }
      } finally {
        setState((prevState) => ({ ...prevState, pending: false }))
      }
    }

    fetchCoins()
  }, [limit])

  return { ...state, coins: filteredCoins }
}
