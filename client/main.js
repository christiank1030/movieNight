
const body = document.querySelector('body')
const filters = document.getElementById('filterForm')
const search = document.getElementById('searchForm')
const yearInput = document.getElementById('yearInput')
const genreInput = document.getElementById('genreInput')
const movieTitle = document.getElementById('titleInput')
const addButton = document.getElementById('addButton')
const homeLink = document.getElementById('homeLink')
const listLink = document.getElementById('listLink')
const pageOne = document.querySelector('.pageOne')
const pageTwo = document.querySelector('.pageTwo')
const genres = [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]



const showOne = () => {
    pageTwo.style.display='none'
    pageOne.style.display='flex'
}

const showTwo = () => {
    pageOne.style.display='none'
    pageTwo.style.display='flex'
    pageTwo.style.flexDirection='column'
    body.classList.remove('hasBackground')
    body.classList.add('noBackground')
    

    axios.get('/watchlist')
    .then(res => {
        makeWatchlist(res.data)
        markAsWatched()
        deleteMovie()
    })
}


const filterMovie = (event) => {
    event.preventDefault()

    let decade = yearInput.value 
    let genre = genreInput.value
    let genreID = ''
    for(let i = 0; i < genres.length; i++) {
        const { name, id } = genres[i]
        if(genre === name) {
            genreID = id
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
    movieTitle.value = ''
}

const displayMovie = (movieObj) => {
    const moviePoster = document.querySelector('.movieImg')
    const movieDisplay = document.querySelector('.movieDisplay')

    moviePoster.innerHTML = `<img class="moviePoster" src="https://image.tmdb.org/t/p/original${movieObj.poster_path}" alt="moviePoster">`
    movieDisplay.innerHTML = `<h4 id="movieTitle">${movieObj.title}</h4>
    <p id="movieOverview">${movieObj.overview}</p>
    <button onclick="addMovie()" id="addButton">Add to Watchlist</button>`
}

const addMovie = () => {
    const movieTitle = document.getElementById('movieTitle').textContent
    const movieOverview = document.getElementById('movieOverview').textContent
    const poster = document.querySelector(".moviePoster").src
    const addButton = document.getElementById('addButton')

    addButton.textContent = `${movieTitle} added to Watchlist!`

    const movie = {
        poster: poster,
        title: movieTitle,
        overview: movieOverview
    }

    axios.post(`/watchlist`, movie) 
    .then(res => {
        makeWatchlist(res.data)
    })
}

const makeWatchlist = (movie) => {
    const sampleCard = document.getElementById('sampleCard')
    for(let i = 0; i < movie.length; i++) {
        const { title, overview } = movie[i]
        sampleCard.innerHTML = ``

    const newMovie = document.createElement('div')
    newMovie.classList.add('movieCard')

    newMovie.innerHTML = `<h4 class="WLmovieTitle">${title}</h4>
    <p class="WLmovieOverview">${overview}</p>
    <button class="seenButton">Mark as Watched</button>
    <button class="deleteButton">Delete</button>`

    pageTwo.appendChild(newMovie)   
    }  
    
}

const markAsWatched = () => {
   let movieCard = document.querySelectorAll('.movieCard')

   for(let i = 0; i < movieCard.length; i++) {
        movieCard[i].querySelector('.seenButton').addEventListener('click', changeMovieCard)
   }
}

const changeMovieCard = (event) => {
    event.target.parentNode.classList.toggle('watched')
    event.target.parentNode.firstChild.classList.toggle('crossed')
    
    if(event.target.parentNode.classList.contains('watched') === true) {
        event.target.textContent = 'Mark as Unwatched'
    } else {
        event.target.textContent = 'Mark as Watched'
    }
}

const deleteMovie = () => {
    let movieCard = document.querySelectorAll('.movieCard')

    for(let i = 0; i < movieCard.length; i++) {
        const title = movieCard[i].querySelector('.WLmovieTitle')
        console.log(title)
        let deleteButton = title.parentNode.lastElementChild
        deleteButton.addEventListener('click', removeCard)
    }  
}

const removeCard = (event) => {
    let title = event.target.parentNode.firstChild.textContent

    
    axios.delete(`/watchlist/${title}`)
    .then(res => {
        event.target.parentNode.remove()
    })
}





filters.addEventListener('submit', filterMovie)
search.addEventListener('submit', searchMovie)