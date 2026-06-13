import type { GenerationProvider } from '../types'
import { MockProvider } from './mock'
import { OpenAIProvider } from './openai'
import { ReplicateProvider } from './replicate'
import { CustomProvider } from './custom'

// ===========================================================================
//  РЕЕСТР ПРОВАЙДЕРОВ НЕЙРОСЕТЕЙ
//  ---------------------------------------------------------------------------
//  Чтобы добавить новую нейросеть:
//    1. Создайте файл providers/<name>.ts с классом, реализующим
//       интерфейс GenerationProvider (см. types.ts).
//    2. Импортируйте его и добавьте в массив `ALL_PROVIDERS` ниже.
//    3. Добавьте ключи в .env.example.
//  Всё. UI автоматически подхватит провайдер.
// ===========================================================================

export const ALL_PROVIDERS: GenerationProvider[] = [
  new MockProvider(),
  new OpenAIProvider(),
  new ReplicateProvider(),
  new CustomProvider(),
]

const DEFAULT_PROVIDER = import.meta.env.VITE_GENERATION_PROVIDER ?? 'mock'

/** Возвращает активный провайдер: из .env, либо первый настроенный, либо mock. */
export function resolveProvider(name?: string): GenerationProvider {
  const wanted = name ?? DEFAULT_PROVIDER
  const byName = ALL_PROVIDERS.find((p) => p.name === wanted)
  if (byName && byName.isConfigured()) return byName

  // Фолбэк: первый настроенный реальный провайдер, иначе mock.
  const configured = ALL_PROVIDERS.find((p) => p.name !== 'mock' && p.isConfigured())
  return configured ?? ALL_PROVIDERS[0]
}

export function listProviders(): GenerationProvider[] {
  return ALL_PROVIDERS
}
