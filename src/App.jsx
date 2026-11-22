import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import CartBar from './components/CartBar'
import ScrollTop from './components/ScrollTop'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Offers from './pages/Offers'
import About from './pages/About'
import Contact from './pages/Contact'
import Order from './pages/Order'
import OrderSuccess from './pages/OrderSuccess'
import AdminApp from './pages/admin/AdminApp'

export default function App() {
  const { pathname } = useLocation()
  if (pathname.startsWith('/admin')) return <Routes><Route path="/admin/*" element={<AdminApp />} /></Routes>
  return (
    <>
      <ScrollTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CartBar />
    </>
  )
}
