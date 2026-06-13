import { NICHES } from '@/data/content'
import SmartImg from '../common/SmartImg'

export default function Niches() {
  return (
    <section className="section niches">
      <div className="container">
        <header className="block-head reveal">
          <span className="eyebrow">Для каких товаров</span>
          <h2 className="h-section">Работает с любой категорией</h2>
          <p className="lead">Если это одежда — она будет на живой модели. Если деталь — её видно крупно.</p>
        </header>

        <div className="niches__row">
          {NICHES.map((n) => (
            <figure className="niche reveal" key={n.name}>
              <SmartImg src={n.image} seed={n.name} alt={n.name} />
              <figcaption>
                <span aria-hidden>{n.emoji}</span> {n.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
