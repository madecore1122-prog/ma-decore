import { Link } from 'react-router-dom'
import { Heart, Hand, Gem, Users, MapPin, Clock, Phone } from 'lucide-react'
import { useData } from '../context/DataContext'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import ProductImage from '../components/ProductImage'

export default function About() {
  const { settings: s, products } = useData()
  const pics = products.filter((p) => p.featured).slice(0, 2)
  const vals = [
    [Hand, 'Made by hand', 'Every lamp, box and wall piece is cut, carved and finished by hand.'],
    [Gem, 'Quality materials', 'Quality wood, sparkling crystals and carefully chosen finishes.'],
    [Heart, 'Made with love', 'Each order is prepared with the same care as a gift for family.'],
    [Users, 'Customer first', 'Friendly WhatsApp support from the first message to delivery.'],
  ]
  return (
    <>
      <PageHero kicker="Our story" title="About Us" sub={`${s.name} - ${s.tagline.toLowerCase()}.`} />

      <section className="py-16 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4">
              <ProductImage src={pics[0]?.image} alt="" emoji="💡" className="arch aspect-[3/4.2] w-full self-end shadow-card ring-2 ring-gold-300/50" />
              <ProductImage src={pics[1]?.image} alt="" emoji="✨" className="arch aspect-[3/4.6] w-full shadow-card ring-2 ring-gold-300/50" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="text-xs uppercase tracking-[.3em] text-gold-500">Who we are</div>
            <h2 className="mt-3 font-display text-5xl font-semibold leading-tight sm:text-6xl">A small workshop with a big love for décor</h2>
            <p className="mt-5 leading-relaxed text-ink-900/70">
              {s.name} began with a simple idea: beautiful home décor does not have to be mass-produced. From our workshop in {s.address.split(',')[0]},
              we craft crystal table lamps, wooden decoration pieces, wall decor and gift items entirely by hand.
            </p>
            <p className="mt-4 leading-relaxed text-ink-900/70">
              Because each piece is made to order, it usually takes {s.prepTime} to prepare. We pack every order carefully so it reaches you safe and ready to shine in your home.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-4">
              {[['100%', 'Handmade'], [`${products.length}+`, 'Designs'], [s.prepTime, 'Preparation']].map(([a, b]) => (
                <div key={b} className="rounded-2xl bg-white p-4 text-center shadow-card"><div className="font-display text-3xl font-semibold text-gold-600">{a}</div><div className="text-xs text-ink-900/55">{b}</div></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle kicker="Our values" title="What We Believe In" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {vals.map(([Icon, t, d], k) => (
              <Reveal key={t} delay={k * 90}>
                <div className="h-full rounded-3xl bg-cream p-7 text-center transition hover:-translate-y-1.5 hover:shadow-card">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 text-gold-200"><Icon size={26} /></div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{t}</h3>
                  <p className="mt-2 text-sm text-ink-900/60">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionTitle kicker="Find us" title="Our Location" />
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-card lg:grid-cols-5">
            <div className="space-y-6 bg-ink-950 p-8 text-cream lg:col-span-2">
              {[[MapPin, 'Address', s.address], [Clock, 'Hours', s.hours], [Phone, 'Phone', s.phone]].map(([Icon, t, d]) => (
                <div key={t} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-400 text-ink-950"><Icon size={20} /></div>
                  <div><div className="font-display text-xl italic text-gold-300">{t}</div><div className="text-cream/75">{d}</div></div>
                </div>
              ))}
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`} target="_blank" rel="noreferrer" className="btn-gold w-full">Get Directions</a>
            </div>
            <iframe title="Location" className="h-80 w-full border-0 lg:col-span-3 lg:h-full lg:min-h-[26rem]" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&output=embed`} />
          </div>
          <div className="mt-10 text-center"><Link to="/shop" className="btn-dark">Shop Collection</Link></div>
        </div>
      </section>
    </>
  )
}
