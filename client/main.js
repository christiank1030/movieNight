const filters = document.getElementById('filterForm')
const search = document.getElementById('searchForm')
const yearInput = document.getElementById('yearInput')
const genreInput = document.getElementById('genreInput')
const movieTitle = document.getElementById('titleInput')


const filterMovie = (event) => {
    event.preventDefault()

    let decade = yearInput.value 
    let genre = genreInput.value
    let genreID = ''

    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=13e1065e563f4384c1780689bbaa8897`)
    .then(res => {
        const { genres } = res.data
        for(let i = 0; i < genres.length; i++) {
            const { name, id } = genres[i]
            if(genre === name) {
                genreID = id
                console.log(genreID)
                axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=13e1065e563f4384c1780689bbaa8897&language=en-US&with_genres=${genreID}&primary_release_year=${decade}`)
                .then(res => {
                    const { results } = res.data
                    let randomMovie = results[Math.floor(Math.random() * results.length)]
                    let { title, overview, poster_path } = randomMovie
                    let movieObj = {
                        poster_path,
                        title,
                        overview
                    }
                    displayMovie(movieObj)
                })
            }
        }
    })
    
    yearInput.value = ''
    genreInput.value = ''
}

const searchMovie = (event) => {
    event.preventDefault()

    let title = movieTitle.value

    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=13e1065e563f4384c1780689bbaa8897&query=${title}`)
    .then(res => {
        const { results } = res.data
        let movieResult = results[0]
        let { title, overview, poster_path } = movieResult
        let movieObj = {
            poster_path,
            title,
            overview
        }
        displayMovie(movieObj)
    })
}

const displayMovie = (movieObj) => {
    const moviePoster = document.querySelector('.movieImg')
    const movieTitle = document.getElementById('movieTitle')
    const movieOverview = document.getElementById('movieOverview')
    const addButton = document.createElement('button')
    const movieDisplay = document.querySelector('.movieDisplay')

    moviePoster.innerHTML = `<img class="moviePoster" src="https://image.tmdb.org/t/p/original${movieObj.poster_path}" alt="moviePoster">`
    movieDisplay.innerHTML = `<h4 id="movieTitle">${movieObj.title}</h4>
    <p id="movieOverview">${movieObj.overview}</p>
    <button id="addButton">Add to Watchlist</button>`
}


filters.addEventListener('submit', filterMovie)
search.addEventListener('submit', searchMovie)