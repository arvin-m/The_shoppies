
const searchBtn = document.querySelector('#search');



class MOVIE {
    constructor(title, year) {
        this.title = title;
        this.year = year;
    }
}

class MOVIEUI {

    static displayMovies() {
        const moviesRes = Storage.getMovies();
        if (moviesRes) moviesRes.forEach((movie) => MOVIEUI.addMovietoList(movie));

        const nominatedMovies = Storage.getNominationMovies();

        if (nominatedMovies) nominatedMovies.forEach((movie) => MOVIEUI.addnominatedMoviesList(movie))

    };

    static addMovietoList(moviesRes) {
        const resultTable = document.querySelector('#result_table');
        const row = document.createElement('tr');
        row.className = "row mb-3 mt-3";
        row.innerHTML =
            `
        <td class="col-sm-1 ms-2 far fa-dot-circle avoid-clicks"  ></td>
        <td class="col-sm-5 ms-2 movie_title avoid-clicks" >${moviesRes.title}</td>
        <td class="col-sm-2 ms-2 movie_year avoid-clicks" >${moviesRes.year}</td>
        `;

        const btn = document.createElement('button');
        btn.className = "col-sm-3 btn btn-secondary btn-sm nominate ms-2";
        btn.id = "nominate";
        btn.setAttribute('data-title', moviesRes.title);
        btn.setAttribute('data-year', moviesRes.year);
        btn.innerHTML = `nominate`;
        resultTable.appendChild(row);
        row.appendChild(btn);

    };

    static addnominatedMoviesList(movie) {
        const nominateTable = document.querySelector('#nominations_table');
        const row = document.createElement('tr');
        row.className = "row mb-3 mt-3";
        row.innerHTML =
            `
        <td class="col-sm-1 ms-2 far fa-dot-circle avoid-clicks"  ></td>
        <td class="col-sm-5 ms-2 movie_title avoid-clicks" >${movie.title}</td>
        <td class="col-sm-2 ms-2 movie_year avoid-clicks" >${movie.year}</td>
        `;

        const btn = document.createElement('button');
        btn.className = "col-sm-3 btn btn-secondary btn-sm nominate ms-2";
        btn.id = "delete";
        btn.setAttribute('data-title', movie.title);
        btn.setAttribute('data-year', movie.year);
        btn.innerHTML = `Delete`;
        nominateTable.appendChild(row);
        row.appendChild(btn);
    }

    static alert(message, type) {
        const mainContainer = document.querySelector("#searchContainer");
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} m-3`;
        alert.role = `alert`;
        alert.innerHTML = message;
        mainContainer.appendChild(alert)
    }

}

class Storage {
    // Get Movies from localStorage
    static getMovies() {
        let movies;
        localStorage.getItem('movies' == null ? movies = [] : movies = JSON.parse(localStorage.getItem('movies')));
        return movies;
    }
    // Add Movies to localStorage
    static addMovie(movies) {
        const lists = [];
        movies.forEach(movie => {
            const newMovie = new MOVIE(movie.Title, movie.Year);
            lists.push(newMovie);
            localStorage.setItem('movies', JSON.stringify(lists));
        })
        return lists;
    }

    static getNominationMovies() {
        let nominationMovies;
        localStorage.getItem('nominateMovies' == null ? nominationMovies = [] : nominationMovies = JSON.parse(localStorage.getItem('nominateMovies')));
        return nominationMovies;
    }

    static addToNomination(movie) {
        const nominateList = [];
        movie.forEach(movie => {
            nominateList.push(movie);
            localStorage.setItem('nominateMovies', JSON.stringify(nominateList));
        })
        return nominateList;
    }

    static deleteNominatedMovie(movieToDelete) {
        const moviesList = Storage.getNominationMovies();
        const index = (moviesList.findIndex(movie => movie.title == movieToDelete.title && movie.year == movieToDelete.year))
        if (index > -1) {
            moviesList.splice(index, 1);

            Storage.addToNomination(moviesList)

        }

    }
}

const API_KEY = '8dfb8299';
// API CALL
function fetchData(Input) {

    const Url = `http://www.omdbapi.com/?s=${Input}&page=1&apikey=${API_KEY}`;
    fetch(Url)
        .then(data => { return data.json() })
        .then(res => {
            // Pass the result to the UI
            Storage.addMovie(res.Search);
            location.reload();
        });

}







// Call the Eventlistener to show the movies on the UI
document.addEventListener('DOMContentLoaded', MOVIEUI.displayMovies);