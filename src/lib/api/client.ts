import type {
  GenerationProgress,
  GenerationRequest,
  GenerationResult,
} from './types'
import { resolveProvider } from './providers'

/**
 * Единая точка входа для UI. Скрывает выбор провайдера.
 * Студия вызывает только generate() — какой нейросетью считать,
 * решает реестр провайдеров на основе .env и наличия ключей.
 */
export async function generate(
  req: GenerationRequest,
  onProgress?: (p: GenerationProgress) => void,
  providerName?: string,
): Promise<GenerationResult> {
  const provider = resolveProvider(providerName)
  return provider.generate(req, onProgress)
}

export function activeProviderInfo(providerName?: string) {
  const p = resolveProvider(providerName)
  return { name: p.name, label: p.label, configured: p.isConfigured() }
}

export * from './types'
