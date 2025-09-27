declare global {
  interface ImportMetaEnv {
    VITE_MARKET_API_URL: string
    VITE_COIN_API_URL: string
    VITE_API_KEY: string
  }
}

type Currency = {
  usd: number
  eur: number
  cad: number
}

export type Coin = {
  id: string
  name: string
  symbol: string
  description: {
    en: string
    fr: string
    sp: string
  }
  image:
    | {
        large: string
        small: string
        thumb: string
      }
    | string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  market_cap_rank: number
  last_updated: string
  links: {
    homepage: string[]
    blockchain_site: string[]
  }
  categories: string[]
  market_data: {
    current_price: Currency
    market_cap: Currency
    high_24h: Currency
    low_24h: Currency
    ath: Currency
    ath_date: Currency
    atl: Currency
    atl_date: Currency
    price_change_24h: number
    price_change_percentage_24h: number
    circulating_supply: number
    total_supply: number
    max_supply: number
  }
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
