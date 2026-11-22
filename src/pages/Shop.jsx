import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useData } from '../context/DataContext'
import ProductCard from '../components/ProductCard'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

export default function Shop() {
  const { categories, products } = useData()
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('default')
  const cat = params.get('cat') || 'all'
  const setCat = (c) => (c === 'all' ? setParams({}) : setParams({ cat: c }))

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    let r = products.filter((p) => (cat === 'all' || p.category === cat) && (!s || p.name.toLowerCase().includes(s)))
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price)
    if (sort === 'sale') r = [...r].sort((a, b) => (b.oldPrice > b.price) - (a.oldPrice > a.price))
    return r
  }, [products, cat, q, sort])

  const countOf = (id) => products.filter((p) => p.category === id).length

  return (
    <>
      <PageHero kicker="Handmade collection" title="Shop" sub="Crystal lamps, wooden decoration pieces, wall decor and gifts." />
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <div className="sticky top-[68px] z-30 -mx-4 mb-10 bg-cream/95 px-4 py-3 backdrop-blur sm:top-[76px] sm:mx-0 sm:rounded-3xl sm:shadow-card sm:ring-1 sm:ring-black/5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
                {[{ id: 'all', name: 'All' }, ...categories].map((c) => (
                  <button key={c.id} onClick={() => setCat(c.id)}
                    className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium transition ${cat === c.id ? 'bg-ink-900 text-gold-200 shadow-card' : 'bg-white text-ink-900 ring-1 ring-black/10 hover:bg-gold-50'}`}>
                    {c.name} <span className="opacity-50">({c.id === 'all' ? products.length : countOf(c.id)})</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1 lg:w-56"><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-900/40" /><input className="input !rounded-full !py-2.5 pl-10" placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} /></div>
                <select className="input !w-auto !rounded-full !py-2.5" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="default">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="sale">On Sale first</option>
                </select>
              </div>
            </div>
          </div>
          {list.length === 0 && <p className="py-20 text-center text-ink-900/50">No products found.</p>}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((p, k) => <Reveal key={p.id} delay={(k % 4) * 60}><ProductCard product={p} /></Reveal>)}
          </div>
        </div>
      </section>
    </>
  )
}
