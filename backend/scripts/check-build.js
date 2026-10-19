import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const backendDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceFiles = []

function collectJavaScriptFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist') continue

    const entryPath = join(directory, entry.name)
    if (entry.isDirectory()) collectJavaScriptFiles(entryPath)
    else if (entry.isFile() && entry.name.endsWith('.js')) sourceFiles.push(entryPath)
  }
}

collectJavaScriptFiles(backendDirectory)

const importPattern = /\b(?:from\s*|import\s*)['"]([^'"]+)['"]/g
const missingImports = []

for (const sourceFile of sourceFiles) {
  const source = readFileSync(sourceFile, 'utf8')
  for (const match of source.matchAll(importPattern)) {
    const specifier = match[1]
    if (!specifier.startsWith('.')) continue

    const importedPath = resolve(dirname(sourceFile), specifier)
    if (!existsSync(importedPath)) {
      missingImports.push(`${sourceFile}: ${specifier}`)
    }
  }

  const result = spawnSync(process.execPath, ['--check', sourceFile], { encoding: 'utf8' })
  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout)
    process.exit(result.status || 1)
  }
}

if (missingImports.length) {
  console.error('Unresolved local imports:')
  for (const missingImport of missingImports) console.error(` - ${missingImport}`)
  process.exit(1)
}

console.log(`[SECOFRATE] Build checks passed for ${sourceFiles.length} JavaScript files and their local imports.`)
