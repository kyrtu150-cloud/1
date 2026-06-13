import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/** Sticky CTA-бар внизу на мобиле — не теряем мобильный трафик. */
export default function StickyCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`sticky-cta ${show ? 'is-visible' : ''}`}>
      <div className="sticky-cta__text">
        <strong>от 5 ₽ за фото</strong>
        <span>фотоворонка за 60 секунд</span>
      </div>
      <Link to="/studio" className="btn btn-primary">
        Создать
      </Link>
    </div>
  )
}
