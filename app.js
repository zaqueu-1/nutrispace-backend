const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const conn = require('./backend/db/conn')
conn();

const routes = require('./backend/routes/router')

app.use('/api', routes)

app.listen(3001, function() {
    console.log('🪓')
})
