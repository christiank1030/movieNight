const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { getHTML, addMovie, showTwo, removeCard } = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('client'))

app.get('/', getHTML)
app.post('/watchlist', addMovie)
app.get('/watchlist', showTwo)
app.delete('/watchlist/:title', removeCard)

const port = process.env.PORT || 3000

app.listen(port, console.log(`Server running on ${port}`))