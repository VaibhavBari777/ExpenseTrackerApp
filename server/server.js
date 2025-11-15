const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const path = require('path');
const connectDb = require('./config/connectDb');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDb();

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// =========================
// API ROUTES
// =========================
app.use('/api/v1/transaction', require('./routes/transactionRoute'))
app.use('/api/v1/user', require('./routes/userRoute'))

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '../client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname1, '../client/build/index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API running successfully 🚀');
  });
}

// =========================
// SERVER START
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`.bgGreen.white);
});
