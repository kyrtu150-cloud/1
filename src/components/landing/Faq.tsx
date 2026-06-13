import { useState } from 'react'
import { FAQ } from '@/data/content'

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section faq" id="faq">
      <div className="container faq__inner">
        <header className="block-head reveal">
          <span className="eyebrow">FAQ</span>
          <h2 className="h-section">Снимаем возражения</h2>
        </header>

        <div className="faq__list reveal">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq__sign" aria-hidden>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className="faq__a" hidden={!isOpen}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
