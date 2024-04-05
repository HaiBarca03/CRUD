const express = require('express')
const Product = require('../models/productModel')
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controller/productController')
const router = express.Router()
// Read
router.get('/products', getProducts)
  // Read by ID
  router.get('/products/:id', getProduct)
  // Create
  router.post('/product', createProduct)
  // Update
  router.put('/products/:id', updateProduct)
  // Delete
  router.delete('/products/:id', deleteProduct)

module.exports = router