import { useCallback, useState } from 'react'
import { generate } from '@/lib/api/client'
import type {
  GeneratedAsset,
  GenerationProgress,
  GenerationRequest,
} from '@/lib/api/types'

interface State {
  progress: GenerationProgress
  assets: GeneratedAsset[]
  error: string | null
}

const IDLE: GenerationProgress = { status: 'idle', progress: 0 }

/**
 * Хук-обёртка над слоем API для студии.
 * Хранит прогресс, накопленные ассеты и ошибки.
 */
export function useGeneration() {
  const [state, setState] = useState<State>({ progress: IDLE, assets: [], error: null })

  const run = useCallback(async (req: GenerationRequest) => {
    setState((s) => ({ ...s, error: null, progress: { status: 'queued', progress: 0 } }))
    try {
      const result = await generate(req, (p) =>
        setState((s) => ({ ...s, progress: p })),
      )
      setState((s) => ({
        ...s,
        // Новые результаты — наверх ленты.
        assets: [...result.assets, ...s.assets],
        progress: { status: 'done', progress: 1 },
      }))
      return result
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Неизвестная ошибка генерации'
      setState((s) => ({ ...s, error: message, progress: { status: 'error', progress: 0 } }))
      return null
    }
  }, [])

  const clear = useCallback(() => setState({ progress: IDLE, assets: [], error: null }), [])

  return { ...state, run, clear }
}
