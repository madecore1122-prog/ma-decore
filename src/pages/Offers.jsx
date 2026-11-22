import { Link } from 'react-router-dom'
import { Truck, Tag } from 'lucide-react'
import { useData } from '../context/DataContext'
import PageHero from '../components/PageHero'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { isActive } from '../components/Countdown'
import { OfferBanner } from './Home'

export default function Offers() {
  const { products, settings: s } = useData()
  const sale = products.filter((p) => p.oldPrice > p.price)
  const active = isActive(s.offerEnds)
  return (
    <>
      <PageHero kicker="Save more" title="Offers" sub="Special prices on our handmade pieces." />
      <div className="pt-10">
        {active ? <OfferBanner /> : <div className="container-x"><div className="rounded-3xl bg-white p-8 text-center shadow-card"><h2 className="font-display text-4xl">The latest offer has ended</h2><p className="mt-2 text-ink-900/60">Don't worry - regular sale prices are still available below.</p></div></div>}
      </div>
      <section className="container-x grid gap-5 py-12 sm:grid-cols-2">
        {active && <div className="card flex items-center gap-5 p-6"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-300"><Tag /></span><div><div className="font-display text-2xl font-semibold">{s.offerText}</div><div className="text-sm text-ink-900/60">Apply code <b>{s.offerCode}</b> in your cart.</div></div></div>}
        {s.freeDeliveryMinItems > 0 && <div className="card flex items-center gap-5 p-6"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-300"><Truck /></span><div><div className="font-display text-2xl font-semibold">Free delivery</div><div className="text-sm text-ink-900/60">On orders of {s.freeDeliveryMinItems} or more items.</div></div></div>}
      </section>
      <section className="pb-20">
        <div className="container-x">
          <h2 className="mb-8 text-center font-display text-5xl font-semibold">On Sale Now</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{sale.map((p, k) => <Reveal key={p.id} delay={(k % 4) * 70}><ProductCard product={p} /></Reveal>)}</div>
          {sale.length === 0 && <p className="text-center text-ink-900/50">No sale items right now. <Link to="/shop" className="underline">Browse the shop</Link></p>}
        </div>
      </section>
    </>
  )
}
