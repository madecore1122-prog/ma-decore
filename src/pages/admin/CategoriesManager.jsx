import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext'
import { db } from '../../lib/db'
import { slug } from '../../lib/utils'
import { Field, Modal } from './AdminUI'

export default function CategoriesManager() {
  const { categories, products } = useData()
  const [edit, setEdit] = useState(null)
  const save = async (e) => {
    e.preventDefault()
    const id = edit.id || `${slug(edit.name)}-${Date.now().toString(36).slice(-3)}`
    await db.save('categories', id, { ...edit, id, order: Number(edit.order) || categories.length + 1 })
    setEdit(null)
  }
  const del = (c) => {
    const n = products.filter((p) => p.category === c.id).length
    if (n) return alert(`This category has ${n} products. Move or delete them first.`)
    if (confirm(`Delete "${c.name}"?`)) db.remove('categories', c.id)
  }
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div><h1 className="font-display text-5xl font-semibold">Categories</h1><p className="text-sm text-ink-900/55">Shop sections (Table Lamps, Wall Decor, etc.).</p></div>
        <button onClick={() => setEdit({ name: '', emoji: '✨', order: categories.length + 1 })} className="btn-gold"><Plus size={17} /> New Category</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-50 text-3xl">{c.emoji}</div>
            <div className="min-w-0 flex-1"><div className="truncate font-semibold">{c.name}</div><div className="text-xs text-ink-900/50">{products.filter((p) => p.category === c.id).length} products • #{c.order}</div></div>
            <button onClick={() => setEdit(c)} className="rounded-full bg-black/5 p-2 hover:bg-black/10"><Pencil size={15} /></button>
            <button onClick={() => del(c)} className="p-2 text-ink-900/30 hover:text-clay-600"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
      {edit && (
        <Modal title={edit.id ? 'Edit Category' : 'New Category'} onClose={() => setEdit(null)}>
          <form onSubmit={save} className="grid gap-5">
            <Field label="Name *"><input required className="input" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Emoji"><input className="input text-2xl" value={edit.emoji || ''} onChange={(e) => setEdit({ ...edit, emoji: e.target.value })} /></Field>
              <Field label="Order"><input type="number" className="input" value={edit.order} onChange={(e) => setEdit({ ...edit, order: e.target.value })} /></Field>
            </div>
            <div className="flex justify-end gap-3"><button type="button" onClick={() => setEdit(null)} className="btn border border-ink-900/20">Cancel</button><button className="btn-gold">Save</button></div>
          </form>
        </Modal>
      )}
    </div>
  )
}
