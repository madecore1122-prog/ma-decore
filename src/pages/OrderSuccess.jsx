import { Link } from 'react-router-dom'
import { CheckCircle2, MessageCircle, Phone } from 'lucide-react'
import { useData } from '../context/DataContext'
import { money } from '../lib/utils'
import { orderMessage, waLink } from '../lib/whatsapp'

export default function OrderSuccess() {
  const { settings: s } = useData()
  let order = null
  try { order = JSON.parse(localStorage.getItem('md_last_order')) } catch { /* ignore */ }
  if (!order) return <div className="container-x py-40 text-center"><Link to="/shop" className="btn-gold">Go to Shop</Link></div>
  const cod = order.payment.method === 'Cash on Delivery'
  return (
    <section className="pattern-bg bg-ink-950 pb-20 pt-32">
      <div className="container-x max-w-2xl">
        <div className="card animate-pop overflow-hidden text-center">
          <div className="bg-gradient-to-br from-gold-300 to-gold-500 py-10 text-ink-950">
            <CheckCircle2 size={64} className="mx-auto" />
            <h1 className="mt-3 font-display text-5xl font-semibold">Thank you! Order received</h1>
            <p className="mt-1 font-medium">Order number {order.orderNo}</p>
          </div>
          <div className="space-y-5 p-6 sm:p-9">
            <p className="text-ink-900/70">Your handmade order will be prepared in {s.prepTime}. If WhatsApp did not open automatically, tap the button below and press <b>Send</b> so we can confirm it right away.{!cod && <> Please also send your <b>{order.payment.method}</b> payment screenshot there.</>}</p>
            <a href={waLink(s.whatsapp, orderMessage(order, s.name))} target="_blank" rel="noreferrer" className="btn w-full bg-emerald-600 !py-4 text-white hover:bg-emerald-500"><MessageCircle size={19} /> Send order on WhatsApp</a>
            <ul className="divide-y divide-ink-900/10 rounded-2xl bg-cream p-4 text-left text-sm">
              {order.items.map((i, k) => <li key={k} className="flex justify-between gap-3 py-2"><span>{i.qty} x {i.name}</span><b className="shrink-0">{money(i.qty * i.price)}</b></li>)}
              {order.discount > 0 && <li className="flex justify-between py-2 text-emerald-600"><span>Discount ({order.coupon})</span><b>-{money(order.discount)}</b></li>}
              <li className="flex justify-between py-2"><span>Delivery</span><b>{order.deliveryFee ? money(order.deliveryFee) : 'FREE'}</b></li>
              <li className="flex justify-between py-2 text-base"><b>Total</b><b className="text-gold-600">{money(order.total)}</b></li>
            </ul>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/shop" className="btn-outline">Continue shopping</Link>
              <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="btn-dark"><Phone size={16} /> Call us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
