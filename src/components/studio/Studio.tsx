import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../landing/Logo'
import './studio.css'
import { MODES, STYLES, CATEGORIES, MARKETPLACES, PROMPT_PRESETS } from './config'
import { useGeneration } from '@/hooks/useGeneration'
import { activeProviderInfo } from '@/lib/api/client'
import { listProviders } from '@/lib/api/providers'
import type {
  GenerationMode,
  Marketplace,
  ProductCategory,
  ShootingStyle,
} from '@/lib/api/types'
import ResultGrid from './ResultGrid'
import PromptBar from './PromptBar'

export default function Studio() {
  const gen = useGeneration()

  const [mode, setMode] = useState<GenerationMode>('funnel')
  const [styles, setStyles] = useState<ShootingStyle[]>(['studio'])
  const [category, setCategory] = useState<ProductCategory>('clothing')
  const [marketplace, setMarketplace] = useState<Marketplace>('wildberries')
  const [prompt, setPrompt] = useState('')
  const [refs, setRefs] = useState<string[]>([])
  const [providerName, setProviderName] = useState<string | undefined>(undefined)

  const modeDef = useMemo(() => MODES.find((m) => m.id === mode)!, [mode])
  const provider = activeProviderInfo(providerName)
  const ratio = MARKETPLACES.find((m) => m.id === marketplace)?.ratio ?? '3:4'
  const busy = gen.progress.status === 'queued' || gen.progress.status === 'running'

  function toggleStyle(s: ShootingStyle) {
    setStyles((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
  }

  async function handleGenerate() {
    if (busy) return
    await gen.run({
      prompt,
      mode,
      styles: modeDef.styles ? styles : undefined,
      category,
      marketplace,
      aspectRatio: ratio,
      count: modeDef.defaultCount,
      referenceImages: refs,
    })
  }

  return (
    <div className="studio">
      {/* ---------- Левая панель: режимы ---------- */}
      <aside className="studio__sidebar">
        <Link to="/" className="studio__logo">
          <Logo size={20} />
        </Link>

        <nav className="studio__modes">
          {MODES.map((m) => (
            <button
              key={m.id}
              className={`mode ${mode === m.id ? 'is-active' : ''} ${m.soon ? 'is-soon' : ''}`}
              onClick={() => !m.soon && setMode(m.id as GenerationMode)}
              disabled={m.soon}
            >
              <span className="mode__icon" aria-hidden>{m.icon}</span>
              <span className="mode__text">
                <span className="mode__label">
                  {m.label}
                  {m.soon && <em className="mode__soon">скоро</em>}
                </span>
                <span className="mode__hint">{m.hint}</span>
              </span>
            </button>
          ))}
        </nav>

        <div className="studio__sidebar-foot">
          <div className="provider-pill">
            <span className={`dot ${provider.configured ? 'dot--on' : 'dot--off'}`} />
            <div>
              <small>Нейросеть</small>
              <select
                value={provider.name}
                onChange={(e) => setProviderName(e.target.value)}
                className="provider-select"
              >
                {listProviders().map((p) => (
                  <option key={p.name} value={p.name} disabled={!p.isConfigured()}>
                    {p.label}
                    {p.isConfigured() ? '' : ' — нет ключа'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- Центр: холст с результатами ---------- */}
      <main className="studio__main">
        <header className="studio__topbar">
          <div className="studio__breadcrumb">
            <span className="mono">/{mode}</span>
            <h1>{modeDef.label}</h1>
          </div>
          <div className="studio__top-actions">
            <span className="credits mono">кредиты: <b>120</b></span>
            <Link to="/" className="btn btn-ghost studio__exit">← На сайт</Link>
          </div>
        </header>

        <section className="studio__canvas">
          <ResultGrid
            assets={gen.assets}
            progress={gen.progress}
            error={gen.error}
            ratio={ratio}
            modeLabel={modeDef.label}
          />
        </section>

        {/* ---------- Низ: панель промта ---------- */}
        <PromptBar
          prompt={prompt}
          onPrompt={setPrompt}
          onGenerate={handleGenerate}
          busy={busy}
          presets={PROMPT_PRESETS}
          refs={refs}
          onRefs={setRefs}
          count={modeDef.defaultCount}
          // настройки
          showStyles={!!modeDef.styles}
          styles={styles}
          onToggleStyle={toggleStyle}
          styleDefs={STYLES}
          category={category}
          onCategory={setCategory}
          categories={CATEGORIES}
          marketplace={marketplace}
          onMarketplace={setMarketplace}
          marketplaces={MARKETPLACES}
        />
      </main>
    </div>
  )
}
