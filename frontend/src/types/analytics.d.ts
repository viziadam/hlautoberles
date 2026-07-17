export {}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (
      command: string,
      target: string | Date,
      parameters?: Record<string, unknown>,
    ) => void
    clarity?: {
      (...args: unknown[]): void
      q?: unknown[][]
    }
  }
}
