/* Author: */
var Get_API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
var IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

var main = document.querySelector("#main");
var form = document.querySelector("form");
var search = document.querySelector("#search");

// get movies
getMovies(Get_API_URL);

// async function for fetching API response
async function getMovies(url) {
  console.log("url:", url);
  var res = await fetch(url);
  console.log("result:", res);
  var data = await res.json();
  console.log("data:", data);
  showMovies(data.results);
}

// showMovies function to display data
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    var { title, poster_path, vote_average, overview } = movie;
    var movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;

    main.appendChild(movieEl);
  });
}

// getClassByRate function to change fontcolor acording movie rating
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// search input click event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var searchTerm = search.value.toLowerCase();
  console.log(searchTerm);
  var SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=${searchTerm}"`
  //var API_URL = `https://freetestapi.com/api/v1/movies?search=${searchTerm}`;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API);
    search.value = "";
  } else {
    window.location.reload();
  }
});