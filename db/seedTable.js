import { getCategoriesData } from '../services/categoriesService.js'
import { getProductsData } from '../services/productsService.js'
import { getDBConnection } from './db.js'

async function categoriesSeedDatabase() {
    const db = await getDBConnection()
    const categories = getCategoriesData()

    try {
        await db.exec('BEGIN TRANSACTION')
        for (const { id, name } of categories) {
            // Rerun-safe: duplicates are ignored on repeated seeding.
            await db.run('INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)', [id, name])
        }
        await db.exec('COMMIT')
        console.log('Categories seeded successfully.')
    } catch (err) {
        console.error('Error occurred while seeding categories:', { details: err.message })
        await db.exec('ROLLBACK')
    } finally {
        await db.close()
    }
}

async function productsSeedDatabase() {
    const db = await getDBConnection()
    const products = getProductsData()

    try {
        await db.exec('BEGIN TRANSACTION')
        for (const { id, category_id, name, image, description, buy_price, sale_price, stock } of products) {
            // Standard upsert: update existing row when id already exists.
            await db.run(
                `INSERT INTO products (id, category_id, name, image, description, buy_price, sale_price, stock)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                 ON CONFLICT(id) DO UPDATE SET
                   category_id = excluded.category_id,
                   name = excluded.name,
                   image = excluded.image,
                   description = excluded.description,
                   buy_price = excluded.buy_price,
                   sale_price = excluded.sale_price,
                   stock = excluded.stock`,
                [id, category_id, name, image, description, buy_price, sale_price, stock]
            )
        }
        await db.exec('COMMIT')
        console.log('Products seeded successfully.')
    } catch (err) {
        console.error('Error occurred while seeding products:', { details: err.message })
        await db.exec('ROLLBACK')
    } finally {
        await db.close()
    }
}

export async function seedDatabase() {
    await categoriesSeedDatabase()
    await productsSeedDatabase()
    console.log('Database seeding completed.')
}
seedDatabase()
