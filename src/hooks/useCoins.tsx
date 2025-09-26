import { useEffect, useState } from 'react'
import type { Coin } from '../types'

type State = {
  coins: Coin[]
  pending: boolean
  error: Error | null
}

declare global {
  interface ImportMetaEnv {
    VITE_API_URL: string
  }
}

const API_URL = import.meta.env.VITE_API_URL

export function useCoins({
  filter,
  limit,
}: {
  filter: string
  limit: number
}) {
  const [state, setState] = useState<State>({
    coins: [],
    pending: false,
    error: null,
  })

  const filteredCoins = state.coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
    )
  })

  useEffect(() => {
    async function fetchCoin() {
      setState((prevState) => ({ ...prevState, pending: true }))
      try {
        const response = await fetch(
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

    fetchCoin()
  }, [limit])

  return { ...state, coins: filteredCoins }
}
