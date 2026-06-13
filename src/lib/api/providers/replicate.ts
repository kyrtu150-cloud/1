import type {
  GenerationProvider,
  GenerationProgress,
  GenerationRequest,
  GenerationResult,
  GeneratedAsset,
} from '../types'
import { buildPrompt } from '../prompt'

/**
 * Провайдер для Replicate (Flux, SDXL и др.).
 * Replicate работает асинхронно: создаём prediction и опрашиваем статус.
 *
 * ПОДКЛЮЧЕНИЕ (.env):
 *   VITE_GENERATION_PROVIDER=replicate
 *   VITE_REPLICATE_API_TOKEN=r8_...
 *   VITE_REPLICATE_MODEL=black-forest-labs/flux-1.1-pro
 *
 * Прямые запросы из браузера к Replicate блокируются CORS — в продакшене
 * проксируйте их через свой бэкенд. Здесь показана эталонная реализация поллинга.
 */
export class ReplicateProvider implements GenerationProvider {
  readonly name = 'replicate'
  readonly label = 'Replicate (Flux / SDXL)'

  private token = import.meta.env.VITE_REPLICATE_API_TOKEN ?? ''
  private model = import.meta.env.VITE_REPLICATE_MODEL ?? 'black-forest-labs/flux-1.1-pro'
  private base = 'https://api.replicate.com/v1'

  isConfigured(): boolean {
    return Boolean(this.token)
  }

  async generate(
    req: GenerationRequest,
    onProgress?: (p: GenerationProgress) => void,
  ): Promise<GenerationResult> {
    if (!this.isConfigured()) {
      throw new Error('Replicate провайдер не настроен: задайте VITE_REPLICATE_API_TOKEN')
    }

    onProgress?.({ status: 'queued', progress: 0.1, message: 'Создание задачи' })

    const create = await fetch(`${this.base}/models/${this.model}/predictions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        Prefer: 'wait',
      },
      body: JSON.stringify({
        input: {
          prompt: buildPrompt(req),
          aspect_ratio: req.aspectRatio ?? '3:4',
          num_outputs: req.count ?? 4,
          seed: req.seed,
        },
      }),
    })

    if (!create.ok) {
      throw new Error(`Replicate ошибка ${create.status}: ${await create.text()}`)
    }

    let prediction = await create.json()

    // Поллинг до завершения.
    while (prediction.status === 'starting' || prediction.status === 'processing') {
      onProgress?.({ status: 'running', progress: 0.6, message: 'Генерация' })
      await delay(1500)
      const poll = await fetch(`${this.base}/predictions/${prediction.id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      prediction = await poll.json()
    }

    if (prediction.status !== 'succeeded') {
      throw new Error(`Replicate: задача завершилась со статусом ${prediction.status}`)
    }

    const outputs: string[] = Array.isArray(prediction.output)
      ? prediction.output
      : [prediction.output]

    const assets: GeneratedAsset[] = outputs.map((url, i) => ({
      id: `replicate_${prediction.id}_${i}`,
      url,
      kind: 'image',
      prompt: req.prompt,
      mode: req.mode,
      styles: req.styles,
      createdAt: Date.now(),
    }))

    onProgress?.({ status: 'done', progress: 1, message: 'Готово' })
    return { assets, provider: this.name }
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
