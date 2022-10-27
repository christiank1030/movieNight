module.exports = {
    getHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../client/index.html'));
    },

    filterMovie: (req, res) => {
        res.status(200).send(res.data)
    },
}