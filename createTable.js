import fs from 'node:fs/promises'
import { getDBConnection } from './db/db.js'


async function createTable() {
    const db = await getDBConnection()
    const schema = await fs.readFile('db/schema.sql', 'utf8')
    await db.exec(schema)
    await db.close()
    console.log('Table created successfully')
}

createTable()