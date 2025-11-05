const express = require('express')
const { addTransaction, getAllTransaction,editTransaction,deleteTransaction } = require('../controllers/transactionController')

// route object
const router = express.Router()

// add transaction (POST)
router.post('/add-transaction', addTransaction)

// Edit transaction (POST)
router.post('/edit-transaction', editTransaction)
// Delete transaction (POST)
router.post('/delete-transaction', deleteTransaction)

// get transactions (GET)
router.post('/get-transaction', getAllTransaction)

module.exports = router
