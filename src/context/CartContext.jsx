import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const Ctx = createContext(null)
export const useCart = () => useContext(Ctx)
const load = () => { try { return JSON.parse(localStorage.getItem('md_cart')) || [] } catch { return [] } }

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load)
  const [toast, setToast] = useState(null)

  useEffect(() => { try { localStorage.setItem('md_cart', JSON.stringify(lines)) } catch { /* ignore */ } }, [lines])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 1800)
    return () => clearTimeout(t)
  }, [toast])

  const api = useMemo(() => ({
    lines, toast,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.qty * l.price, 0),
    add(line, qty = 1) {
      setLines((cur) => {
        const i = cur.findIndex((l) => l.id === line.id)
        if (i >= 0) return cur.map((l, j) => (j === i ? { ...l, qty: l.qty + qty } : l))
        return [...cur, { ...line, qty }]
      })
      setToast(`${line.name} added to cart`)
    },
    setQty: (id, qty) => setLines((cur) => (qty <= 0 ? cur.filter((l) => l.id !== id) : cur.map((l) => (l.id === id ? { ...l, qty } : l)))),
    remove: (id) => setLines((cur) => cur.filter((l) => l.id !== id)),
    clear: () => setLines([]),
  }), [lines, toast])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}
