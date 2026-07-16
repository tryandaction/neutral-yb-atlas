import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const safeBasePathPattern = /^\/(?:[A-Za-z0-9._~-]+\/?)*$/

export function resolveBasePath(rawBasePath?: string) {
  const basePath = rawBasePath?.trim()

  if (!basePath || basePath === './') {
    return './'
  }

  if (!safeBasePathPattern.test(basePath)) {
    return './'
  }

  return basePath.endsWith('/') ? basePath : `${basePath}/`
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    base: resolveBasePath(env.VITE_BASE_PATH),
    plugins: [react()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
      fileParallelism: false,
      maxWorkers: 1,
      testTimeout: 30000,
    },
  }
})
