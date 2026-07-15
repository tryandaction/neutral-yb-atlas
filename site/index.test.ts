// @vitest-environment node

import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'

test('declares a site favicon instead of relying on the missing browser default', () => {
  const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8')

  expect(html).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />')
})
