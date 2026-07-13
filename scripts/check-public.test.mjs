import assert from 'node:assert/strict'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { validateRepository } from './check-public.mjs'

async function withRepository(run) {
  const root = await mkdtemp(join(tmpdir(), 'neutral-yb-public-'))
  try {
    await mkdir(join(root, 'knowledge', 'concepts'), { recursive: true })
    await run(root)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
}

async function writeManifest(root, entries) {
  await writeFile(
    join(root, 'knowledge', 'index.json'),
    `${JSON.stringify(entries, null, 2)}\n`,
    'utf8',
  )
}

function entry(overrides = {}) {
  return {
    id: 'test-note',
    path: 'knowledge/concepts/test.md',
    title: 'Test note',
    language: 'en',
    status: 'draft',
    scope: 'Validator fixture.',
    lastReviewed: null,
    sources: [],
    license: 'CC-BY-4.0',
    provenance: 'Test fixture',
    reviewers: [],
    ...overrides,
  }
}

test('rejects forbidden PDF and ZIP files', async () => {
  await withRepository(async (root) => {
    await writeManifest(root, [])
    await writeFile(join(root, 'paper.pdf'), 'pdf')
    await writeFile(join(root, 'archive.zip'), 'zip')

    const errors = await validateRepository(root)

    assert.equal(errors.filter((error) => error.code === 'forbidden-file').length, 2)
  })
})

test('rejects manifest entries whose files do not exist', async () => {
  await withRepository(async (root) => {
    await writeManifest(root, [entry({ path: 'knowledge/concepts/missing.md' })])

    const errors = await validateRepository(root)

    assert.ok(errors.some((error) => error.code === 'missing-path'))
  })
})

test('requires sources before reviewed or verified status', async () => {
  await withRepository(async (root) => {
    await writeFile(join(root, 'knowledge', 'concepts', 'test.md'), '# Test\n')
    await writeManifest(root, [entry({ status: 'reviewed' })])

    const errors = await validateRepository(root)

    assert.ok(errors.some((error) => error.code === 'sources-required'))
  })
})

test('allows draft entries with an empty source list', async () => {
  await withRepository(async (root) => {
    await writeFile(join(root, 'knowledge', 'concepts', 'test.md'), '# Test\n')
    await writeManifest(root, [entry()])

    const errors = await validateRepository(root)

    assert.deepEqual(errors, [])
  })
})

test('does not flag identifiers that contain sk- inside a word', async () => {
  await withRepository(async (root) => {
    await writeManifest(root, [])
    await writeFile(
      join(root, 'fixture.ts'),
      "const id = 'atlas-correction-mask-uv-fiber-term'\n",
    )

    const errors = await validateRepository(root)

    assert.deepEqual(errors, [])
  })
})

test('rejects a standalone long API key pattern', async () => {
  await withRepository(async (root) => {
    await writeManifest(root, [])
    const syntheticKey = ['sk', 'synthetic_1234567890_ABCDEF'].join('-')
    await writeFile(join(root, 'fixture.txt'), `token=${syntheticKey}\n`)

    const errors = await validateRepository(root)

    assert.ok(errors.some((error) => error.code === 'secret-pattern'))
  })
})
