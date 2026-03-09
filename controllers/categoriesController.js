import { getDBConnection } from "../db/db.js"

export async function getCategories(req, res) {
    const db =await getDBConnection()
    try {
        const categories = await db.all('SELECT * FROM categories')
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch categories' })
    }
    finally{
        await db.close()
    }
}