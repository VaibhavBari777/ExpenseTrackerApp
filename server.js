const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const path = require('path')
const connectDb = require("./config/connectDb")

dotenv.config()

//call Db
connectDb()
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
// routes
// app.get('/', (req,res)=>{
//     res.send("<h1>Hello from server</h1>")

// })
app.use('/api/v1/user' , require('./routes/userRoute'))

// transcation routes
//  Correct
app.use('/api/v1/transaction', require('./routes/transactionRoute'))

// static files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})


const PORT = process.env.PORT || 8080
app.listen(PORT , ()=>{
    console.log(`Server runnning on ${PORT}`)
})
