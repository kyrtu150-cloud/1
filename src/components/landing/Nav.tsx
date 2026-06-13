import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const LINKS = [
  ['Инструменты', '#tools'],
  ['Как работает', '#how'],
  ['Цены', '#pricing'],
  ['FAQ', '#faq'],
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand">
          <Logo />
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <Link to="/studio" className="btn btn-primary nav__cta">
            Открыть студию
          </Link>
          <button
            className="nav__burger"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
