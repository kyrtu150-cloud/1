import { PROOF } from '@/data/content'

export default function Proof() {
  return (
    <section className="proof">
      <div className="container proof__grid">
        {PROOF.map((p) => (
          <div className="proof__item reveal" key={p.label}>
            <div className="proof__value mono">{p.value}</div>
            <div className="proof__label">{p.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
