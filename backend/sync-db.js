import dotenv from 'dotenv'
import { spawn } from 'node:child_process'
import { mkdtemp, chmod, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

dotenv.config()

const replaceExisting = process.argv.includes('--replace')

function parseDatabaseUrl(value, name) {
  if (!value) {
    throw new Error(`${name} is not set in backend/.env`)
  }

  let url
  try {
    // Accept JDBC-style PostgreSQL URLs as well as standard PostgreSQL URLs.
    url = new URL(value.replace(/^jdbc:/i, ''))
  } catch {
    throw new Error(`${name} must be a valid PostgreSQL connection URL`)
  }

  if (!['postgres:', 'postgresql:'].includes(url.protocol)) {
    throw new Error(`${name} must use the postgres or postgresql protocol`)
  }

  const database = decodeURIComponent(url.pathname.replace(/^\//, ''))
  if (!url.hostname || !database) {
    throw new Error(`${name} must include a database host and database name`)
  }

  return {
    host: url.hostname,
    port: url.port || '5432',
    database,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    sslmode: url.searchParams.get('sslmode') || undefined,
  }
}

function escapePassfileField(value) {
  return String(value).replaceAll('\\', '\\\\').replaceAll(':', '\\:')
}

function passfileLine(connection) {
  return [connection.host, connection.port, connection.database, connection.user, connection.password]
    .map(escapePassfileField)
    .join(':')
}

function commandEnvironment(connection, passfile) {
  const env = {
    PATH: process.env.PATH || '',
    PGPASSFILE: passfile,
  }
  if (process.env.SystemRoot) env.SystemRoot = process.env.SystemRoot
  env.PGHOST = connection.host
  env.PGPORT = connection.port
  env.PGDATABASE = connection.database
  env.PGUSER = connection.user
  if (connection.sslmode) env.PGSSLMODE = connection.sslmode
  else delete env.PGSSLMODE
  return env
}

function runPipedDump(source, target, passfile) {
  return new Promise((resolve, reject) => {
    const dump = spawn('pg_dump', [
      '--format=custom',
      '--no-owner',
      '--no-privileges',
      '--host', source.host,
      '--port', source.port,
      '--username', source.user,
      '--dbname', source.database,
    ], { env: commandEnvironment(source, passfile), stdio: ['ignore', 'pipe', 'pipe'] })

    const restoreArgs = [
      '--no-owner',
      '--no-privileges',
      '--exit-on-error',
      '--single-transaction',
      '--dbname', target.database,
      '--host', target.host,
      '--port', target.port,
      '--username', target.user,
    ]

    if (replaceExisting) restoreArgs.push('--clean', '--if-exists')

    const restore = spawn('pg_restore', restoreArgs, {
      env: commandEnvironment(target, passfile),
      stdio: ['pipe', 'ignore', 'pipe'],
    })

    let dumpErrors = ''
    let restoreErrors = ''
    dump.stderr.setEncoding('utf8').on('data', (chunk) => { dumpErrors += chunk })
    restore.stderr.setEncoding('utf8').on('data', (chunk) => { restoreErrors += chunk })

    let dumpResult
    let restoreResult
    let spawnError

    dump.on('error', (error) => { spawnError ??= error })
    restore.on('error', (error) => { spawnError ??= error })
    dump.on('close', (code, signal) => {
      dumpResult = { code, signal }
      if (code !== 0) restore.stdin.destroy()
      finish()
    })
    restore.on('close', (code, signal) => {
      restoreResult = { code, signal }
      if (code !== 0) dump.kill('SIGTERM')
      finish()
    })

    dump.stdout.pipe(restore.stdin)
    dump.stdout.on('error', (error) => { spawnError ??= error })
    restore.stdin.on('error', (error) => {
      // A restore failure can close its input before pg_dump finishes writing.
      if (!['EPIPE', 'ERR_STREAM_DESTROYED'].includes(error.code)) spawnError ??= error
    })

    function finish() {
      if (!dumpResult || !restoreResult) return
      if (spawnError) return reject(spawnError)
      if (dumpResult.code !== 0) {
        return reject(new Error(`pg_dump failed${dumpErrors.trim() ? `: ${dumpErrors.trim()}` : ''}`))
      }
      if (restoreResult.code !== 0) {
        return reject(new Error(`pg_restore failed${restoreErrors.trim() ? `: ${restoreErrors.trim()}` : ''}`))
      }
      resolve()
    }
  })
}

async function main() {
  const source = parseDatabaseUrl(process.env.DATABASE_URL_LOCAL, 'DATABASE_URL_LOCAL')
  const target = parseDatabaseUrl(process.env.DATABASE_URL_PROD, 'DATABASE_URL_PROD')

  source.user ||= process.env.DATABASE_USER || ''
  source.password ||= process.env.DATABASE_LOCAL_PASSWORD || ''
  target.user ||= process.env.DATABASE_USER || ''
  target.password ||= process.env.DATABASE_PROD_PASSWORD || ''

  if (!source.user || !source.password || !target.user || !target.password) {
    throw new Error('Database credentials are incomplete; check the local and production variables in backend/.env')
  }

  if (source.host === target.host && source.port === target.port && source.database === target.database) {
    throw new Error('Source and target resolve to the same database; refusing to sync')
  }

  if (!target.host.toLowerCase().endsWith('.neon.tech')) {
    throw new Error('DATABASE_URL_PROD does not point to a Neon host; refusing to sync')
  }

  if (replaceExisting) {
    console.warn('[SECOFRATE] --replace will drop conflicting objects in the Neon database before restoring them.')
  } else {
    console.log('[SECOFRATE] Existing objects in Neon will be preserved; conflicts will stop the restore.')
  }

  const tempDirectory = await mkdtemp(join(tmpdir(), 'secofrate-db-sync-'))
  const passfile = join(tempDirectory, 'pgpass')

  try {
    await writeFile(passfile, `${passfileLine(source)}\n${passfileLine(target)}\n`, { mode: 0o600 })
    await chmod(passfile, 0o600)

    console.log('[SECOFRATE] Streaming local database dump to Neon...')
    await runPipedDump(source, target, passfile)
    console.log('[SECOFRATE] Database sync completed successfully.')
  } finally {
    await rm(tempDirectory, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(`[SECOFRATE] Database sync failed: ${error.message}`)
  process.exitCode = 1
})
