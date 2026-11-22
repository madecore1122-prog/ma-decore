import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react'
import { useData } from '../context/DataContext'
import { waLink } from '../lib/whatsapp'
import Logo from './Logo'

const real = (u) => u && u.trim() && u.trim() !== '#'

export default function Footer() {
  const { settings: s, categories } = useData()
  return (
    <footer className="pattern-bg relative bg-ink-950 text-cream/70">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3"><Logo className="h-14 w-14" /><div className="font-display text-3xl italic text-gold-200">{s.name}</div></div>
          <p className="mt-4 text-sm leading-relaxed">{s.tagline}. Every piece is 100% handmade in {s.address.split(',')[0]} and packed safely for your doorstep.</p>
          <div className="mt-5 flex gap-3">
            {real(s.facebook) && <a href={s.facebook} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-gold-400 hover:text-ink-950" aria-label="Facebook"><Facebook size={18} /></a>}
            {real(s.instagram) && <a href={s.instagram} target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-gold-400 hover:text-ink-950" aria-label="Instagram"><Instagram size={18} /></a>}
            <a href={waLink(s.whatsapp, 'Hello! I would like to know about your products.')} target="_blank" rel="noreferrer" className="flex h-10 items-center gap-2 rounded-full bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-500"><MessageCircle size={16} /> WhatsApp</a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-display text-2xl italic text-gold-300">Explore</h4>
          <ul className="space-y-2 text-sm">
            {[['/', 'Home'], ['/shop', 'Shop'], ['/offers', 'Offers'], ['/about', 'About Us'], ['/contact', 'Contact'], ['/order', 'Your Cart']].map(([to, l]) => (
              <li key={to}><Link to={to} className="transition hover:text-gold-200">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-display text-2xl italic text-gold-300">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => <li key={c.id}><Link to={`/shop?cat=${c.id}`} className="transition hover:text-gold-200">{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-display text-2xl italic text-gold-300">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><MapPin size={17} className="mt-0.5 shrink-0 text-gold-400" /> {s.address}</li>
            <li className="flex gap-3"><Phone size={17} className="shrink-0 text-gold-400" /> {s.phone}</li>
            <li className="flex gap-3"><Mail size={17} className="shrink-0 text-gold-400" /> {s.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">© {new Date().getFullYear()} {s.name}. All rights reserved.</div>
    </footer>
  )
}
