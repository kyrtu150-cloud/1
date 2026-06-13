import { Link } from 'react-router-dom'

export default function FinalCta() {
  return (
    <section className="section final">
      <div className="container final__box reveal">
        <div className="aurora" aria-hidden />
        <span className="eyebrow">Пока ты думаешь — конкурент тестирует</span>
        <h2 className="final__title">
          Собери первую карточку <span className="grad">бесплатно</span>
        </h2>
        <p className="lead final__lead">
          Загрузи фото товара и получи первый результат без регистрации.
          Дальше — десятки кадров за минуты.
        </p>
        <Link to="/studio" className="btn btn-primary btn-lg">
          Открыть студию →
        </Link>
      </div>
    </section>
  )
}
