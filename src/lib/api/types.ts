// ===========================================================================
//  Контракты слоя генерации.
//  Любой провайдер нейросети реализует интерфейс `GenerationProvider`.
//  Это единственное место, которое нужно знать UI — конкретный провайдер
//  подставляется в src/lib/api/providers/index.ts.
// ===========================================================================

/** Режимы работы сервиса (соответствуют инструментам на лендинге). */
export type GenerationMode =
  | 'funnel' // Фотоворонка: фронт + ракурсы + детали
  | 'covers' // Обложки ×5 для A/B-теста CTR
  | 'infographic' // Инфографика и текст на кадр
  | 'video' // Видео-обложка
  | 'analysis' // Анализ выдачи + автогенерация

/** Стили съёмки для режима «Фотоворонка». Можно комбинировать. */
export type ShootingStyle = 'studio' | 'pinterest' | 'image' | 'brand'

/** Целевая площадка — влияет на пропорции и подачу. */
export type Marketplace = 'wildberries' | 'ozon' | 'yandex' | 'universal'

/** Категория товара — подсказка модели по антуражу. */
export type ProductCategory =
  | 'clothing'
  | 'cosmetics'
  | 'electronics'
  | 'home'
  | 'jewelry'
  | 'food'
  | 'other'

export interface GenerationRequest {
  /** Текстовый промт пользователя из поля ввода в студии. */
  prompt: string
  mode: GenerationMode
  /** Для фотоворонки — набор выбранных стилей (комбинируются). */
  styles?: ShootingStyle[]
  marketplace?: Marketplace
  category?: ProductCategory
  /** Сколько кадров сгенерировать. */
  count?: number
  /** Соотношение сторон, напр. "3:4" (карточка WB), "1:1". */
  aspectRatio?: string
  /** Референсные фото товара, загруженные пользователем (data URL / URL). */
  referenceImages?: string[]
  /** Сид для воспроизводимости. */
  seed?: number
}

export interface GeneratedAsset {
  id: string
  url: string
  /** Превью для быстрой отрисовки в гриде (может совпадать с url). */
  thumbnailUrl?: string
  /** Тип ассета. */
  kind: 'image' | 'video'
  prompt: string
  mode: GenerationMode
  styles?: ShootingStyle[]
  width?: number
  height?: number
  createdAt: number
}

export interface GenerationResult {
  assets: GeneratedAsset[]
  /** Реальная стоимость генерации в кредитах/рублях, если провайдер вернул. */
  cost?: number
  provider: string
}

export type GenerationStatus = 'idle' | 'queued' | 'running' | 'done' | 'error'

export interface GenerationProgress {
  status: GenerationStatus
  /** 0..1 */
  progress: number
  message?: string
}

/**
 * Интерфейс провайдера нейросети.
 * Чтобы подключить новую модель — реализуйте этот интерфейс
 * и зарегистрируйте провайдер в providers/index.ts.
 */
export interface GenerationProvider {
  /** Машинное имя провайдера, напр. "openai", "replicate". */
  readonly name: string
  /** Человекочитаемое имя для UI. */
  readonly label: string
  /** Доступен ли провайдер (есть ли ключ и т.п.). */
  isConfigured(): boolean
  /**
   * Запускает генерацию. Если передан onProgress — провайдер должен
   * сообщать о прогрессе (для долгих задач с поллингом).
   */
  generate(
    req: GenerationRequest,
    onProgress?: (p: GenerationProgress) => void,
  ): Promise<GenerationResult>
}
