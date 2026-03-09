import fs from 'node:fs/promises'
import { getDBConnection } from './db/db.js'

async function runSingleMigration(db, filePath) {
  const existing = await db.get('SELECT name FROM applied_migrations WHERE name = ?', filePath)

  if (existing) {
    console.log(`Skipped: ${filePath} already applied`)
    return
  }

  const sql = await fs.readFile(filePath, 'utf8')
  await db.exec(sql)
  await db.run('INSERT INTO applied_migrations (name) VALUES (?)', filePath)
  console.log(`Applied: ${filePath}`)
}

async function runAllMigrations() {
  const db = await getDBConnection()

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS applied_migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `)

    const files = await fs.readdir('./migrations')
    const migrationFiles = files
      .filter((file) => file.endsWith('.sql'))
      .sort()
      .map((file) => `./migrations/${file}`)

    for (const filePath of migrationFiles) {
      await runSingleMigration(db, filePath)
    }
  } catch (error) {
    console.error('Migration failed:', error.message)
  } finally {
    await db.close()
  }
}

runAllMigrations()
