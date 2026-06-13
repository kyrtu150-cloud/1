import { COMPARE } from '@/data/content'

export default function Compare() {
  return (
    <section className="section compare">
      <div className="container">
        <header className="block-head reveal">
          <span className="eyebrow">Цена через замену</span>
          <h2 className="h-section">Что вы платили раньше</h2>
        </header>

        <div className="compare__grid reveal">
          <div className="compare__col compare__col--old">
            <div className="compare__head">
              <h3>{COMPARE.studio.title}</h3>
              <span className="compare__price mono">{COMPARE.studio.price}</span>
            </div>
            <ul>
              {COMPARE.studio.rows.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <b>{v}</b>
                </li>
              ))}
            </ul>
          </div>

          <div className="compare__vs mono">vs</div>

          <div className="compare__col compare__col--new">
            <div className="compare__head">
              <h3>{COMPARE.sok.title}</h3>
              <span className="compare__price mono accent">{COMPARE.sok.price}</span>
            </div>
            <ul>
              {COMPARE.sok.rows.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <b>{v}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
