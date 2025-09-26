import { Route, Routes } from 'react-router'
import HomePage from './pages/home'
import AboutPage from './pages/about'
import Header from '@components/Header'
import Notfound from './pages/not-found'
import CoinDetailsPage from './pages/coin-details'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="coin/:id" element={<CoinDetailsPage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  )
}
