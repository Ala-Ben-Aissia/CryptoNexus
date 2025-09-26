import { useEffect, useState } from 'react'
import type { Coin, Order } from '../types'

type State = {
  coins: Coin[]
  pending: boolean
  error: Error | null
}

declare global {
  interface ImportMetaEnv {
    VITE_MARKET_API_URL: string
    VITE_COIN_API_URL: string
  }
}

const MARKET_API_URL = import.meta.env.VITE_MARKET_API_URL
const COIN_API_URL = import.meta.env.VITE_COIN_API_URL

type Params =
  | {
      type: 'multi'
      filter: string
      limit: number
      sortBy: Order
    }
  | {
      type: 'single'
      id: string
    }

export function useMarket(params: Params) {
  const [state, setState] = useState<State>({
    coins: [],
    pending: false,
    error: null,
  })

  const isMulti = params.type === 'multi'

  const processedCoins = isMulti
    ? state.coins
        .filter((coin) => {
          const filter = params.filter.toLowerCase()
          return (
            coin.name.toLowerCase().includes(filter) ||
            coin.symbol.toLowerCase().includes(filter)
          )
        })
        .sort((a, b) => {
          switch (params.sortBy) {
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
              return 0
          }
        })
    : state.coins

  useEffect(() => {
    async function fetchData() {
      setState((prev) => ({ ...prev, pending: true, error: null }))

      try {
        const url = isMulti
          ? `${MARKET_API_URL}&order=market_cap_desc&per_page=${params.limit}&page=1&sparkline=false`
          : `${COIN_API_URL}/${params.id}`

        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${response.statusText}`
          )
        }

        const data = (await response.json()) as Coin | Coin[]
        const coins = Array.isArray(data) ? data : [data]

        setState((prev) => ({
          ...prev,
          pending: false,
          coins,
        }))
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Unknown error occurred'
        setState((prev) => ({
          ...prev,
          pending: false,
          error: new Error(message),
        }))
      }
    }

    fetchData()
  }, [isMulti ? params.limit : undefined])

  return {
    pending: state.pending,
    error: state.error,
    coins: isMulti ? processedCoins : [],
    coin: processedCoins[0],
  }
}
