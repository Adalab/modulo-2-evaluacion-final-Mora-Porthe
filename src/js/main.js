"use strict";

// constants & variables

let seriesList = [];
let favorites = [];
const searchResults = document.querySelector(".js-search-results");
const favoritesList = document.querySelector(".js-favorites");
const imgDefault =
  "https://via.placeholder.com/210x295/ffffff/666666/? text=TV.";

// get data from server

function getDataFromApi() {
  const inputValue = document.querySelector(".js-inputValue").value;
  fetch("//api.tvmaze.com/search/shows?q=" + inputValue)
    .then((response) => response.json())
    .then((data) => {
      seriesList = data;
      paintSeries();
    });
}

// paint series

const paintSeries = function () {
  let codeHTML = "";
  for (const show of seriesList) {
    if (show.show.image !== null) {
      codeHTML += `<li>`;
      codeHTML += `<h3 class="serie-title">${show.show.name}</h3>`;
      codeHTML += `<img src="${show.show.image.medium}" class="serie-img" alt="${show.show.name}"/>`;
      codeHTML += `<button class=" fav-btn js-add-fav-btn" data-id="${show.show.id}">Favorito</button>`;
      codeHTML += `</li>`;
    } else {
      codeHTML += `<li>`;
      codeHTML += `<h3 class="serie-title">${show.show.name}</h3>`;
      codeHTML += `<img src="${imgDefault}" class="serie-img" alt="${show.show.name}"/>`;
      codeHTML += `<button class="fav-btn js-add-fav-btn" data-id="${show.show.id}">Favorito</button>`;
      codeHTML += `</li>`;
    }
  }
  searchResults.innerHTML = codeHTML;
  lisenAddFavoritesBtns();
};

// listen button favorites

const lisenAddFavoritesBtns = () => {
  const btnsFavorites = document.querySelectorAll(".js-add-fav-btn");
  for (const btnFavorites of btnsFavorites) {
    btnFavorites.addEventListener("click", addFavorites);
  }
  const btnsRemoveFavorites = document.querySelectorAll(".js-remove-fav-btn");
  console.log(btnsRemoveFavorites);
  for (const btnRemoveFavorite of btnsRemoveFavorites) {
    btnRemoveFavorite.addEventListener("click", addFavorites);
  }
};

// add to favorites

const addFavorites = function (ev) {
  // obtengo el ID del producto clickeado
  const clickedBtn = parseInt(ev.target.dataset.id);
  //  obtengo el indice del elemento clickeado
  const indexFav = favorites.findIndex(
    (favSerie) => favSerie.show.id === clickedBtn
  );
  //  determino una operacion logica que retorna true o false
  const isFavorite = indexFav !== -1;
  if (isFavorite === false) {
    const foundSerie = seriesList.find((serie) => serie.show.id === clickedBtn);
    favorites.push(foundSerie);
  } else {
    favorites.splice(indexFav, 1);
  }
  paintFavorites();
  setInLocalStorage();
};

// paint favorites

const paintFavorites = function () {
  let codeHTML = "";
  for (const favorite of favorites) {
    if (favorite.show.image !== null) {
      codeHTML += `<li class="fav-li">`;
      codeHTML += `<img src="${favorite.show.image.medium}" class="serie-img" alt="${favorite.show.name}"/>`;
      codeHTML += `<h3 class="serie-title">${favorite.show.name}</h3>`;
      codeHTML += `<button class="fav-btn js-remove-fav-btn" data-id="${favorite.show.id}">X</button>`;
      codeHTML += `</li>`;
    } else {
      codeHTML += `<li class="fav-li">`;
      codeHTML += `<img src="${imgDefault}" class="serie-img" alt="${favorite.show.name}"/>`;
      codeHTML += `<h3 class="serie-title">${favorite.show.name}</h3>`;
      codeHTML += `<button class="fav-btn js-remove-fav-btn" data-id="${favorite.show.id}">X</button>`;
      codeHTML += `</li>`;
    }
  }
  favoritesList.innerHTML = codeHTML;
  lisenAddFavoritesBtns();
};

// listen events

const btn = document.querySelector(".js-btn-Search");
btn.addEventListener("click", getDataFromApi);

// local storage

const getFromLocalStorage = () => {
  const localStorageFavorites = localStorage.getItem("favorites");
  if (localStorageFavorites !== null) {
    favorites = JSON.parse(localStorageFavorites);
    paintFavorites();
  }
};

const setInLocalStorage = () => {
  const stringifyFavorites = JSON.stringify(favorites);
  localStorage.setItem("favorites", stringifyFavorites);
};

// start aplication

getFromLocalStorage();
getDataFromApi();
