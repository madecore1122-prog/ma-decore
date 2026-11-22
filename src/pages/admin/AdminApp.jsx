import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes, Link } from 'react-router-dom'
import { LogOut, ClipboardList, Package, Settings as Cog, Tags, Menu as MenuIcon, X, ExternalLink, Loader2, Lock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { seedDefaults, useData } from '../../context/DataContext'
import Logo from '../../components/Logo'
import Orders from './Orders'
import ProductsManager from './ProductsManager'
import CategoriesManager from './CategoriesManager'
import SettingsPage from './SettingsPage'

function Login() {
  const { login, demo } = useAuth()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr('')
    try { await login(email, pw) } catch (ex) { setErr(demo ? ex.message : 'Incorrect email or password') } finally { setBusy(false) }
  }
  return (
    <div className="pattern-bg flex min-h-screen items-center justify-center bg-ink-950 p-4">
      <form onSubmit={submit} className="card w-full max-w-md animate-pop p-8">
        <Logo className="mx-auto h-24 w-24" />
        <h1 className="mt-4 text-center font-display text-5xl font-semibold">Admin Login</h1>
        <p className="mb-6 text-center text-sm text-ink-900/55">Log in to view the dashboard</p>
        {!demo && <div className="mb-4"><label className="label">Email</label><input required type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} /></div>}
        <div className="mb-4"><label className="label">Password</label><input required type="password" className="input" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus /></div>
        {err && <p className="mb-4 rounded-xl bg-clay-50 px-4 py-2 text-sm font-medium text-clay-700">{err}</p>}
        <button disabled={busy} className="btn-gold w-full">{busy ? <Loader2 size={18} className="animate-spin" /> : <Lock size={16} />} Login</button>
        {demo && <p className="mt-4 rounded-xl bg-gold-50 p-3 text-xs text-ink-900/70"><b>Demo mode:</b> Firebase is not configured, so data is saved in this browser only. Default password: <code className="font-bold">admin123</code> (change it with VITE_ADMIN_PASSWORD in .env).</p>}
        <Link to="/" className="mt-5 block text-center text-sm font-medium text-gold-600">← Back to website</Link>
      </form>
    </div>
  )
}

const nav = [
  ['/admin', 'Orders', ClipboardList, true],
  ['/admin/products', 'Products', Package],
  ['/admin/categories', 'Categories', Tags],
  ['/admin/settings', 'Settings', Cog],
]

export default function AdminApp() {
  const { user, loading, logout, demo } = useAuth()
  const data = useData()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (user && !data.loading && !data.seeded) seedDefaults().catch(console.error)
  }, [user, data.loading, data.seeded])

  if (loading) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="animate-spin text-gold-500" size={40} /></div>
  if (!user) return <Login />

  const side = (
    <>
      <div className="flex items-center gap-3 p-6">
        <Logo className="h-12 w-12" />
        <div><div className="font-display text-2xl font-semibold italic leading-none text-gold-200">{data.settings.name}</div><div className="mt-1 text-[10px] uppercase tracking-[.3em] text-cream/50">Admin Panel</div></div>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map(([to, label, Icon, end]) => (
          <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}
            className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-gold-400 text-ink-950 shadow-gold' : 'text-cream/70 hover:bg-white/10 hover:text-cream'}`}>
            <Icon size={19} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-2 p-4">
        <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-cream/70 hover:bg-white/10"><ExternalLink size={19} /> View website</a>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-cream/70 hover:bg-white/10"><LogOut size={19} /> Logout</button>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-[#f4efe6] lg:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-ink-950 lg:flex">{side}</aside>
      <div className={`fixed inset-0 z-[70] lg:hidden ${open ? '' : 'pointer-events-none'}`}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-black/60 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
        <aside className={`absolute left-0 top-0 flex h-full w-72 flex-col bg-ink-950 transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <button onClick={() => setOpen(false)} className="absolute right-3 top-3 text-cream/70"><X /></button>{side}
        </aside>
      </div>
      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-40 flex items-center justify-between bg-ink-950 px-4 py-3 text-cream lg:hidden">
          <button onClick={() => setOpen(true)}><MenuIcon /></button>
          <span className="font-display text-2xl italic text-gold-200">{data.settings.name} Admin</span>
          <span className="w-6" />
        </div>
        {demo && <div className="bg-gold-400 px-4 py-2 text-center text-xs font-semibold text-ink-950">Demo mode: Firebase is not connected, data is stored in this browser only. See the README for Firebase setup.</div>}
        <main className="p-4 sm:p-8">
          <Routes>
            <Route index element={<Orders />} />
            <Route path="products" element={<ProductsManager />} />
            <Route path="categories" element={<CategoriesManager />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
