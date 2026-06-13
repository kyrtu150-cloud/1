import type {
  GenerationMode,
  Marketplace,
  ProductCategory,
  ShootingStyle,
} from '@/lib/api/types'

export interface ModeDef {
  id: GenerationMode | 'ugc'
  icon: string
  label: string
  hint: string
  soon?: boolean
  /** Доступен ли выбор стилей съёмки. */
  styles?: boolean
  defaultCount: number
}

export const MODES: ModeDef[] = [
  { id: 'funnel', icon: '◐', label: 'Фотоворонка', hint: 'Фронт, ракурсы, детали', styles: true, defaultCount: 6 },
  { id: 'covers', icon: '⬡', label: 'Обложки ×5', hint: 'A/B-тест главного фото', defaultCount: 5 },
  { id: 'infographic', icon: '▤', label: 'Инфографика', hint: 'Текст и выноски', defaultCount: 4 },
  { id: 'video', icon: '▶', label: 'Видео-обложка', hint: 'Динамика для CTR', defaultCount: 2 },
  { id: 'analysis', icon: '◎', label: 'Анализ выдачи', hint: 'Автомат под конкурентов', defaultCount: 6 },
  { id: 'ugc', icon: '✦', label: 'UGC-видео', hint: 'Внешняя реклама', soon: true, defaultCount: 1 },
]

export const STYLES: { id: ShootingStyle; label: string; desc: string }[] = [
  { id: 'studio', label: 'Студия', desc: 'Чистый фон, контролируемый свет' },
  { id: 'pinterest', label: 'Pinterest', desc: 'Lifestyle, естественный свет' },
  { id: 'image', label: 'Имиджевая', desc: 'Кинематографичная подача' },
  { id: 'brand', label: 'Бренд', desc: 'Айдентика и фирменные акценты' },
]

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'clothing', label: 'Одежда' },
  { id: 'cosmetics', label: 'Косметика' },
  { id: 'electronics', label: 'Электроника' },
  { id: 'jewelry', label: 'Украшения' },
  { id: 'home', label: 'Дом' },
  { id: 'other', label: 'Другое' },
]

export const MARKETPLACES: { id: Marketplace; label: string; ratio: string }[] = [
  { id: 'wildberries', label: 'Wildberries', ratio: '3:4' },
  { id: 'ozon', label: 'Ozon', ratio: '3:4' },
  { id: 'yandex', label: 'Я.Маркет', ratio: '1:1' },
  { id: 'universal', label: 'Универсал', ratio: '3:4' },
]

/** Готовые подсказки промта по категориям — ускоряют старт. */
export const PROMPT_PRESETS = [
  'Кроссовки на светлом подиуме, мягкий студийный свет, акцент на текстуре',
  'Платье на модели, естественная поза, тёплый дневной свет у окна',
  'Флакон сыворотки на мраморе, капли влаги, свежесть, премиальная подача',
  'Беспроводные наушники, минимализм, графитовый фон, блики на корпусе',
]
