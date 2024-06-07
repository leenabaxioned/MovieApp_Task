/* Author: */
var Get_API_URL = "https://freetestapi.com/api/v1/movies?sort=name&order=dec";

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
  showMovies(data);
}

// showMovies function to display data
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    var { title, poster, rating, plot } = movie;
    var movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${poster}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(rating)}">${rating}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${plot}
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
  var API_URL = `https://freetestapi.com/api/v1/movies?search=${searchTerm}`;
  if (searchTerm && searchTerm !== "") {
    getMovies(API_URL);
    search.value = "";
  } else {
    window.location.reload();
  }
});