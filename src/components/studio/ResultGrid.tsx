import type { GeneratedAsset, GenerationProgress } from '@/lib/api/types'

interface Props {
  assets: GeneratedAsset[]
  progress: GenerationProgress
  error: string | null
  ratio: string
  modeLabel: string
}

export default function ResultGrid({ assets, progress, error, ratio, modeLabel }: Props) {
  const busy = progress.status === 'queued' || progress.status === 'running'
  const skeletons = busy ? Array.from({ length: 6 }) : []
  const aspect = ratio.replace(':', ' / ')

  if (error) {
    return (
      <div className="canvas-state canvas-state--error">
        <h3>Не удалось сгенерировать</h3>
        <p>{error}</p>
        <p className="muted">Проверьте ключ выбранного провайдера в .env или вернитесь в демо-режим.</p>
      </div>
    )
  }

  if (!busy && assets.length === 0) {
    return (
      <div className="canvas-state">
        <div className="canvas-state__badge mono">{modeLabel}</div>
        <h3>Опиши товар и нажми «Создать»</h3>
        <p className="muted">
          Загрузи 3–6 фото товара, выбери стиль и площадку — получишь готовую фотоворонку.
          Сейчас активен демо-режим: результаты приходят из набора-витрины.
        </p>
        <kbd className="kbd mono">⌘ / Ctrl + Enter</kbd>
      </div>
    )
  }

  return (
    <>
      {busy && (
        <div className="gen-progress">
          <div className="gen-progress__bar">
            <span style={{ width: `${Math.round(progress.progress * 100)}%` }} />
          </div>
          <span className="gen-progress__msg mono">
            {progress.message ?? 'Генерация'} · {Math.round(progress.progress * 100)}%
          </span>
        </div>
      )}

      <div className="result-grid" style={{ ['--ratio' as string]: aspect }}>
        {skeletons.map((_, i) => (
          <div className="result-card result-card--skeleton" key={`s${i}`} />
        ))}
        {assets.map((a) => (
          <figure className="result-card" key={a.id}>
            {a.kind === 'video' ? (
              <div className="result-card__video">
                <img src={a.thumbnailUrl ?? a.url} alt={a.prompt} />
                <span className="play">▶</span>
              </div>
            ) : (
              <img src={a.url} alt={a.prompt} loading="lazy" />
            )}
            <figcaption className="result-card__bar">
              <button className="mini" title="Скачать">↓</button>
              <button className="mini" title="Повторить вариацию">⟳</button>
              <button className="mini" title="В избранное">♥</button>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  )
}
