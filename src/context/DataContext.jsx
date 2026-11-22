import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { db } from '../lib/db'
import { DATA_VERSION, DEFAULT_CATEGORIES, DEFAULT_PRODUCTS, DEFAULT_SETTINGS } from '../data/defaults'

const Ctx = createContext(null)
export const useData = () => useContext(Ctx)
const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999)

export function DataProvider({ children }) {
  const [raw, setRaw] = useState({ categories: null, products: null, settings: null })

  useEffect(() => {
    const subs = ['categories', 'products', 'settings'].map((c) => db.subscribe(c, (arr) => setRaw((r) => ({ ...r, [c]: arr }))))
    return () => subs.forEach((u) => u())
  }, [])

  const value = useMemo(() => {
    const doc = (raw.settings || []).find((s) => s.id === 'main')
    const seeded = Boolean(doc) && doc.dataVersion === DATA_VERSION
    const pick = (k, def) => (seeded ? raw[k] || [] : def)
    return {
      loading: Object.values(raw).some((v) => v === null),
      seeded,
      categories: [...pick('categories', DEFAULT_CATEGORIES)].sort(byOrder),
      products: [...pick('products', DEFAULT_PRODUCTS)].sort(byOrder),
      settings: seeded ? { ...DEFAULT_SETTINGS, ...doc } : DEFAULT_SETTINGS,
    }
  }, [raw])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// On first admin login, saves the default catalogue into the database
export async function seedDefaults() {
  await Promise.all([
    ...DEFAULT_CATEGORIES.map((c) => db.save('categories', c.id, c)),
    ...DEFAULT_PRODUCTS.map((p) => db.save('products', p.id, p)),
    db.save('settings', 'main', DEFAULT_SETTINGS),
  ])
}
