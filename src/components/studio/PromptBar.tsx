import { useRef, useState } from 'react'
import type {
  Marketplace,
  ProductCategory,
  ShootingStyle,
} from '@/lib/api/types'

interface Props {
  prompt: string
  onPrompt: (v: string) => void
  onGenerate: () => void
  busy: boolean
  presets: string[]
  count: number

  refs: string[]
  onRefs: (v: string[]) => void

  showStyles: boolean
  styles: ShootingStyle[]
  onToggleStyle: (s: ShootingStyle) => void
  styleDefs: { id: ShootingStyle; label: string; desc: string }[]

  category: ProductCategory
  onCategory: (c: ProductCategory) => void
  categories: { id: ProductCategory; label: string }[]

  marketplace: Marketplace
  onMarketplace: (m: Marketplace) => void
  marketplaces: { id: Marketplace; label: string; ratio: string }[]
}

export default function PromptBar(p: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [showStylePanel, setShowStylePanel] = useState(true)

  function onFiles(list: FileList | null) {
    if (!list) return
    const next: string[] = []
    Array.from(list)
      .slice(0, 6 - p.refs.length)
      .forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          next.push(reader.result as string)
          if (next.length) p.onRefs([...p.refs, ...next])
        }
        reader.readAsDataURL(file)
      })
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      p.onGenerate()
    }
  }

  return (
    <div className="promptbar">
      {/* Панель настроек над полем ввода */}
      <div className="promptbar__settings">
        {p.showStyles && (
          <div className="seg">
            <button
              className="seg__head"
              onClick={() => setShowStylePanel((v) => !v)}
            >
              Стили съёмки <span className="seg__count mono">{p.styles.length}</span>
            </button>
            {showStylePanel && (
              <div className="style-chips">
                {p.styleDefs.map((s) => (
                  <button
                    key={s.id}
                    className={`chip ${p.styles.includes(s.id) ? 'is-on' : ''}`}
                    onClick={() => p.onToggleStyle(s.id)}
                    title={s.desc}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <label className="select-field">
          <span>Категория</span>
          <select value={p.category} onChange={(e) => p.onCategory(e.target.value as ProductCategory)}>
            {p.categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </label>

        <label className="select-field">
          <span>Площадка</span>
          <select value={p.marketplace} onChange={(e) => p.onMarketplace(e.target.value as Marketplace)}>
            {p.marketplaces.map((m) => (
              <option key={m.id} value={m.id}>{m.label} · {m.ratio}</option>
            ))}
          </select>
        </label>

        <span className="count-badge mono">×{p.count} кадров</span>
      </div>

      {/* Референсы товара */}
      {p.refs.length > 0 && (
        <div className="promptbar__refs">
          {p.refs.map((src, i) => (
            <div className="ref-thumb" key={i}>
              <img src={src} alt="референс" />
              <button onClick={() => p.onRefs(p.refs.filter((_, j) => j !== i))} aria-label="Удалить">×</button>
            </div>
          ))}
        </div>
      )}

      {/* Поле ввода промта + кнопки */}
      <div className="promptbar__input">
        <button
          className="icon-btn"
          onClick={() => fileRef.current?.click()}
          title="Загрузить фото товара"
          aria-label="Загрузить фото товара"
        >
          <PlusIcon />
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => onFiles(e.target.files)}
        />

        <textarea
          className="prompt-textarea"
          placeholder="Опиши товар, сцену и атмосферу… Напр.: кроссовки на бетонном подиуме, мягкий контровой свет, акцент на текстуре"
          value={p.prompt}
          onChange={(e) => p.onPrompt(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
        />

        <button
          className="generate-btn"
          onClick={p.onGenerate}
          disabled={p.busy}
        >
          {p.busy ? <span className="spinner" /> : <span className="generate-btn__icon">✦</span>}
          {p.busy ? 'Генерация…' : 'Создать'}
        </button>
      </div>

      {/* Быстрые пресеты промта */}
      <div className="promptbar__presets">
        <span className="presets__label">Идеи:</span>
        {p.presets.map((preset) => (
          <button key={preset} className="preset" onClick={() => p.onPrompt(preset)}>
            {preset.length > 46 ? preset.slice(0, 44) + '…' : preset}
          </button>
        ))}
      </div>
    </div>
  )
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}
