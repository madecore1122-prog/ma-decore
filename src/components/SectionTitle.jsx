export default function SectionTitle({ kicker, title, sub, light = false, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {kicker && (
        <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-10 bg-gold-400" />
          <span className="text-xs font-medium uppercase tracking-[.3em] text-gold-500">{kicker}</span>
          <span className="h-px w-10 bg-gold-400" />
        </div>
      )}
      <h2 className={`mt-3 font-display text-5xl font-semibold leading-tight sm:text-6xl ${light ? 'text-cream' : 'text-ink-900'}`}>{title}</h2>
      {sub && <p className={`mx-auto mt-3 max-w-2xl ${light ? 'text-cream/70' : 'text-ink-900/60'}`}>{sub}</p>}
    </div>
  )
}
