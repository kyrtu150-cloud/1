/** Текстовый логотип СОК.ai (вариант-фаворит из брифа: курсив + домен в цвете). */
export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <span
      className="logo"
      style={{ fontSize: size }}
      aria-label="СОК точка ai"
    >
      <span className="logo-word">СОК</span>
      <span className="logo-dot">.</span>
      <span className="logo-ai">ai</span>
    </span>
  )
}
