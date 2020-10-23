"use strict";

let seriesList = [];
const searchResults = document.querySelector(".js-results");
const imgDefault =
  "https://via.placeholder.com/210x295/ffffff/666666/? text=TV.";

// Pedir series al servidor

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
      codeHTML += `<button class="js-add-fav-btn" id="">Add to favorites</button>`;
      codeHTML += `</li>`;
    } else {
      codeHTML += `<li>`;
      codeHTML += `<img src="${imgDefault}" class="serie-img" alt="${show.show.name}"/>`;
      codeHTML += `<h3 class="serie_title">${show.show.name}</h3>`;
      codeHTML += `<button class="js-add-fav-btn" id="">Add to favorites</button>`;
      codeHTML += `</li>`;
    }
  }
  searchResults.innerHTML = codeHTML;
};

const btn = document.querySelector(".js-btn-Search");
btn.addEventListener("click", getDataFromApi);
