import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  type ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { useEffect, useState } from 'react'
import { fetchData } from '../utils'

ChartJS.register(
  Filler,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
)

type APIData = {
  prices: [number, number][]
}

type Data = ChartData<'line', { x: number; y: number }[]>

type State = ['loading', undefined] | ['error', Error] | ['success', Data]

const API_URL = import.meta.env.VITE_COIN_API_URL

export default function CoinChart({ coinId }: { coinId: string }) {
  const [state, setState] = useState<State>(['loading', undefined])

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetchData(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`
        )
        if (!response.ok) {
          setState([
            'error',
            new Error(`Failed to fetch: ${response.statusText}`),
          ])
        }
        const data = (await response.json()) as APIData
        const prices = data.prices.map((p) => ({ x: p[0], y: p[1] }))
        setState([
          'success',
          {
            datasets: [
              {
                label: 'Price (USD)',
                data: prices,
                fill: true,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                pointRadius: 0,
                tension: 0.3,
                borderWidth: (ctx) => {
                  const chartWidth = ctx.chart.width
                  if (chartWidth < 400) return 1
                  if (chartWidth < 800) return 2
                  return 3
                },
              },
            ],
          },
        ])
      } catch (error) {
        setState(['error', new Error('Unknown error occurred!')])
      }
    }

    fetchPrices()
  }, [])

  const [status, data] = state
  switch (status) {
    case 'loading':
      return 'Loading...'
    case 'error':
      throw data
    case 'success':
      return (
        <div style={{ marginTop: '30px' }}>
          <Line
            data={state[1]}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { mode: 'index', intersect: false },
              },
              scales: {
                x: {
                  type: 'time',
                  time: { unit: 'day' },
                  ticks: { autoSkip: true, maxTicksLimit: 7 },
                },
                y: {
                  ticks: {
                    callback: (tickValue) => `$${tickValue.toLocaleString()}`,
                  },
                },
              },
            }}
          />
        </div>
      )
  }
}
