import type { GenerationRequest, ShootingStyle } from './types'

/**
 * Сборка финального промта для нейросети из пользовательского ввода
 * и выбранных параметров (стиль, категория, площадка).
 *
 * Здесь живёт «экспертиза» сервиса: пресеты стилей съёмки — это не шаблоны,
 * а наборы модификаторов атмосферы, света и антуража, которые комбинируются.
 */

const STYLE_MODIFIERS: Record<ShootingStyle, string> = {
  studio:
    'professional studio product photography, seamless backdrop, controlled softbox lighting, crisp shadows, high detail, commercial catalog look',
  pinterest:
    'aesthetic lifestyle scene, natural window light, cozy props, muted editorial color grading, Pinterest and Instagram mood, shallow depth of field',
  image:
    'high-fashion image campaign, dramatic cinematic lighting, bold composition, premium magazine editorial, strong atmosphere',
  brand:
    'consistent brand visual identity, branded color accents, clean confident styling, modern minimal art direction',
}

const CATEGORY_HINTS: Record<string, string> = {
  clothing: 'garment worn by a realistic human model, natural pose, accurate fabric drape and fit',
  cosmetics: 'cosmetic product with clean reflections, fresh textures, spa-like freshness',
  electronics: 'electronic gadget, sleek surfaces, accurate materials, tech presentation',
  home: 'home goods styled in a real interior, lived-in but tidy scene',
  jewelry: 'jewelry close-up, sparkling highlights, luxury macro detail',
  food: 'appetizing food styling, fresh ingredients, natural appetizing light',
  other: '',
}

export function buildPrompt(req: GenerationRequest): string {
  const parts: string[] = []

  // Пользовательский промт — ядро запроса.
  if (req.prompt.trim()) parts.push(req.prompt.trim())

  // Подсказка по категории.
  if (req.category && CATEGORY_HINTS[req.category]) {
    parts.push(CATEGORY_HINTS[req.category])
  }

  // Комбинируем выбранные стили съёмки.
  if (req.styles?.length) {
    parts.push(req.styles.map((s) => STYLE_MODIFIERS[s]).join(', '))
  }

  // Подсказки по режиму.
  switch (req.mode) {
    case 'covers':
      parts.push('front-facing hero shot for marketplace main image, eye-catching, high CTR composition')
      break
    case 'funnel':
      parts.push('cohesive product funnel: front view, multiple angles, and detail close-ups in one consistent location')
      break
    case 'infographic':
      parts.push('clean layout with space for infographic captions and feature callouts')
      break
    case 'analysis':
      parts.push('stand out from competitor search results, distinct and contrasting against typical listings')
      break
  }

  parts.push('ultra realistic, 8k, sharp focus, e-commerce marketplace ready')

  return parts.filter(Boolean).join('. ')
}
