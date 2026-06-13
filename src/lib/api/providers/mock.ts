import { SHOWCASE } from '@/data/showcase'
import type {
  GenerationProvider,
  GenerationProgress,
  GenerationRequest,
  GenerationResult,
  GeneratedAsset,
} from '../types'

/**
 * Демо-провайдер. Не требует ключей и используется по умолчанию,
 * чтобы интерфейс был полностью кликабельным без подключённой нейросети.
 *
 * Возвращает реальные фотографии из набора-витрины (src/data/showcase.ts),
 * имитируя задержку и прогресс настоящей генерации.
 */
export class MockProvider implements GenerationProvider {
  readonly name = 'mock'
  readonly label = 'Демо (без API)'

  isConfigured(): boolean {
    return true
  }

  async generate(
    req: GenerationRequest,
    onProgress?: (p: GenerationProgress) => void,
  ): Promise<GenerationResult> {
    const count = req.count ?? 6

    const steps: GenerationProgress[] = [
      { status: 'queued', progress: 0.05, message: 'Задача в очереди' },
      { status: 'running', progress: 0.25, message: 'Анализ референсов товара' },
      { status: 'running', progress: 0.55, message: 'Подбор стиля и локации' },
      { status: 'running', progress: 0.85, message: 'Отрисовка кадров' },
    ]
    for (const s of steps) {
      onProgress?.(s)
      await delay(450)
    }

    const pool = poolForMode(req)
    const assets: GeneratedAsset[] = Array.from({ length: count }, (_, i) => {
      const src = pool[i % pool.length]
      return {
        id: `mock_${Date.now()}_${i}`,
        url: src,
        thumbnailUrl: src,
        kind: req.mode === 'video' ? 'video' : 'image',
        prompt: req.prompt,
        mode: req.mode,
        styles: req.styles,
        width: 1024,
        height: 1365,
        createdAt: Date.now(),
      }
    })

    onProgress?.({ status: 'done', progress: 1, message: 'Готово' })
    return { assets, provider: this.name }
  }
}

function poolForMode(req: GenerationRequest): string[] {
  const byCategory: Record<string, string[]> = {
    clothing: SHOWCASE.clothing,
    cosmetics: SHOWCASE.cosmetics,
    electronics: SHOWCASE.electronics,
    jewelry: SHOWCASE.jewelry,
    home: SHOWCASE.home,
  }
  const base = (req.category && byCategory[req.category]) || SHOWCASE.mixed
  return base.length ? base : SHOWCASE.mixed
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
