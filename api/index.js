require('dotenv').config()
const express = require('express')
const cors = require('cors')
const conn = require('./db/conn')
const routes = require('./routes/router')

const app = express()

app.use(cors())
app.use(express.json())

conn()

app.use('/api', routes)

app.listen(9001, function() {
    console.log('🪓')
})


