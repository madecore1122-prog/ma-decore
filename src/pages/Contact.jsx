import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react'
import { useData } from '../context/DataContext'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { waLink } from '../lib/whatsapp'

export default function Contact() {
  const { settings: s } = useData()
  const [f, setF] = useState({ name: '', phone: '', message: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    window.open(waLink(s.whatsapp, `📩 *New Message (Website Contact)*\n\n👤 Name: ${f.name}\n📞 Phone: ${f.phone}\n\n💬 ${f.message}`), '_blank')
    setF({ name: '', phone: '', message: '' })
  }
  const info = [
    [Phone, 'Call', s.phone, `tel:${s.phone.replace(/\s/g, '')}`],
    [MessageCircle, 'WhatsApp', `+${s.whatsapp}`, waLink(s.whatsapp, 'Hello!')],
    [Mail, 'Email', s.email, `mailto:${s.email}`],
    [MapPin, 'Address', s.address, null],
    [Clock, 'Hours', s.hours, null],
  ]
  return (
    <>
      <PageHero kicker="Get in touch" title="Contact Us" sub="Questions, custom orders or bulk gifting - we are happy to help." />
      <section className="py-14 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4">
              <div className="pattern-bg rounded-3xl bg-ink-950 p-7 text-cream shadow-gold">
                <div className="text-xs uppercase tracking-[.3em] text-gold-300">Order number</div>
                <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="gold-text mt-1 block font-display text-5xl font-semibold sm:text-6xl">{s.phone}</a>
                <p className="mt-1 text-sm text-cream/65">Call or WhatsApp to order</p>
              </div>
              {info.map(([Icon, t, d, href]) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card transition hover:-translate-y-0.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-300"><Icon size={20} /></div>
                    <div><div className="text-xs font-medium uppercase tracking-wider text-ink-900/45">{t}</div><div className="font-medium">{d}</div></div>
                  </div>
                )
                return href ? <a key={t} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block">{inner}</a> : <div key={t}>{inner}</div>
              })}
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-3">
            <form onSubmit={submit} className="card p-6 sm:p-9">
              <h2 className="font-display text-5xl font-semibold">Send us a message</h2>
              <p className="mt-1 text-sm text-ink-900/60">Your message goes straight to our WhatsApp once you submit.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div><label className="label">Your name</label><input required className="input" value={f.name} onChange={set('name')} placeholder="Your name" /></div>
                <div><label className="label">Phone number</label><input required type="tel" className="input" value={f.phone} onChange={set('phone')} placeholder="03XX XXXXXXX" /></div>
                <div className="sm:col-span-2"><label className="label">Message</label><textarea required rows={5} className="input resize-none" value={f.message} onChange={set('message')} placeholder="Write your message..." /></div>
              </div>
              <button className="btn-gold mt-6 w-full sm:w-auto"><Send size={16} /> Send via WhatsApp</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}
