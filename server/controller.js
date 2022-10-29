const path = require('path')
const db = require('./db.json')
let globalID = 1


module.exports = {
    getHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    },
    
    getListHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/watchlist.html'));
    },

    addMovie: (req, res) => {
        console.log(req.body)
        const { title, overview, poster } = req.body
        let movie = {
            id: globalID,
            poster,
            title,
            overview
        }
        db.push(movie)
        globalID++
        res.send(movie)
    }
}