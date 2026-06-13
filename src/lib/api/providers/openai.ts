import type {
  GenerationProvider,
  GenerationProgress,
  GenerationRequest,
  GenerationResult,
  GeneratedAsset,
} from '../types'
import { buildPrompt } from '../prompt'

/**
 * Провайдер для OpenAI Images API (или любого OpenAI-совместимого эндпоинта).
 *
 * ПОДКЛЮЧЕНИЕ:
 *   1. Заполните в .env:
 *        VITE_GENERATION_PROVIDER=openai
 *        VITE_OPENAI_API_KEY=sk-...
 *        VITE_OPENAI_BASE_URL=https://api.openai.com/v1   (или совместимый)
 *        VITE_OPENAI_IMAGE_MODEL=gpt-image-1
 *   2. Перезапустите dev-сервер.
 *
 * ВНИМАНИЕ ПО БЕЗОПАСНОСТИ: ключ в VITE_* попадает в браузерный бандл.
 * Для продакшена проксируйте запросы через свой бэкенд (см. providers/custom.ts)
 * и не кладите секретные ключи во фронтенд.
 */
export class OpenAIProvider implements GenerationProvider {
  readonly name = 'openai'
  readonly label = 'OpenAI Images'

  private apiKey = import.meta.env.VITE_OPENAI_API_KEY ?? ''
  private baseUrl = import.meta.env.VITE_OPENAI_BASE_URL ?? 'https://api.openai.com/v1'
  private model = import.meta.env.VITE_OPENAI_IMAGE_MODEL ?? 'gpt-image-1'

  isConfigured(): boolean {
    return Boolean(this.apiKey)
  }

  async generate(
    req: GenerationRequest,
    onProgress?: (p: GenerationProgress) => void,
  ): Promise<GenerationResult> {
    if (!this.isConfigured()) {
      throw new Error('OpenAI провайдер не настроен: задайте VITE_OPENAI_API_KEY')
    }
    onProgress?.({ status: 'running', progress: 0.2, message: 'Запрос к OpenAI' })

    const res = await fetch(`${this.baseUrl}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        prompt: buildPrompt(req),
        n: req.count ?? 4,
        size: aspectToSize(req.aspectRatio),
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`OpenAI API ошибка ${res.status}: ${text}`)
    }

    const data = (await res.json()) as {
      data: Array<{ url?: string; b64_json?: string }>
    }

    const assets: GeneratedAsset[] = data.data.map((item, i) => ({
      id: `openai_${Date.now()}_${i}`,
      url: item.url ?? `data:image/png;base64,${item.b64_json}`,
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

function aspectToSize(aspect?: string): string {
  switch (aspect) {
    case '1:1':
      return '1024x1024'
    case '16:9':
      return '1536x1024'
    case '3:4':
    case '9:16':
    default:
      return '1024x1536' // вертикаль под карточку маркетплейса
  }
}
