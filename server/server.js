const express = require('express')
const cors = require('cors')

const { getHTML } = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('client'))

app.get('/', getHTML)



const port = 3000

app.listen(port, console.log(`Server running on ${port}`))