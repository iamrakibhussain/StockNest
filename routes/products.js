import express from 'express'
import { getProducts } from '../controllers/productsControllers.js'
import {getProductsByCategory} from '../controllers/productsControllers.js'
import {getProductsByName} from '../controllers/productsControllers.js'
export const productsrouter= express.Router()

productsrouter.get('/products',getProducts)
productsrouter.get('/categories/:categoryId/products', getProductsByCategory)
productsrouter.get('/products/search',getProductsByName)
