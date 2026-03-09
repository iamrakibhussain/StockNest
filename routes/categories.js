import express from 'express'
import { getCategories } from '../controllers/categoriesController.js'


export const categoriesrouter= express.Router()

categoriesrouter.get('/categories',getCategories)