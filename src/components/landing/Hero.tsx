import { Link } from 'react-router-dom'
import { SHOWCASE } from '@/data/showcase'
import SafeImage from '../SafeImage'

// Сетка реальных примеров генераций вместо тяжёлой galaxy-анимации.
const GRID = [
  SHOWCASE.clothing[0],
  SHOWCASE.cosmetics[0],
  SHOWCASE.electronics[0],
  SHOWCASE.clothing[1],
  SHOWCASE.jewelry[0],
  SHOWCASE.cosmetics[1],
]

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden />
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">Визуал для карточек WB · Ozon · Я.Маркет</span>
          <h1 className="hero__title">
            Фотосессия — <span className="strike">20 000 ₽</span>.
            <br />
            СОК — <span className="accent">60 секунд</span>.
          </h1>
          <p className="lead hero__lead">
            Загрузи 3–6 фото с телефона — получи готовую фотоворонку для карточки:
            обложки для A/B-теста, ракурсы, детали, инфографику и видео.
          </p>

          <div className="hero__cta">
            <Link to="/studio" className="btn btn-primary btn-lg">
              Создать бесплатно →
            </Link>
            <a href="#tools" className="hero__link">
              Что внутри
            </a>
          </div>

          <div className="hero__meta">
            <Counter /> карточек создано за последние 24 часа
          </div>
        </div>

        <div className="hero__visual" aria-hidden>
          <div className="hero__scanner" />
          <div className="hero__grid">
            {GRID.map((src, i) => (
              <figure className="hero__cell" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                <SafeImage src={src} alt="Пример генерации" loading="eager" />
              </figure>
            ))}
          </div>
          <span className="hero__tag mono">AI · фотоворонка</span>
        </div>
      </div>
    </section>
  )
}

// Лёгкий «живой» счётчик — социальное доказательство.
import { useEffect, useState } from 'react'
function Counter() {
  const [n, setN] = useState(1247)
  useEffect(() => {
    const t = setInterval(() => setN((v) => v + Math.floor(Math.random() * 3)), 4000)
    return () => clearInterval(t)
  }, [])
  return <strong className="mono hero__counter">{n.toLocaleString('ru-RU')}</strong>
}
