import { getDBConnection } from '../db/db.js'

export async function getProducts(req, res) {
    // Open and close DB per request to avoid long-lived shared connection issues.
    const db = await getDBConnection()

    try {
        const products = await db.all('SELECT * FROM products')
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products' })
    } finally {
        await db.close()
    }
}

export async function getProductsByCategory(req, res) {
    const db = await getDBConnection()

    try {
        const categoryId = req.params.categoryId
        const products = await db.all('SELECT * FROM products WHERE category_id = ?', [categoryId])
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products by category' })
    } finally {
        await db.close()
    }
}

export async function getProductsByName(req, res) {
    const db = await getDBConnection()

    try {
        // Guard empty/invalid input so we do not run a meaningless LIKE query.
        const name = req.query.name?.trim()
        if (!name) {
            return res.status(400).json({ message: 'Query parameter "name" is required' })
        }

        const products = await db.all('SELECT * FROM products WHERE name LIKE ?', [`%${name}%`])
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products by name' })
    } finally {
        await db.close()
    }
}
