import { Link } from 'react-router-dom'
import { ArrowRight, Hand, MessageCircle, PackageCheck, Gem, Sparkles, Truck, Tag, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useData } from '../context/DataContext'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import SectionTitle from '../components/SectionTitle'
import Countdown, { isActive } from '../components/Countdown'
import Reveal from '../components/Reveal'
import { waLink } from '../lib/whatsapp'

function Hero() {
  const { settings: s, products } = useData()
  const feat = products.filter((p) => p.featured && p.available !== false)
  const pics = (feat.length >= 3 ? feat : products).slice(0, 3)
  const words = s.heroTitle.split(' ')
  return (
    <section className="pattern-bg relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950">
      <div className="absolute -right-24 top-10 h-[34rem] w-[34rem] animate-glow rounded-full bg-gold-400/30 blur-[110px]" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-clay-500/20 blur-[110px]" />

      <div className="container-x relative z-10 grid items-center gap-10 pb-16 pt-32 lg:grid-cols-2">
        <div className="animate-slideUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-white/5 px-4 py-2 text-[11px] font-medium uppercase tracking-[.25em] text-gold-200">
            <Hand size={14} /> 100% Handmade Collection
          </span>
          <h1 className="mt-6 font-display text-[3.4rem] font-semibold leading-[.95] text-cream sm:text-7xl lg:text-[5.8rem]">
            {words.map((w, i) => (
              <span key={i} className={i >= words.length - 2 ? 'gold-text italic' : ''}>{w} </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-cream/75">{s.heroSub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/shop" className="btn-gold">Start Shopping <ArrowRight size={17} /></Link>
            <Link to="/offers" className="btn-ghost">View Offers</Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-7">
            {[['100%', 'Handmade'], [s.prepTime, 'Preparation'], ['WhatsApp', 'Easy ordering']].map(([a, b]) => (
              <div key={b}>
                <div className="font-display text-3xl font-semibold text-gold-200">{a}</div>
                <div className="text-[11px] uppercase tracking-[.2em] text-cream/55">{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto grid h-[26rem] w-full max-w-md grid-cols-2 gap-4 sm:h-[34rem] lg:max-w-none">
          <div className="animate-floaty self-end"><Link to={`/product/${pics[1]?.id}`}><ProductImage src={pics[1]?.image} alt={pics[1]?.name} emoji="💡" className="arch aspect-[3/4.2] w-full shadow-2xl ring-2 ring-gold-300/40" /></Link></div>
          <div className="animate-floaty self-start [animation-delay:-3s]"><Link to={`/product/${pics[0]?.id}`}><ProductImage src={pics[0]?.image} alt={pics[0]?.name} emoji="✨" className="arch aspect-[3/4.6] w-full shadow-2xl ring-2 ring-gold-300/40" /></Link></div>
          <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950 ring-1 ring-gold-400/60">
            <svg viewBox="0 0 120 120" className="absolute inset-0 animate-spinSlow">
              <defs><path id="c" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
              <text fontSize="10.5" letterSpacing="3.2" fill="#dfba5e" fontFamily="Jost"><textPath href="#c">HANDMADE WITH LOVE • HANDMADE WITH LOVE •</textPath></text>
            </svg>
            <Sparkles className="text-gold-300" size={26} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  const words = ['100% Handmade', 'Crystal Lamps', 'Wooden Decor', 'Wall Decor', 'Gift Items', 'Order on WhatsApp']
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-y border-gold-400/30 bg-ink-900 py-4 text-gold-200">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {[...row, ...row].map((w, k) => <span key={k} className="mx-7 flex items-center gap-14 font-display text-2xl italic">{w} <Sparkles size={16} className="text-gold-400" /></span>)}
      </div>
    </div>
  )
}

function Categories() {
  const { categories, products } = useData()
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle kicker="Handpicked" title="Choose Your Style" sub="Four collections, one promise: every piece is made by hand." />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {categories.map((c, k) => {
            const list = products.filter((p) => p.category === c.id)
            const cover = list.find((p) => p.image)
            return (
              <Reveal key={c.id} delay={k * 90}>
                <Link to={`/shop?cat=${c.id}`} className="group block text-center">
                  <div className="arch relative mx-auto aspect-[3/4] overflow-hidden bg-sand shadow-card ring-1 ring-gold-300/40">
                    <ProductImage src={cover?.image} alt={c.name} emoji={c.emoji} className="h-full w-full transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                    <span className="absolute inset-x-0 bottom-5 text-xs uppercase tracking-[.25em] text-cream/90">{list.length} {list.length === 1 ? "piece" : "pieces"}</span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl font-semibold transition group-hover:text-gold-600">{c.name}</h3>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Featured() {
  const { products } = useData()
  const feat = products.filter((p) => p.featured)
  const list = (feat.length >= 4 ? feat : products).slice(0, 8)
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle kicker="Bestsellers" title="Featured Products" sub="Our most loved handmade pieces, ready to light up your home." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, k) => <Reveal key={p.id} delay={(k % 4) * 80}><ProductCard product={p} /></Reveal>)}
        </div>
        <div className="mt-12 text-center"><Link to="/shop" className="btn-outline">View All Products <ArrowRight size={16} /></Link></div>
      </div>
    </section>
  )
}

export function OfferBanner() {
  const { settings: s } = useData()
  const [copied, setCopied] = useState(false)
  const active = isActive(s.offerEnds)
  if (!active) return null
  const copy = () => { navigator.clipboard?.writeText(s.offerCode); setCopied(true); setTimeout(() => setCopied(false), 1500) }
  return (
    <section className="px-4 py-6">
      <div className="container-x">
        <div className="pattern-bg relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800 p-8 text-center ring-1 ring-gold-400/40 sm:p-14">
          <div className="absolute left-1/2 top-0 h-60 w-[36rem] -translate-x-1/2 animate-glow rounded-full bg-gold-400/30 blur-3xl" />
          <div className="relative">
            <span className="rounded-full bg-clay-500 px-4 py-1 text-[11px] font-semibold uppercase tracking-[.25em] text-white">{s.offerTitle}</span>
            <h2 className="mt-5 font-display text-5xl font-semibold text-cream sm:text-7xl">{s.offerText.split(/(\d+%\s*off)/i).map((t, i) => (/off/i.test(t) && /\d/.test(t) ? <span key={i} className="gold-text italic">{t}</span> : t))}</h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/70">Use code at checkout{s.freeDeliveryMinItems > 0 && <> · <b className="text-gold-200">Free delivery</b> on {s.freeDeliveryMinItems}+ items</>}</p>
            <button onClick={copy} className="mx-auto mt-6 flex items-center gap-3 rounded-full border-2 border-dashed border-gold-300 px-7 py-3 font-display text-3xl font-semibold tracking-widest text-gold-200 transition hover:bg-gold-400/15">
              {s.offerCode} {copied ? <Check size={20} /> : <Copy size={18} className="opacity-70" />}
            </button>
            <div className="mt-8 flex justify-center"><Countdown end={s.offerEnds} /></div>
            <Link to="/shop" className="btn-gold mt-9">Shop the Offer <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Trust() {
  const { settings: s } = useData()
  const f = [
    [Hand, 'Handmade Craftsmanship', 'Each piece is crafted by skilled hands - no two are exactly alike.'],
    [MessageCircle, 'Order on WhatsApp', 'Simple ordering: pick, confirm and chat with us directly.'],
    [PackageCheck, 'Safe Packing', 'Fragile crystal and wood pieces are packed with extra care.'],
    [Gem, 'Best Price, Direct', `Straight from the maker to you. Ready in ${s.prepTime}.`],
  ]
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle kicker="Why us" title="Made With Care" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {f.map(([Icon, t, d], k) => (
            <Reveal key={t} delay={k * 90}>
              <div className="card group h-full p-8 text-center transition hover:-translate-y-1.5 hover:shadow-2xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-50 text-gold-600 ring-1 ring-gold-300 transition group-hover:bg-ink-900 group-hover:text-gold-200"><Icon size={28} /></div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-ink-900/60">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Steps() {
  const steps = [['01', 'Choose', 'Browse the collection and add your favourites to the cart.'], ['02', 'Order', 'Enter your details, pick a payment method and confirm on WhatsApp.'], ['03', 'Enjoy', 'We make and pack your order by hand and deliver it to your door.']]
  return (
    <section className="pattern-bg bg-ink-950 py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle light kicker="Simple process" title="How To Order" />
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map(([n, t, d], k) => (
            <Reveal key={n} delay={k * 100}>
              <div className="text-center">
                <div className="gold-text font-display text-8xl font-semibold italic leading-none">{n}</div>
                <h3 className="mt-2 font-display text-3xl font-semibold text-cream">{t}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-cream/65">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Custom() {
  const { settings: s } = useData()
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold-200 via-gold-300 to-gold-400 p-8 sm:p-14">
          <div className="absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/40 blur-2xl" />
          <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-display text-5xl font-semibold text-ink-950 sm:text-6xl">Want something custom?</h2>
              <p className="mt-2 max-w-xl text-ink-900/75">Tell us your idea, size or colour and we will craft it by hand just for you.</p>
            </div>
            <a href={waLink(s.whatsapp, 'Hello! I would like a custom handmade piece.')} target="_blank" rel="noreferrer" className="btn bg-ink-950 text-gold-200 hover:bg-ink-800"><MessageCircle size={18} /> Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Categories />
      <Featured />
      <OfferBanner />
      <Trust />
      <Steps />
      <Custom />
    </>
  )
}
