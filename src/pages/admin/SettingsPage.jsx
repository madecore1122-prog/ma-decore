import { useState } from 'react'
import { Check, RotateCcw, Plus, Trash2 } from 'lucide-react'
import { useData, seedDefaults } from '../../context/DataContext'
import { db } from '../../lib/db'
import { Field } from './AdminUI'

export default function SettingsPage() {
  const data = useData()
  const [f, setF] = useState({ ...data.settings, payment: [...(data.settings.payment || [])] })
  const [ok, setOk] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const setPay = (i, k, v) => setF({ ...f, payment: f.payment.map((m, j) => (j === i ? { ...m, [k]: v } : m)) })

  const save = async (e) => {
    e.preventDefault()
    await db.save('settings', 'main', {
      ...f, id: 'main', deliveryFee: Number(f.deliveryFee) || 0, freeDeliveryMinItems: Number(f.freeDeliveryMinItems) || 0, offerPercent: Number(f.offerPercent) || 0,
      payment: f.payment.filter((m) => m.label.trim()),
    })
    setOk(true); setTimeout(() => setOk(false), 2000)
  }
  const reset = async () => {
    if (!confirm('This will restore all products, categories and settings to defaults. Your changes will be lost. Continue?')) return
    await Promise.all([...data.products.map((p) => db.remove('products', p.id)), ...data.categories.map((c) => db.remove('categories', c.id))])
    await seedDefaults()
    alert('Defaults restored. Reload the page.')
  }

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-5xl font-semibold">Settings</h1>
      <p className="mb-6 text-sm text-ink-900/55">Shop information – shown across the whole website.</p>
      <form onSubmit={save} className="space-y-6">
        <div className="card grid gap-5 p-6 sm:grid-cols-2">
          <h2 className="font-display text-3xl font-semibold sm:col-span-2">Shop</h2>
          <Field label="Shop name"><input className="input" value={f.name} onChange={set('name')} /></Field>
          <Field label="Tagline"><input className="input" value={f.tagline} onChange={set('tagline')} /></Field>
          <Field label="Order WhatsApp number *" hint="Country code, no + or leading 0, e.g. 923001234567. Orders arrive on this number."><input required className="input" value={f.whatsapp} onChange={set('whatsapp')} /></Field>
          <Field label="Phone (shown on site)"><input className="input" value={f.phone} onChange={set('phone')} /></Field>
          <Field label="Email"><input className="input" value={f.email} onChange={set('email')} /></Field>
          <Field label="Opening hours"><input className="input" value={f.hours} onChange={set('hours')} /></Field>
          <Field label="Address" className="sm:col-span-2"><input className="input" value={f.address} onChange={set('address')} /></Field>
          <Field label="Map location" hint='Type it like Google Maps, e.g. "MA Decore, Gujranwala".' className="sm:col-span-2"><input className="input" value={f.mapQuery} onChange={set('mapQuery')} /></Field>
        </div>

        <div className="card grid gap-5 p-6 sm:grid-cols-2">
          <h2 className="font-display text-3xl font-semibold sm:col-span-2">Delivery & Offer</h2>
          <Field label="Preparation time" hint="e.g. 2-5 days"><input className="input" value={f.prepTime} onChange={set('prepTime')} /></Field>
          <Field label="Delivery charges (Rs)"><input type="number" min="0" className="input" value={f.deliveryFee} onChange={set('deliveryFee')} /></Field>
          <Field label="Free delivery on items" hint="0 = never free"><input type="number" min="0" className="input" value={f.freeDeliveryMinItems} onChange={set('freeDeliveryMinItems')} /></Field>
          <div />
          <Field label="Offer title"><input className="input" value={f.offerTitle} onChange={set('offerTitle')} /></Field>
          <Field label="Offer headline" hint='Include the discount like "10% off" to highlight it.'><input className="input" value={f.offerText} onChange={set('offerText')} /></Field>
          <Field label="Promo code"><input className="input uppercase" value={f.offerCode} onChange={set('offerCode')} /></Field>
          <Field label="Discount (%)"><input type="number" min="0" max="90" className="input" value={f.offerPercent} onChange={set('offerPercent')} /></Field>
          <Field label="Offer ends on" hint="After this date the countdown and code stop working." className="sm:col-span-2"><input type="datetime-local" className="input" value={(f.offerEnds || '').slice(0, 16)} onChange={(e) => setF({ ...f, offerEnds: e.target.value })} /></Field>
        </div>

        <div className="card space-y-4 p-6">
          <h2 className="font-display text-3xl font-semibold">Payment Methods</h2>
          <p className="text-sm text-ink-900/55">Cash on Delivery is always available. Add your account details for the others.</p>
          {f.payment.map((m, i) => (
            <div key={i} className="flex flex-col gap-2 sm:flex-row">
              <input className="input sm:w-44" placeholder="JazzCash" value={m.label} onChange={(e) => setPay(i, 'label', e.target.value)} />
              <input className="input flex-1" placeholder="Account number & name / IBAN" value={m.value} onChange={(e) => setPay(i, 'value', e.target.value)} />
              <button type="button" onClick={() => setF({ ...f, payment: f.payment.filter((_, j) => j !== i) })} className="px-2 text-ink-900/40 hover:text-clay-600"><Trash2 size={18} /></button>
            </div>
          ))}
          <button type="button" onClick={() => setF({ ...f, payment: [...f.payment, { label: '', value: '' }] })} className="inline-flex items-center gap-1 text-sm font-medium text-gold-600"><Plus size={15} /> Add payment method</button>
        </div>

        <div className="card grid gap-5 p-6 sm:grid-cols-2">
          <h2 className="font-display text-3xl font-semibold sm:col-span-2">Home page & Social</h2>
          <Field label="Banner heading" className="sm:col-span-2"><input className="input" value={f.heroTitle} onChange={set('heroTitle')} /></Field>
          <Field label="Banner subtext" className="sm:col-span-2"><textarea rows={2} className="input resize-none" value={f.heroSub} onChange={set('heroSub')} /></Field>
          <Field label="Facebook link"><input className="input" value={f.facebook} onChange={set('facebook')} /></Field>
          <Field label="Instagram link"><input className="input" value={f.instagram} onChange={set('instagram')} /></Field>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button className="btn-gold">{ok ? <><Check size={16} /> Saved</> : 'Save settings'}</button>
          <button type="button" onClick={reset} className="inline-flex items-center gap-2 text-sm font-medium text-ink-900/50 hover:text-clay-600"><RotateCcw size={15} /> Restore defaults</button>
        </div>
      </form>
    </div>
  )
}
