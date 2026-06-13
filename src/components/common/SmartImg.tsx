import { useState } from 'react'

/**
 * Изображение с устойчивым фолбэком.
 * Основной источник — реальное фото (CDN). Если оно недоступно
 * (офлайн, блокировка хоста, лимиты), вместо «битой» иконки
 * показывается аккуратная фирменная плитка-градиент, сгенерированная
 * детерминированно из seed — интерфейс никогда не выглядит сломанным.
 */
export default function SmartImg({
  src,
  alt = '',
  seed,
  loading = 'lazy',
  className,
}: {
  src: string
  alt?: string
  seed?: string
  loading?: 'lazy' | 'eager'
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const fallback = gradientDataUri(seed ?? src)

  return (
    <img
      src={failed ? fallback : src}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

/** Детерминированный градиент в фирменной палитре по строке-seed. */
function gradientDataUri(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  const hue = h % 16 // узкий тёплый диапазон вокруг апельсина #FF6B35
  const a = `hsl(${14 + hue}, 72%, 20%)`
  const b = `hsl(${10 + (h % 10)}, 55%, 8%)`
  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='520'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${a}'/>
      <stop offset='1' stop-color='${b}'/>
    </linearGradient>
  </defs>
  <rect width='400' height='520' fill='${b}'/>
  <rect width='400' height='520' fill='url(#g)'/>
  <circle cx='200' cy='250' r='60' fill='none' stroke='rgba(255,107,53,.35)' stroke-width='2'/>
  <text x='200' y='258' font-family='monospace' font-size='15' fill='rgba(250,250,250,.5)'
    text-anchor='middle'>СОК · фото</text>
</svg>`.trim()
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
