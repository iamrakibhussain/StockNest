import path from 'node:path'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { fileURLToPath } from 'node:url'

export async function getDBConnection() {
    // Stable absolute path so DB does not change with current working directory.
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    // Allow overriding DB path via environment variable.
    const dbFileName = process.env.DB_PATH || 'database.db'
    const dbpath = path.isAbsolute(dbFileName)
        ? dbFileName
        : path.join(__dirname, '..', dbFileName)

    const db = await open({
        filename: dbpath,
        driver: sqlite3.Database
    })

    // Enforce foreign key constraints in SQLite.
    await db.exec('PRAGMA foreign_keys = ON;')

    return db
}
