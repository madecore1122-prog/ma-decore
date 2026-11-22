import { useMemo, useState } from 'react'
import { Plus, Pencil, Trash2, Search, Star } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { db } from '../../lib/db'
import { money, slug } from '../../lib/utils'
import ProductImage from '../../components/ProductImage'
import { Field, ImageInput, Modal, Toggle } from './AdminUI'

const blank = (cat) => ({ name: '', category: cat, price: 0, oldPrice: 0, badge: '', image: '', desc: '', featured: false, available: true })

export default function ProductsManager() {
  const { products, categories } = useData()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [edit, setEdit] = useState(null)
  const list = useMemo(() => products.filter((p) => (cat === 'all' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())), [products, cat, q])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-display text-5xl font-semibold">Products</h1><p className="text-sm text-ink-900/55">{products.length} products – edit prices, images and details here.</p></div>
        <button onClick={() => setEdit(blank(categories[0]?.id))} className="btn-gold"><Plus size={17} /> New Product</button>
      </div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1"><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-900/40" /><input className="input pl-10" placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <select className="input md:w-60" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((p) => (
          <div key={p.id} className={`flex gap-4 rounded-3xl bg-white p-4 shadow-card ${p.available === false ? 'opacity-60' : ''}`}>
            <ProductImage src={p.image} alt={p.name} emoji={categories.find((c) => c.id === p.category)?.emoji} className="h-24 w-24 shrink-0 rounded-2xl" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2"><div className="line-clamp-2 text-sm font-semibold leading-snug">{p.name}</div>{p.featured && <Star size={15} className="shrink-0 fill-gold-400 text-gold-500" />}</div>
              <div className="text-xs text-ink-900/50">{categories.find((c) => c.id === p.category)?.name}</div>
              <div className="mt-1 flex items-baseline gap-2"><b className="text-gold-600">{money(p.price)}</b>{p.oldPrice > p.price && <s className="text-xs text-ink-900/40">{money(p.oldPrice)}</s>}{p.badge && <span className="rounded-full bg-ink-900 px-2 py-0.5 text-[10px] text-gold-200">{p.badge}</span>}</div>
              <div className="mt-2 flex items-center gap-2">
                <button onClick={() => setEdit(p)} className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-3 py-1.5 text-xs font-medium text-gold-200"><Pencil size={12} /> Edit</button>
                <button onClick={() => db.save('products', p.id, { available: p.available === false })} className={`rounded-full px-3 py-1.5 text-xs font-medium ${p.available === false ? 'bg-emerald-100 text-emerald-700' : 'bg-black/5'}`}>{p.available === false ? 'Back in stock' : 'Sold out'}</button>
                <button onClick={() => confirm(`Delete "${p.name}"?`) && db.remove('products', p.id)} className="ml-auto text-ink-900/30 hover:text-clay-600"><Trash2 size={17} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="py-16 text-center text-ink-900/50">No products found.</p>}
      {edit && <ProductForm initial={edit} onClose={() => setEdit(null)} />}
    </div>
  )
}

function ProductForm({ initial, onClose }) {
  const { categories, products } = useData()
  const [f, setF] = useState(initial)
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }))
  const save = async (e) => {
    e.preventDefault()
    const id = f.id || `${slug(f.name).slice(0, 30)}-${Date.now().toString(36).slice(-4)}`
    const order = f.order ?? Math.max(0, ...products.map((p) => p.order || 0)) + 1
    await db.save('products', id, { ...f, id, order, price: Number(f.price) || 0, oldPrice: Number(f.oldPrice) || 0 })
    onClose()
  }
  return (
    <Modal title={f.id ? 'Edit Product' : 'New Product'} onClose={onClose} wide>
      <form onSubmit={save} className="grid gap-5 sm:grid-cols-2">
        <Field label="Product name *" className="sm:col-span-2"><input required className="input" value={f.name} onChange={(e) => set('name', e.target.value)} /></Field>
        <Field label="Category *"><select required className="input" value={f.category} onChange={(e) => set('category', e.target.value)}>{categories.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}</select></Field>
        <Field label="Badge" hint="Shown on the card, e.g. New, Sale, Best Seller. Leave empty for none.">
          <input list="badges" className="input" value={f.badge || ''} onChange={(e) => set('badge', e.target.value)} />
          <datalist id="badges"><option value="New" /><option value="Sale" /><option value="Best Seller" /><option value="Latest" /></datalist>
        </Field>
        <Field label="Price (Rs) *"><input required type="number" min="0" className="input" value={f.price} onChange={(e) => set('price', e.target.value)} /></Field>
        <Field label="Old price (Rs)" hint="Shown crossed out. 0 = no discount."><input type="number" min="0" className="input" value={f.oldPrice} onChange={(e) => set('oldPrice', e.target.value)} /></Field>
        <Field label="Description" className="sm:col-span-2"><textarea rows={4} className="input resize-none" value={f.desc || ''} onChange={(e) => set('desc', e.target.value)} /></Field>
        <Field label="Image" className="sm:col-span-2"><ImageInput value={f.image} onChange={(v) => set('image', v)} /></Field>
        <Field label="Sort order (lower first)"><input type="number" className="input" value={f.order ?? ''} placeholder="auto" onChange={(e) => set('order', e.target.value === '' ? undefined : Number(e.target.value))} /></Field>
        <div className="flex flex-wrap items-end gap-8">
          <Toggle checked={!!f.featured} onChange={(v) => set('featured', v)} label="Featured (home page)" />
          <Toggle checked={f.available !== false} onChange={(v) => set('available', v)} label="Available" />
        </div>
        <div className="flex justify-end gap-3 sm:col-span-2"><button type="button" onClick={onClose} className="btn border border-ink-900/20">Cancel</button><button className="btn-gold">Save</button></div>
      </form>
    </Modal>
  )
}
