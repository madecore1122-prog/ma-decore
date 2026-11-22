import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Phone } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useData } from '../context/DataContext'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/offers', label: 'Offers' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { count } = useCart()
  const { settings } = useData()
  const solid = scrolled || pathname !== '/'

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  const linkCls = ({ isActive }) =>
    `relative py-2 text-[13px] font-medium uppercase tracking-[.18em] transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-300 after:transition-transform ${isActive ? 'text-gold-200 after:scale-x-100' : 'text-cream/85 hover:text-gold-200 after:scale-x-0 hover:after:scale-x-100'}`

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? 'bg-ink-950/95 py-2 shadow-xl backdrop-blur' : 'bg-gradient-to-b from-ink-950/70 to-transparent py-4'}`}>
        <div className="container-x flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-12 w-12" />
            <div className="leading-none">
              <div className="font-display text-3xl font-semibold italic text-gold-200">{settings.name}</div>
              <div className="mt-0.5 hidden text-[9px] uppercase tracking-[.3em] text-cream/60 sm:block">Handmade Home Decor</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkCls}>{l.label}</NavLink>)}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hidden items-center gap-2 text-sm text-cream/80 hover:text-gold-200 xl:flex"><Phone size={15} /> {settings.phone}</a>
            <Link to="/order" className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream transition hover:bg-white/20" aria-label="Cart">
              <ShoppingBag size={20} />
              {count > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-400 px-1 text-[11px] font-bold text-ink-950">{count}</span>}
            </Link>
            <Link to="/shop" className="btn-gold hidden !py-2.5 !text-xs sm:inline-flex">Shop Now</Link>
            <button onClick={() => setOpen(true)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-cream lg:hidden" aria-label="Menu"><Menu size={22} /></button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`pattern-bg absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-ink-950 p-6 shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Logo className="h-11 w-11" /><span className="font-display text-2xl italic text-gold-200">{settings.name}</span></div>
            <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream" aria-label="Close"><X size={20} /></button>
          </div>
          <nav className="mt-10 flex flex-col">
            {links.map((l, i) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} style={{ transitionDelay: `${open ? i * 60 : 0}ms` }}
                className={({ isActive }) => `border-b border-white/10 py-4 font-display text-4xl italic transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'} ${isActive ? 'text-gold-300' : 'text-cream'}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto space-y-3">
            <Link to="/order" className="btn-gold w-full"><ShoppingBag size={17} /> Cart ({count})</Link>
            <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="btn-ghost w-full"><Phone size={17} /> {settings.phone}</a>
          </div>
        </aside>
      </div>
    </>
  )
}
