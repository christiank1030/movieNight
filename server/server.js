const express = require('express')
const cors = require('cors')

const { getHTML, getListHTML, addMovie } = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('client'))

app.get('/', getHTML)
app.get('/', getListHTML)
app.post('/watchlist', addMovie)

const port = process.env.PORT || 3000

app.listen(port, console.log(`Server running on ${port}`))