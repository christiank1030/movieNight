require("dotenv").config();
const Sequelize = require("sequelize");

const { CONNECTION_STRING } = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
  })

const path = require('path');


module.exports = {
    getHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    },

    addMovie: (req, res) => {
        const { title, overview, poster } = req.body

        sequelize.query(`
        INSERT INTO movies (title, overview)
        VALUES ('${title}', '${overview}')
        `)
        .then(dbRes => { 
            res.status(200).send(dbRes[0])})
    },

    showTwo: (req, res) => {
        sequelize.query(`
        SELECT title, overview
        FROM movies
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
    },

    removeCard: (req, res) => {
        let { title } = req.params
        console.log(title)
        
        sequelize.query(`
        DELETE  
        FROM movies
        WHERE title = '${title}'
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
    }
}