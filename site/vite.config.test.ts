// @vitest-environment node

import { expect, test } from 'vitest'
import { resolveBasePath } from './vite.config'

test('rejects a malformed Cloudflare base path instead of emitting broken asset URLs', () => {
  const malformedBasePath =
    '/VITE_REPOSITORY_URL=https://github.com/tryandaction/neutral-yb-atlas'

  expect(resolveBasePath(malformedBasePath)).toBe('./')
})
