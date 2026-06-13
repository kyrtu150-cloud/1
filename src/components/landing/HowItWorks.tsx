import { STEPS } from '@/data/content'

export default function HowItWorks() {
  return (
    <section className="section how" id="how">
      <div className="container">
        <header className="block-head reveal">
          <span className="eyebrow">Как работает</span>
          <h2 className="h-section">Четыре шага до готовой карточки</h2>
        </header>

        <div className="how__grid">
          {STEPS.map((s, i) => (
            <article className="how__card reveal" key={s.n} style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="how__n mono">{s.n}</span>
              <h3 className="how__title">{s.title}</h3>
              <p className="how__text">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
