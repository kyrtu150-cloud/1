/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GENERATION_PROVIDER?: string
  readonly VITE_OPENAI_API_KEY?: string
  readonly VITE_OPENAI_BASE_URL?: string
  readonly VITE_OPENAI_IMAGE_MODEL?: string
  readonly VITE_REPLICATE_API_TOKEN?: string
  readonly VITE_REPLICATE_MODEL?: string
  readonly VITE_CUSTOM_API_BASE_URL?: string
  readonly VITE_CUSTOM_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
