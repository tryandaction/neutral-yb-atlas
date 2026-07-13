import { readFile, readdir, stat } from 'node:fs/promises'
import { extname, isAbsolute, posix, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ignoredDirectories = new Set([
  '.git',
  '.superpowers',
  'dist',
  'node_modules',
  'tmp',
])

const forbiddenExtensions = new Set([
  '.7z',
  '.key',
  '.p12',
  '.pdf',
  '.pem',
  '.rar',
  '.zip',
])

const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.md',
  '.mjs',
  '.ts',
  '.tsx',
  '.txt',
  '.yaml',
  '.yml',
])

const secretPatterns = [
  { label: 'API key', pattern: /(?<![A-Za-z0-9])sk-[A-Za-z0-9_-]{20,}/ },
  { label: 'AWS access key', pattern: /AKIA[0-9A-Z]{16}/ },
  { label: 'private key', pattern: /BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY/ },
]

const validStatuses = new Set(['draft', 'reviewed', 'verified'])
const maxFileSize = 10 * 1024 * 1024

function issue(code, path, message) {
  return { code, path, message }
}

function repositoryPath(root, absolutePath) {
  return relative(root, absolutePath).split(sep).join('/')
}

function safeManifestPath(value) {
  if (typeof value !== 'string' || value.length === 0 || isAbsolute(value)) return false
  if (value.includes('\\')) return false
  const normalized = posix.normalize(value)
  return normalized !== '..' && !normalized.startsWith('../') && normalized === value
}

async function loadManifest(root, errors) {
  const manifestPath = resolve(root, 'knowledge', 'index.json')
  let manifest

  try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  } catch (error) {
    errors.push(issue('manifest-invalid', 'knowledge/index.json', error.message))
    return []
  }

  if (!Array.isArray(manifest)) {
    errors.push(issue('manifest-invalid', 'knowledge/index.json', 'Manifest root must be an array.'))
    return []
  }

  return manifest
}

async function validateManifest(root, manifest, errors) {
  const ids = new Set()
  const paths = new Set()

  for (const [index, entry] of manifest.entries()) {
    const label = `knowledge/index.json#${index}`
    if (!entry || typeof entry !== 'object') {
      errors.push(issue('entry-invalid', label, 'Manifest entry must be an object.'))
      continue
    }

    if (typeof entry.id !== 'string' || entry.id.length === 0) {
      errors.push(issue('id-invalid', label, 'Entry id must be a non-empty string.'))
    } else if (ids.has(entry.id)) {
      errors.push(issue('id-duplicate', label, `Duplicate id: ${entry.id}`))
    } else {
      ids.add(entry.id)
    }

    if (!safeManifestPath(entry.path)) {
      errors.push(issue('path-invalid', label, 'Entry path must be a normalized repository-relative path.'))
      continue
    }

    if (paths.has(entry.path)) {
      errors.push(issue('path-duplicate', label, `Duplicate path: ${entry.path}`))
    } else {
      paths.add(entry.path)
    }

    if (!validStatuses.has(entry.status)) {
      errors.push(issue('status-invalid', entry.path, `Unsupported status: ${entry.status}`))
    }

    if (!Array.isArray(entry.sources)) {
      errors.push(issue('sources-invalid', entry.path, 'Sources must be an array.'))
    } else if (entry.status !== 'draft' && entry.sources.length === 0) {
      errors.push(issue('sources-required', entry.path, `${entry.status} content requires at least one source.`))
    }

    const absolutePath = resolve(root, ...entry.path.split('/'))
    if (absolutePath !== root && !absolutePath.startsWith(`${root}${sep}`)) {
      errors.push(issue('path-invalid', entry.path, 'Entry path escapes the repository root.'))
      continue
    }

    try {
      await stat(absolutePath)
    } catch {
      errors.push(issue('missing-path', entry.path, 'Manifest path does not exist.'))
    }
  }
}

async function scanDirectory(root, directory, allowedLargeFiles, errors) {
  const entries = await readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    const absolutePath = resolve(directory, entry.name)
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        await scanDirectory(root, absolutePath, allowedLargeFiles, errors)
      }
      continue
    }

    if (!entry.isFile() || entry.name.endsWith('.log')) continue

    const path = repositoryPath(root, absolutePath)
    const extension = extname(entry.name).toLowerCase()
    if (forbiddenExtensions.has(extension)) {
      errors.push(issue('forbidden-file', path, `Forbidden public file type: ${extension}`))
      continue
    }

    const metadata = await stat(absolutePath)
    if (metadata.size > maxFileSize && !allowedLargeFiles.has(path)) {
      errors.push(issue('large-file', path, 'File exceeds the 10 MiB public limit.'))
    }

    if (!textExtensions.has(extension)) continue

    const content = await readFile(absolutePath, 'utf8')
    for (const secret of secretPatterns) {
      if (secret.pattern.test(content)) {
        errors.push(issue('secret-pattern', path, `${secret.label} pattern detected.`))
      }
    }
  }
}

export async function validateRepository(repositoryRoot) {
  const root = resolve(repositoryRoot)
  const errors = []
  const manifest = await loadManifest(root, errors)
  await validateManifest(root, manifest, errors)

  const allowedLargeFiles = new Set(
    manifest
      .filter((entry) => entry?.allowLargeFile === true && safeManifestPath(entry.path))
      .map((entry) => entry.path),
  )

  await scanDirectory(root, root, allowedLargeFiles, errors)
  return errors
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isMain) {
  const root = resolve(process.argv[2] ?? '.')
  const errors = await validateRepository(root)
  if (errors.length > 0) {
    for (const error of errors) {
      console.error(`[${error.code}] ${error.path}: ${error.message}`)
    }
    process.exitCode = 1
  } else {
    console.log('Public repository validation passed.')
  }
}
