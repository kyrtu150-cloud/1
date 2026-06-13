import type {
  GenerationProvider,
  GenerationProgress,
  GenerationRequest,
  GenerationResult,
  GeneratedAsset,
} from '../types'

/**
 * Провайдер для ВАШЕГО собственного бэкенда.
 *
 * Это рекомендуемый способ для продакшена: фронтенд не хранит секретные
 * ключи нейросетей, а обращается к вашему API, который уже ходит в OpenAI /
 * Replicate / собственную модель и тарифицирует кредиты пользователя.
 *
 * Ожидаемый контракт бэкенда:
 *   POST {VITE_CUSTOM_API_BASE_URL}/generate
 *   body: GenerationRequest
 *   200 -> { assets: GeneratedAsset[], cost?: number }
 *
 * ПОДКЛЮЧЕНИЕ (.env):
 *   VITE_GENERATION_PROVIDER=custom
 *   VITE_CUSTOM_API_BASE_URL=https://api.sok.ai
 *   VITE_CUSTOM_API_KEY=...   (опционально, если нужен)
 */
export class CustomProvider implements GenerationProvider {
  readonly name = 'custom'
  readonly label = 'Свой бэкенд СОК'

  private base = import.meta.env.VITE_CUSTOM_API_BASE_URL ?? ''
  private key = import.meta.env.VITE_CUSTOM_API_KEY ?? ''

  isConfigured(): boolean {
    return Boolean(this.base)
  }

  async generate(
    req: GenerationRequest,
    onProgress?: (p: GenerationProgress) => void,
  ): Promise<GenerationResult> {
    if (!this.isConfigured()) {
      throw new Error('Custom провайдер не настроен: задайте VITE_CUSTOM_API_BASE_URL')
    }

    onProgress?.({ status: 'running', progress: 0.3, message: 'Генерация на сервере СОК' })

    const res = await fetch(`${this.base.replace(/\/$/, '')}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.key ? { Authorization: `Bearer ${this.key}` } : {}),
      },
      body: JSON.stringify(req),
    })

    if (!res.ok) {
      throw new Error(`Бэкенд СОК вернул ошибку ${res.status}: ${await res.text()}`)
    }

    const data = (await res.json()) as { assets: GeneratedAsset[]; cost?: number }

    onProgress?.({ status: 'done', progress: 1, message: 'Готово' })
    return { assets: data.assets, cost: data.cost, provider: this.name }
  }
}
