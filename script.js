document.getElementById('searchButton').addEventListener('click', searchMovies)

//URLs
let apiKey = '587e1b1d60229730080c6a05bbf20c2a';
let url = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'

//Color del input
const input = document.getElementById('searchInput')
input.addEventListener('change', () => {
    if (input.value.length > 0) {
        input.style.color = "#fff"
    }
})

input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        searchMovies()
    }
})

//Contenedor peliculas
let resultContainer = document.getElementById('results')

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

        let poster = document.createElement('img')  //Imagen
        poster.src = posterPath
        poster.classList.add('poster')

        let voteAverage = document.createElement('p')   //Votos del publico
        voteAverage.textContent = movie.vote_average.toString().substr(0, 3)
        voteAverage.classList.add('vote')
        voteAverage.style.display = 'none';

        let overview = document.createElement('p');
        overview.textContent = movie.overview;
        overview.classList.add('overview');
        overview.style.display = 'none';


        movieDiv.classList.add('m')
        title.classList.add('m')
        poster.classList.add('m')
        voteAverage.classList.add('m')
        overview.classList.add('m')

        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(overview); 
        movieDiv.appendChild(voteAverage)

        resultContainer.appendChild(movieDiv);
    });

    efectoPeliculas();
}

//Efecto de las peliculas
function efectoPeliculas() {
    let arrayPeliculas = document.querySelectorAll('.movie');

    arrayPeliculas.forEach(pelicula => {
        let imagen = pelicula.querySelector('.poster');
        let description = pelicula.querySelector('.overview');
        let votes = pelicula.querySelector('.vote')
        let title = pelicula.querySelector('h2')

        pelicula.addEventListener('mouseover', () => {
            imagen.setAttribute('hidden', true);
            description.style.display = '-webkit-box';
            title.style.top = '10px'
            if(votes.innerHTML != '0'){
                votes.style.display = 'block'
            }
        });

        pelicula.addEventListener('mouseout', () => {
            imagen.removeAttribute('hidden');
            description.style.display = 'none';
            title.style.top = 'auto'
            title.style.bottom = '0'
            if(votes.style.display == 'block'){
                votes.style.display = 'none'
            }
        });
    });
}


