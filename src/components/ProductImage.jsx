import { useEffect, useState } from 'react'
import { imgSrc } from '../lib/utils'

export default function ProductImage({ src, alt, emoji = '✨', className = '' }) {
  const [bad, setBad] = useState(false)
  useEffect(() => setBad(false), [src])
  if (!src || bad) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-gradient-to-br from-gold-100 via-sand to-gold-200 ${className}`}>
        <span className="text-5xl opacity-70 drop-shadow">{emoji}</span>
      </div>
    )
  }
  return <img src={imgSrc(src)} alt={alt} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />
}
