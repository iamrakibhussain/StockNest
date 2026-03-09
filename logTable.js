import { getDBConnection } from './db/db.js'

async function viewAllProducts() {
    const db = await getDBConnection()
    const products = await db.all('SELECT * FROM products');
    console.table(products);
    await db.close()

}
viewAllProducts()