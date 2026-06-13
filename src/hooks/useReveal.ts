import { useEffect } from 'react'

/**
 * Подключает плавное появление элементов с классом .reveal при попадании
 * во вьюпорт (Intersection Observer) + лёгкий параллакс для [data-parallax].
 */
export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ----- Появление со скролла + авто-стаггер внутри группы -----
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (els.length) {
      // Авто-задержка для элементов-соседей одной группы (грид, ряд карточек).
      const groups = new Map<Element, number>()
      for (const el of els) {
        if (el.style.transitionDelay) continue // уважение к ручным задержкам
        const parent = el.parentElement
        if (!parent) continue
        const idx = groups.get(parent) ?? 0
        if (idx > 0) el.style.transitionDelay = `${Math.min(idx, 6) * 70}ms`
        groups.set(parent, idx + 1)
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      )
      els.forEach((el) => io.observe(el))

      // ----- Параллакс -----
      const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
      let raf = 0
      const onScroll = () => {
        if (raf || reduce) return
        raf = requestAnimationFrame(() => {
          const y = window.scrollY
          for (const el of parallax) {
            const speed = parseFloat(el.dataset.parallax || '0.1')
            el.style.transform = `translate3d(0, ${(-y * speed).toFixed(1)}px, 0)`
          }
          raf = 0
        })
      }
      if (parallax.length && !reduce) {
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      }

      return () => {
        io.disconnect()
        window.removeEventListener('scroll', onScroll)
        if (raf) cancelAnimationFrame(raf)
      }
    }
  }, [])
}
