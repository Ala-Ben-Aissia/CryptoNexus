import { useParams } from 'react-router'
import { useMarket } from '../hooks/useMarket'

export default function CoinDetailsPage() {
  const { id } = useParams()
  const { coin, pending, error } = useMarket({
    type: 'single',
    id: id as string,
  })

  return <h1>Coin-details {id}</h1>
}
