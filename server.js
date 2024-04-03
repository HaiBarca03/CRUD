const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Read
app.get('/products', async(req, res) => {
  try {
    const products= await Product.find({})
    res.status(200).json(products)
  } catch(error) {
    res.status(500).json({massage: error.massage})
  }
})
// Read by ID
app.get('/products/:id', async(req, res) => {
  try {
    const {id} = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch(error) {
    res.status(500).json({massage: error.massage})
  }
})
// Create
app.post('/product', async(req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch(error) {
      console.log(error.message)
      res.status(500).json({
        massage: error.massage
    })
  }
})
// Update
app.put('/products/:id', async(req, res) => {
  try {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    if(!product){
      return res.status(404).json({massage: 'cannot find product by ID'})
    }
    res.status(200).json(product)
  } catch(error) {
    console.log(error.message)
      res.status(500).json({
        massage: error.massage
    })
  }
})
// Delete
app.delete('/products/:id', async(req, res) => {
  try {
    const {id} = req.params
    const product = await Product.findByIdAndDelete(id, req.body)
    if(!product){
      return res.status(404).json({massage: 'cannot find product by ID'})
    }
      return res.status(200).json({massage: 'deleted !!!'})
  } catch(error) {
    console.log(error.message)
      res.status(500).json({
        massage: error.massage
    })
  }
})

//connect db
mongoose.connect('mongodb://127.0.0.1:27017/CRUD')
  .then(() => {
    console.log('Connected!')
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  })
  
  .catch((error) => console.log(error) )