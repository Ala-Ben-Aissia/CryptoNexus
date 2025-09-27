import { useEffect, useState } from 'react'
import type { Coin } from '../types'

type State = {
  coin: Coin | undefined
  pending: boolean
  error: Error | null
}

const API_URL = import.meta.env.VITE_COIN_API_URL

export default function useCoin({ id: coinId }: { id: string }) {
  const [state, setState] = useState<State>({
    coin: undefined,
    pending: false,
    error: null,
  })

  useEffect(() => {
    async function fetchCoin() {
      setState((prevState) => ({ ...prevState, pending: true }))
      try {
        const response = await fetch(`${API_URL}/${coinId}`)
        if (!response.ok) {
          setState((prevState) => ({
            ...prevState,
            error: new Error(
              `Failed to fetch: ${response.statusText}`
            ),
          }))
        }
        const data = (await response.json()) as Coin
        setState((prevState) => ({
          ...prevState,
          pending: false,
          coin: data,
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
  }, [])

  return state as State & { coin: Coin }
}
