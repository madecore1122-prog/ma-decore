import { useEffect, useState } from 'react'

function left(end) {
  const ms = new Date(end).getTime() - Date.now()
  if (!end || Number.isNaN(ms) || ms <= 0) return null
  return { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 }
}
export const isActive = (end) => left(end) !== null

export default function Countdown({ end, dark = true }) {
  const [t, setT] = useState(() => left(end))
  useEffect(() => {
    const id = setInterval(() => setT(left(end)), 1000)
    return () => clearInterval(id)
  }, [end])
  if (!t) return null
  return (
    <div className="flex gap-3">
      {[['d', 'Days'], ['h', 'Hours'], ['m', 'Mins'], ['s', 'Secs']].map(([k, l]) => (
        <div key={k} className={`w-16 rounded-2xl py-3 text-center sm:w-20 ${dark ? 'bg-white/10 ring-1 ring-gold-300/30' : 'bg-ink-900 text-gold-200'}`}>
          <div className="font-display text-4xl font-semibold leading-none text-gold-200 sm:text-5xl">{String(t[k]).padStart(2, '0')}</div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-cream/60">{l}</div>
        </div>
      ))}
    </div>
  )
}
