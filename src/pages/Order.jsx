import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, MapPin, Loader2, ShoppingBag, MessageCircle, ArrowLeft, Tag, Copy, Check, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useData } from '../context/DataContext'
import { db } from '../lib/db'
import { money } from '../lib/utils'
import { autoNotify, orderMessage, waLink } from '../lib/whatsapp'
import ProductImage from '../components/ProductImage'
import PageHero from '../components/PageHero'
import { isActive } from '../components/Countdown'

const COD = { label: 'Cash on Delivery', value: 'Pay in cash when you receive your order.' }
const blank = { name: '', phone: '', city: '', address: '', notes: '' }

export default function Order() {
  const { lines, setQty, remove, clear, subtotal, count } = useCart()
  const { settings: s } = useData()
  const nav = useNavigate()
  const [f, setF] = useState(() => { try { return { ...blank, ...JSON.parse(localStorage.getItem('md_customer')) } } catch { return blank } })
  const [loc, setLoc] = useState(null)
  const [locBusy, setLocBusy] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [code, setCode] = useState('')
  const [coupon, setCoupon] = useState(null)
  const [codeMsg, setCodeMsg] = useState('')
  const [pay, setPay] = useState(COD.label)
  const [copied, setCopied] = useState(false)
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const methods = [COD, ...(s.payment || []).filter((m) => m.label)]
  const method = methods.find((m) => m.label === pay) || COD
  const discount = coupon ? Math.round((subtotal * (Number(s.offerPercent) || 0)) / 100) : 0
  const free = s.freeDeliveryMinItems > 0 && count >= s.freeDeliveryMinItems
  const fee = lines.length && !free ? Number(s.deliveryFee) || 0 : 0
  const total = subtotal - discount + fee
  const toFree = s.freeDeliveryMinItems - count

  const applyCode = () => {
    const c = code.trim().toUpperCase()
    if (!c) return
    if (c !== String(s.offerCode).toUpperCase()) { setCoupon(null); return setCodeMsg('Invalid code') }
    if (!isActive(s.offerEnds)) { setCoupon(null); return setCodeMsg('This offer has ended') }
    setCoupon(c); setCodeMsg(`Code applied: ${s.offerPercent}% off`)
  }

  const getLocation = () => {
    if (!navigator.geolocation) return setErr('Your browser does not support location.')
    setLocBusy(true); setErr('')
    navigator.geolocation.getCurrentPosition(
      (p) => { const { latitude: lat, longitude: lng } = p.coords; setLoc({ lat, lng, link: `https://maps.google.com/?q=${lat},${lng}` }); setLocBusy(false) },
      () => { setErr('Could not get your location. Please type your address.'); setLocBusy(false) },
      { enableHighAccuracy: true, timeout: 12000 },
    )
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!lines.length) return
    setBusy(true); setErr('')
    const win = window.open('', '_blank') // open on click to avoid popup blockers
    try {
      const order = {
        orderNo: '#' + String(Date.now()).slice(-6),
        customer: { ...f, location: loc || null },
        items: lines.map((l) => ({ id: l.id, name: l.name, qty: l.qty, price: l.price })),
        subtotal, discount, coupon: coupon || '', deliveryFee: fee, total,
        payment: { method: method.label }, paid: false, status: 'new', createdAt: Date.now(),
      }
      await db.add('orders', order)
      localStorage.setItem('md_customer', JSON.stringify(f))
      localStorage.setItem('md_last_order', JSON.stringify(order))
      const text = orderMessage(order, s.name)
      autoNotify(text)
      if (win) win.location.href = waLink(s.whatsapp, text)
      clear()
      nav('/order/success')
    } catch (ex) {
      console.error(ex)
      if (win) win.close()
      setErr('Something went wrong placing your order. Please try again or message us on WhatsApp.')
    } finally { setBusy(false) }
  }

  if (!lines.length) {
    return (
      <>
        <PageHero title="Your Cart" />
        <div className="container-x py-20 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-300"><ShoppingBag size={44} /></div>
          <h2 className="mt-6 font-display text-5xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-ink-900/60">Discover our handmade collection.</p>
          <Link to="/shop" className="btn-gold mt-6">Go to Shop</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHero title="Checkout" sub="Review your cart, enter your details and place your order." />
      <section className="py-10 sm:py-16">
        <form onSubmit={submit} className="container-x grid gap-8 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            <div className="card p-5 sm:p-7">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-4xl font-semibold">Your Order</h2>
                <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-medium text-gold-600"><ArrowLeft size={15} /> Add more</Link>
              </div>
              <ul className="divide-y divide-ink-900/10">
                {lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-4 py-4">
                    <ProductImage src={l.image} alt={l.name} className="h-20 w-20 shrink-0 rounded-2xl" />
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 font-display text-xl font-semibold leading-tight">{l.name}</div>
                      <div className="mt-1 text-sm font-semibold text-gold-600">{money(l.price)}</div>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-cream p-1">
                      <button type="button" onClick={() => setQty(l.id, l.qty - 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-ink-900 hover:text-gold-200" aria-label="decrease"><Minus size={14} /></button>
                      <span className="w-7 text-center text-sm font-semibold">{l.qty}</span>
                      <button type="button" onClick={() => setQty(l.id, l.qty + 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-ink-900 hover:text-gold-200" aria-label="increase"><Plus size={14} /></button>
                    </div>
                    <div className="hidden w-24 text-right font-semibold sm:block">{money(l.price * l.qty)}</div>
                    <button type="button" onClick={() => remove(l.id)} className="text-ink-900/35 hover:text-clay-600" aria-label="remove"><Trash2 size={18} /></button>
                  </li>
                ))}
              </ul>
              {s.freeDeliveryMinItems > 0 && (
                <div className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${free ? 'bg-emerald-50 text-emerald-700' : 'bg-gold-50 text-gold-700'}`}>
                  <Truck size={17} /> {free ? 'You got free delivery!' : `Add ${toFree} more item${toFree > 1 ? 's' : ''} to get free delivery`}
                </div>
              )}
            </div>

            <div className="card p-5 sm:p-7">
              <h2 className="mb-5 font-display text-4xl font-semibold">Delivery Details</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label className="label">Your name *</label><input required className="input" value={f.name} onChange={set('name')} placeholder="Full name" /></div>
                <div><label className="label">Phone number *</label><input required type="tel" className="input" value={f.phone} onChange={set('phone')} placeholder="03XX XXXXXXX" /></div>
                <div><label className="label">City *</label><input required className="input" value={f.city} onChange={set('city')} placeholder="Gujranwala" /></div>
                <div><label className="label">Order note</label><input className="input" value={f.notes} onChange={set('notes')} placeholder="Colour, gift wrap..." /></div>
                <div className="sm:col-span-2"><label className="label">Full address *</label><textarea required rows={3} className="input resize-none" value={f.address} onChange={set('address')} placeholder="House / street, area, nearby landmark" /></div>
              </div>
              <button type="button" onClick={getLocation} disabled={locBusy}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-3 text-sm font-medium transition ${loc ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gold-400/60 text-gold-700 hover:bg-gold-50'}`}>
                {locBusy ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} />}
                {loc ? 'Location added ✓ (makes delivery easier)' : 'Also share my current location (optional)'}
              </button>
            </div>

            <div className="card p-5 sm:p-7">
              <h2 className="mb-5 font-display text-4xl font-semibold">Payment Method</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {methods.map((m) => (
                  <label key={m.label} className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-3.5 transition ${pay === m.label ? 'border-gold-500 bg-gold-50' : 'border-ink-900/10 hover:border-gold-300'}`}>
                    <input type="radio" name="pay" className="accent-[#b8892b]" checked={pay === m.label} onChange={() => setPay(m.label)} />
                    <span className="font-medium">{m.label}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-ink-950 p-5 text-cream">
                {method.label === COD.label ? <p className="text-sm">{COD.value}</p> : (
                  <>
                    <div className="text-xs uppercase tracking-[.25em] text-gold-300">{method.label} account</div>
                    <div className="mt-1 flex items-center justify-between gap-3">
                      <div className="font-display text-2xl font-semibold">{method.value}</div>
                      <button type="button" onClick={() => { navigator.clipboard?.writeText(method.value); setCopied(true); setTimeout(() => setCopied(false), 1400) }} className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20">{copied ? <Check size={14} /> : <Copy size={14} />} Copy</button>
                    </div>
                    <p className="mt-3 text-sm text-cream/65">Send the amount, then share the payment screenshot with us on WhatsApp after placing the order.</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="card sticky top-28 overflow-hidden">
              <div className="bg-ink-950 p-6 text-cream"><h2 className="font-display text-4xl font-semibold italic text-gold-200">Order Summary</h2></div>
              <div className="space-y-3 p-6">
                {isActive(s.offerEnds) && (
                  <div>
                    <label className="label flex items-center gap-1"><Tag size={14} /> Promo code</label>
                    <div className="flex gap-2">
                      <input className="input uppercase" placeholder={s.offerCode} value={code} onChange={(e) => setCode(e.target.value)} />
                      <button type="button" onClick={applyCode} className="btn-dark !px-5">Apply</button>
                    </div>
                    {codeMsg && <p className={`mt-1.5 text-sm font-medium ${coupon ? 'text-emerald-600' : 'text-clay-600'}`}>{codeMsg}</p>}
                  </div>
                )}
                <div className="flex justify-between pt-2 text-sm"><span className="text-ink-900/60">Subtotal ({count} item{count > 1 ? 's' : ''})</span><b>{money(subtotal)}</b></div>
                {discount > 0 && <div className="flex justify-between text-sm text-emerald-600"><span>Discount ({coupon})</span><b>-{money(discount)}</b></div>}
                <div className="flex justify-between text-sm"><span className="text-ink-900/60">Delivery</span><b>{fee ? money(fee) : 'FREE'}</b></div>
                <div className="flex items-center justify-between border-t border-dashed border-ink-900/20 pt-4"><span className="font-display text-3xl font-semibold">Total</span><span className="font-display text-4xl font-semibold text-gold-600">{money(total)}</span></div>
                <div className="rounded-xl bg-gold-50 px-4 py-2.5 text-sm font-medium text-gold-800">💳 {method.label}</div>
                {err && <p className="rounded-xl bg-clay-50 px-4 py-3 text-sm font-medium text-clay-700">{err}</p>}
                <button disabled={busy} className="btn-gold w-full !py-4 text-base">{busy ? <Loader2 className="animate-spin" size={20} /> : <MessageCircle size={20} />} Confirm Order</button>
                <p className="text-center text-xs text-ink-900/50">After you confirm, WhatsApp opens with your order details pre-filled – just press <b>Send</b>.</p>
              </div>
            </div>
          </aside>
        </form>
      </section>
    </>
  )
}
