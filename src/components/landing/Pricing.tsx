import { Link } from 'react-router-dom'
import { PLANS } from '@/data/content'

export default function Pricing() {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <header className="block-head reveal">
          <span className="eyebrow">Тарифы</span>
          <h2 className="h-section">От 5 ₽ за фото</h2>
          <p className="lead">Без логистики, студии и съёмочных дней. Отмена в любой момент.</p>
        </header>

        <div className="pricing__grid">
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={`plan reveal ${p.featured ? 'plan--featured' : ''}`}
            >
              {p.featured && <span className="plan__flag mono">Популярный</span>}
              <h3 className="plan__name">{p.name}</h3>
              <p className="plan__note">{p.note}</p>
              <div className="plan__price">
                <span className="mono plan__amount">{p.price}</span>
                <span className="plan__period">{p.period}</span>
              </div>
              <ul className="plan__features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link
                to="/studio"
                className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'} plan__cta`}
              >
                {p.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
