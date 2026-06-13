import { useState } from 'react'

// ===========================================================================
//  SafeImage — <img> с аккуратной деградацией.
//  Если реальное фото не загрузилось (например, CDN временно недоступен),
//  вместо «битой картинки» показывается брендовый градиент с подписью.
//  Это держит интерфейс чистым при любом состоянии сети.
// ===========================================================================

// Детерминированный градиент по строке — чтобы фолбэк выглядел осмысленно,
// а не одинаково серым.
function fallbackBg(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  const a = h % 360
  const b = (a + 40) % 360
  return `linear-gradient(135deg, hsl(${a} 45% 16%), hsl(${b} 55% 9%))`
}

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  /** Подпись внутри фолбэка (по умолчанию — alt). */
  fallbackLabel?: string
}

export default function SafeImage({ src, alt, fallbackLabel, className, ...rest }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={`safe-img-fallback ${className ?? ''}`}
        style={{ background: fallbackBg(src || alt) }}
        role="img"
        aria-label={alt}
      >
        <span className="safe-img-fallback__mark" aria-hidden>
          СОК<i>.ai</i>
        </span>
        {(fallbackLabel ?? alt) && (
          <span className="safe-img-fallback__label">{fallbackLabel ?? alt}</span>
        )}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
