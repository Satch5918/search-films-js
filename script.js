const searchButton = document.getElementById('searchButton');
const results = document.getElementById('results');
let searchInput = document.getElementById('searchInput');
const urlGif = 'https://i.gifer.com/EZKo.gif';

const api_key = '0c1ced1ba3cf440631349e5e46755b1d';
const urlBase = 'https://api.themoviedb.org/3/search/movie';
let urlImg = 'https://image.tmdb.org/t/p/w500';

searchButton.addEventListener('click', buscarPeliculas);

searchInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        buscarPeliculas();
    }
});

function buscarPeliculas() {
    results.innerHTML = '';
    const loadingGif = document.createElement('img');
    loadingGif.src = urlGif;
    loadingGif.alt = 'Cargando...';
    results.appendChild(loadingGif);
    loadingGif.style.display = 'block';

    setTimeout(() => {
        let searchInputValue = searchInput.value;

        fetch(`${urlBase}?query=${searchInputValue}&api_key=${api_key}`)
            .then(response => response.json())
            .then(response => {
                // Verificar si el loadingGif todavía está presente antes de intentar eliminarlo
                if (results.contains(loadingGif)) {
                    results.removeChild(loadingGif);
                }

                // Mostrar los resultados
                displayMovies(response.results);
            })
            .catch(error => {
                console.error('Error en la búsqueda:', error);

                // Asegurarse de que el loadingGif se elimine en caso de error
                if (results.contains(loadingGif)) {
                    results.removeChild(loadingGif);
                }
            });
    }, 2000); // 2000 milisegundos = 2 segundos
}

function displayMovies(movies) {
    results.innerHTML = '';
    if (movies.length === 0) {
        results.innerHTML = '<h2>No se encontraron resultados</h2>';
        return;
    }
    movies.forEach(movie => {
        let movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        let movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;

        let releaseDate = document.createElement('p');
        releaseDate.textContent = `Fecha de lanzamiento: ${movie.release_date}`;
        console.log(movie.release_date)

        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        let voteAverage = document.createElement('p');
        voteAverage.textContent = `Calificación: ${movie.vote_average.toFixed(2)}`;

        let posterPath = urlImg + movie.poster_path;

        let poster = document.createElement('img');
        poster.src = posterPath;

        movieDiv.appendChild(poster);
        movieDiv.appendChild(movieTitle);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);
        movieDiv.appendChild(voteAverage);

        results.appendChild(movieDiv);
    });
}
