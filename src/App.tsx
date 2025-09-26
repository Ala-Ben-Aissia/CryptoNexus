import Header from '@components/Header'
import CoinCard from '@components/CoinCard'
import { useEffect, useState } from 'react'
import type { Coin } from './types'

type State = {
  coins: Coin[]
  pending: boolean
  error: Error | null
}

const API_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'

export default function App() {
  const [{ coins, pending, error }, setState] = useState<State>({
    coins: [],
    pending: false,
    error: null,
  })

  useEffect(() => {
    async function fetchCoint() {
      setState((state) => ({ ...state, pending: true }))
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          setState((state) => ({
            ...state,
            error: new Error('Failed to fetch data!, Pos1'),
          }))
        }
        const data = (await response.json()) as Coin[]
        setState((state) => ({
          ...state,
          coins: data,
        }))
      } catch {
        setState((state) => ({
          ...state,
          error: new Error('Failed to fetch data!, Pos2'),
        }))
      } finally {
        setState((state) => ({ ...state, pending: false }))
      }
    }

    fetchCoint()
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
