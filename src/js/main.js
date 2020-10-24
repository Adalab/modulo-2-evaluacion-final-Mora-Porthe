"use strict";

// onstantes / variables

let seriesList = [];
let favorites = [];
const searchResults = document.querySelector(".js-results");
const imgDefault =
  "https://via.placeholder.com/210x295/ffffff/666666/? text=TV.";

// Pedir info al servidor

function getDataFromApi() {
  const inputValue = document.querySelector(".js-inputValue").value;
  fetch("//api.tvmaze.com/search/shows?q=" + inputValue)
    .then((response) => response.json())
    .then((data) => {
      seriesList = data;
      paintSeries();
    });
}

// pintar series

const paintSeries = function () {
  let codeHTML = "";
  for (const show of seriesList) {
    if (show.show.image !== null) {
      codeHTML += `<li>`;
      codeHTML += `<img src="${show.show.image.medium}" class="serie-img" alt="${show.show.name}"/>`;
      codeHTML += `<h3 class="serie_title">${show.show.name}</h3>`;
      codeHTML += `<button class="js-add-fav-btn" data-id="${show.show.id}">Add to favorites</button>`;
      codeHTML += `</li>`;
    } else {
      codeHTML += `<li>`;
      codeHTML += `<img src="${imgDefault}" class="serie-img" alt="${show.show.name}"/>`;
      codeHTML += `<h3 class="serie_title">${show.show.name}</h3>`;
      codeHTML += `<button class="js-add-fav-btn" data-id="${show.show.id}">Add to favorites</button>`;
      codeHTML += `</li>`;
    }
  }
  searchResults.innerHTML = codeHTML;
  lisenAddFavoritesBtns();
};

// Escuchar boton favoritos

const lisenAddFavoritesBtns = () => {
  const btnsFavorites = document.querySelectorAll(".js-add-fav-btn");
  for (const btnFavorites of btnsFavorites) {
    btnFavorites.addEventListener("click", addFavorites);
  }
};

// Agregar a favoritos

const addFavorites = (ev) => {
  // obtengo el ID del producto clickeado
  const clickedBtn = parseInt(ev.target.dataset.id);
  //  obtengo el indice del elemento clickeado
  const indexFav = favorites.indexOf(clickedBtn);
  //  determino una operacion logica que retorna true o false
  const isFavorite = indexFav !== -1;
  if (isFavorite === false) {
    favorites.push(clickedBtn);
  } else {
    favorites.splice(indexFav, 1);
  }
};

// pintar favoritos

const paintFavorites = function () {
  let codeHTML = "";
  for (const favorite of favorites) {
    const indexFav = favorites.indexOf(clickedBtn);
    const isFavorite = indexFav !== -1;

    if (show.show.image !== null) {
      codeHTML += `<li>`;
      codeHTML += `<img src="${show.show.image.medium}" class="serie-img" alt="${show.show.name}"/>`;
      codeHTML += `<h3 class="serie_title">${show.show.name}</h3>`;
      codeHTML += `<button class="js-take-fav-btn" data-id="${show.show.id}">X</button>`;
      codeHTML += `</li>`;
    } else {
      codeHTML += `<li>`;
      codeHTML += `<img src="${imgDefault}" class="serie-img" alt="${show.show.name}"/>`;
      codeHTML += `<h3 class="serie_title">${show.show.name}</h3>`;
      codeHTML += `<button class="js-take-fav-btn" data-id="${show.show.id}">X</button>`;
      codeHTML += `</li>`;
    }
    const favoriteList = document.querySelector(".ja-favorites");
    favoriteList.innerHTML = codeHTML;
  }
};

// Escuchar eventos

const btn = document.querySelector(".js-btn-Search");
btn.addEventListener("click", getDataFromApi);
