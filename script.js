document.getElementById('searchButton').addEventListener('click', searchMovies)

//URLs
let apiKey = '587e1b1d60229730080c6a05bbf20c2a';
let url = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'

//Contenedor peliculas
let resultContainer = document.getElementById('results')

//Datos que aparecen despues
let voteAverage
let overview
let poster

//Buscar peliculas
function searchMovies() {
    resultContainer.innerHTML = 'Cargando...'
    let searchInput = document.getElementById('searchInput').value;

    fetch(`${url}?query=${searchInput}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(response => displayMovies(response.results))
}


//Mostrar peliculas
function displayMovies(movies) {
    resultContainer.innerHTML = ''

    if (movies.length === 0) {
        resultContainer.innerHTML = '<p> No se encontraron resultados</p>'
        return
    }

    movies.forEach(movie => {

        let movieDiv = document.createElement('div') //Contenedor
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')    //Titulo
        let year = movie.release_date.split("-")    //Año
        title.textContent = `${movie.title} (${year[0]})`

        let posterPath = urlImg + movie.poster_path   //URL del poster

        poster = document.createElement('img')  //Imagen de la pelicula
        poster.src = posterPath
        poster.classList.add('fff')

        //Agregando hijos iniciales
        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)

        //Creando y agregando hijos secundarios
        voteAverage = document.createElement('p')   //Votos del publico
        voteAverage.textContent = movie.vote_average.toString().substr(0, 3)

        overview = document.createElement('p')  //Descripción
        overview.textContent = movie.overview   
        overview.classList.add('overview')

        resultContainer.appendChild(movieDiv)
    });

    efectoPeliculas()
}


//Efecto de las peliculas
function efectoPeliculas() {
    let arrayPeliculas = document.querySelectorAll('.movie')
    let indice = 0;
    let arrayImagenes = document.querySelectorAll('.fff')  //Array de imagenes de peliculas

    arrayPeliculas.forEach(pelicula => {
        let imagen = arrayImagenes[indice]  //Imagen de la pelicula con focus
        indice++
        pelicula.addEventListener('mouseover', () => {
            imagen.setAttribute('hidden',true)
            pelicula.appendChild(overview)
            pelicula.appendChild(voteAverage)
        })
        pelicula.addEventListener('mouseout', () => {
            imagen.removeAttribute('hidden')
            pelicula.removeChild(overview)
            pelicula.removeChild(voteAverage)
        })
    })
}
