export default function PageHero({ title, sub, kicker }) {
  return (
    <section className="pattern-bg relative overflow-hidden bg-ink-950 pb-14 pt-32 text-center sm:pb-20 sm:pt-40">
      <div className="absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 animate-glow rounded-full bg-gold-400/25 blur-3xl" />
      <div className="container-x relative">
        {kicker && <div className="text-xs uppercase tracking-[.35em] text-gold-300">{kicker}</div>}
        <h1 className="mt-3 font-display text-6xl font-semibold italic text-cream sm:text-7xl">{title}</h1>
        {sub && <p className="mx-auto mt-3 max-w-2xl text-cream/70">{sub}</p>}
      </div>
    </section>
  )
}
