import express from 'express'
import { productsrouter } from './routes/products.js'
import { categoriesrouter } from './routes/categories.js'

const app = express()
// Read port from environment for deploy flexibility.
const PORT = Number(process.env.PORT) || 8000

app.use(express.static('public'))
app.use('/api', productsrouter)
app.use('/api', categoriesrouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
