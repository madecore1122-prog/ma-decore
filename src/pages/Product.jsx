import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, MessageCircle, Hand, PackageCheck, Clock, ChevronRight } from 'lucide-react'
import { useData } from '../context/DataContext'
import { useCart } from '../context/CartContext'
import ProductImage from '../components/ProductImage'
import ProductCard from '../components/ProductCard'
import { discountPct, money } from '../lib/utils'
import { waLink } from '../lib/whatsapp'

export default function Product() {
  const { id } = useParams()
  const { products, categories, settings: s } = useData()
  const { add } = useCart()
  const nav = useNavigate()
  const [qty, setQty] = useState(1)
  const p = products.find((x) => x.id === id)

  if (!p) return <div className="container-x py-40 text-center"><h1 className="font-display text-5xl">Product not found</h1><Link to="/shop" className="btn-gold mt-6">Back to Shop</Link></div>

  const cat = categories.find((c) => c.id === p.category)
  const off = discountPct(p)
  const sold = p.available === false
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)
  const line = { id: p.id, name: p.name, price: p.price, image: p.image }
  const waText = `Hello! I want to order:\n${qty} x ${p.name} - ${money(p.price * qty)}\n\nPlease confirm availability.`

  return (
    <>
      <section className="bg-cream pb-16 pt-28 sm:pt-32">
        <div className="container-x">
          <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-900/55">
            <Link to="/" className="hover:text-gold-600">Home</Link><ChevronRight size={14} />
            <Link to="/shop" className="hover:text-gold-600">Shop</Link><ChevronRight size={14} />
            <Link to={`/shop?cat=${p.category}`} className="hover:text-gold-600">{cat?.name}</Link>
          </nav>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute -inset-3 rotate-1 rounded-[2rem] bg-gold-200/50" />
              <ProductImage src={p.image} alt={p.name} emoji={cat?.emoji} className="relative aspect-square w-full rounded-[2rem] shadow-card" />
              {p.badge && <span className={`absolute left-5 top-5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow ${/sale/i.test(p.badge) ? 'bg-clay-500 text-white' : 'bg-ink-900 text-gold-200'}`}>{p.badge}</span>}
            </div>
            <div className="lg:py-4">
              <div className="text-xs uppercase tracking-[.3em] text-gold-500">{cat?.name}</div>
              <h1 className="mt-2 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">{p.name}</h1>
              <div className="mt-5 flex flex-wrap items-baseline gap-3">
                <span className="font-display text-5xl font-semibold text-gold-600">{money(p.price)}</span>
                {p.oldPrice > p.price && <><span className="text-xl text-ink-900/40 line-through">{money(p.oldPrice)}</span><span className="rounded-full bg-clay-50 px-3 py-1 text-sm font-semibold text-clay-600">Save {off}%</span></>}
              </div>
              <p className="mt-6 leading-relaxed text-ink-900/70">{p.desc}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 rounded-full bg-white p-1.5 shadow-card">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sand" aria-label="decrease"><Minus size={16} /></button>
                  <span className="w-8 text-center font-semibold">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-sand" aria-label="increase"><Plus size={16} /></button>
                </div>
                <button disabled={sold} onClick={() => add(line, qty)} className="btn-dark flex-1 sm:flex-none"><ShoppingBag size={17} /> {sold ? 'Sold out' : 'Add to Cart'}</button>
                <button disabled={sold} onClick={() => { add(line, qty); nav('/order') }} className="btn-gold flex-1 sm:flex-none">Buy Now</button>
              </div>
              <a href={waLink(s.whatsapp, waText)} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline"><MessageCircle size={17} /> Or ask / order directly on WhatsApp</a>

              <div className="mt-10 grid gap-4 border-t border-gold-300/40 pt-8 sm:grid-cols-3">
                {[[Hand, '100% Handmade'], [Clock, `Ready in ${s.prepTime}`], [PackageCheck, 'Safe packing']].map(([Icon, t]) => (
                  <div key={t} className="flex items-center gap-3 text-sm font-medium"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-300"><Icon size={20} /></span>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-white py-16">
          <div className="container-x">
            <h2 className="mb-8 text-center font-display text-4xl font-semibold sm:text-5xl">You may also like</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div>
          </div>
        </section>
      )}
    </>
  )
}
