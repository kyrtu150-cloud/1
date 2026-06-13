import { TOOLS } from '@/data/content'

export default function Tools() {
  return (
    <section className="section tools" id="tools">
      <div className="container">
        <header className="block-head reveal">
          <span className="eyebrow">Инструменты</span>
          <h2 className="h-section">Всё, чтобы собрать карточку целиком</h2>
          <p className="lead">
            Шесть инструментов — не стек фич, а полный путь от обложки до видео.
            Главное вынесено вперёд.
          </p>
        </header>

        <div className="tools__grid">
          {TOOLS.map((t) => (
            <article
              key={t.id}
              className={`tool reveal ${t.feature ? 'tool--feature' : ''}`}
            >
              <div className="tool__media">
                {(t.feature ? t.images.slice(0, 6) : t.images.slice(0, 3)).map((src, i) => (
                  <img key={i} src={src} alt={`${t.title} — пример`} loading="lazy" />
                ))}
                {t.badge && <span className="tool__badge mono">{t.badge}</span>}
              </div>
              <div className="tool__body">
                <span className="tool__icon" aria-hidden>{t.icon}</span>
                <div>
                  <h3 className="tool__title">{t.title}</h3>
                  <p className="tool__hook">{t.hook}</p>
                </div>
              </div>
              <p className="tool__text">{t.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
