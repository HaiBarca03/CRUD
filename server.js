require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./router/productRouter')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND

var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/api', productRoute)
app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
//connect db
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected!')
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`)
    })
  })
  
  .catch((error) => console.log(error))