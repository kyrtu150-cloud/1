import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo />
          <p>AI-визуал для карточек товаров на маркетплейсах. Сделано продавцами для продавцов.</p>
        </div>
        <div className="footer__cols">
          <div>
            <h4>Продукт</h4>
            <a href="#tools">Инструменты</a>
            <a href="#how">Как работает</a>
            <a href="#pricing">Цены</a>
          </div>
          <div>
            <h4>Сервис</h4>
            <a href="#faq">FAQ</a>
            <a href="/studio">Студия</a>
            <a href="#pricing">API-доступ</a>
          </div>
          <div>
            <h4>Контакты</h4>
            <a href="mailto:hello@sok.ai">hello@sok.ai</a>
            <a href="#top">Telegram</a>
          </div>
        </div>
      </div>
      <div className="container footer__bottom mono">
        <span>© {new Date().getFullYear()} СОК.ai</span>
        <span>Made for WB · Ozon · Я.Маркет</span>
      </div>
    </footer>
  )
}
