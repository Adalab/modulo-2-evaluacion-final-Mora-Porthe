"use strict";

let seriesList = {};

function getDataFromApi() {
  const inputValue = document.querySelector(".js-inputValue").value;
  fetch("http://api.tvmaze.com/search/shows?q=" + inputValue)
    .then((response) => response.json())
    .then((data) => {
      seriesList = data;
      console.log(seriesList);
    });
}

const btn = document.querySelector(".js-btn-Search");
btn.addEventListener("click", getDataFromApi);
