import { Link } from 'react-router-dom'
import { ShoppingBag, Check } from 'lucide-react'
import { useState } from 'react'
import ProductImage from './ProductImage'
import { useCart } from '../context/CartContext'
import { useData } from '../context/DataContext'
import { discountPct, money } from '../lib/utils'

export default function ProductCard({ product: p }) {
  const { add } = useCart()
  const { categories } = useData()
  const [done, setDone] = useState(false)
  const cat = categories.find((c) => c.id === p.category)
  const off = discountPct(p)
  const sold = p.available === false

  const onAdd = (e) => {
    e.preventDefault()
    add({ id: p.id, name: p.name, price: p.price, image: p.image })
    setDone(true)
    setTimeout(() => setDone(false), 1100)
  }

  return (
    <Link to={`/product/${p.id}`} className="group block h-full">
      <article className="card flex h-full flex-col overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
        <div className="relative aspect-square overflow-hidden bg-sand">
          <ProductImage src={p.image} alt={p.name} emoji={cat?.emoji} className="h-full w-full transition duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {p.badge && <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shadow ${/sale/i.test(p.badge) ? 'bg-clay-500 text-white' : 'bg-ink-900 text-gold-200'}`}>{p.badge}</span>}
            {off > 0 && <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-clay-600 shadow">-{off}%</span>}
          </div>
          {sold && <span className="absolute inset-0 flex items-center justify-center bg-ink-950/60 font-display text-3xl italic text-cream">Sold out</span>}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="text-[11px] uppercase tracking-[.2em] text-gold-500">{cat?.name}</div>
          <h3 className="mt-1 line-clamp-2 min-h-[3.2rem] font-display text-[1.35rem] font-semibold leading-tight">{p.name}</h3>
          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-ink-900">{money(p.price)}</span>
              {p.oldPrice > p.price && <span className="text-sm text-ink-900/40 line-through">{money(p.oldPrice)}</span>}
            </div>
            <button onClick={onAdd} disabled={sold} aria-label="Add to cart"
              className={`flex h-11 w-11 items-center justify-center rounded-full transition ${done ? 'bg-emerald-500 text-white' : 'bg-ink-900 text-gold-200 hover:bg-gold-500 hover:text-ink-950'} disabled:opacity-40`}>
              {done ? <Check size={18} /> : <ShoppingBag size={18} />}
            </button>
          </div>
        </div>
      </article>
    </Link>
  )
}
