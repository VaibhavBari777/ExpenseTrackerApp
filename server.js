const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const path = require('path')
const connectDb = require("./config/connectDb")

dotenv.config()
connectDb()

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/api/v1/user', require('./routes/userRoute'))
app.use('/api/v1/transaction', require('./routes/transactionRoute'))

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname1, 'client', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running successfully 🚀');
  });
}
// ------------------------------------------------

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
