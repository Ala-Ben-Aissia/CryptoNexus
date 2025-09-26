import Header from '@components/Header'
import CoinCard from '@components/CoinCard'
import { useEffect, useState } from 'react'
import type { Coin } from './types'

type State = {
  coins: Coin[]
  pending: boolean
  error: Error | null
}

const API_URL = import.meta.env.VITE_API_URL

export default function App() {
  const [{ coins, pending, error }, setState] = useState<State>({
    coins: [],
    pending: false,
    error: null,
  })

  useEffect(() => {
    async function fetchCoin() {
      setState((prevState) => ({ ...prevState, pending: true }))
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
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
  }, [])

  return (
    <div>
      <Header />
      {pending && <pre>Loading...</pre>}
      {error && <pre className="error">{error.message}</pre>}
      {!pending && !error && (
        <main className="grid">
          {coins.map((coin) => {
            return <CoinCard coin={coin} key={coin.id} />
          })}
        </main>
      )}
    </div>
  )
}
