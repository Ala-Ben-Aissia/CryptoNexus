export type Coin = {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

export type Order =
  | 'market_cap_asc'
  | 'market_cap_desc'
  | 'current_price_asc'
  | 'current_price_desc'
  | 'price_change_percentage_24h_asc'
  | 'price_change_percentage_24h_desc'

export type Limit = 5 | 10 | 20 | 50 | 100

export type Filter = 'name' | 'symbol' | ''
