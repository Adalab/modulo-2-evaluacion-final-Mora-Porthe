"use strict";let seriesList=[],favorites=[];const searchResults=document.querySelector(".js-search-results"),favoritesList=document.querySelector(".js-favorites"),imgDefault="https://via.placeholder.com/210x295/ffffff/666666/? text=TV.";function getDataFromApi(){const t=document.querySelector(".js-inputValue").value;fetch("//api.tvmaze.com/search/shows?q="+t).then(t=>t.json()).then(t=>{seriesList=t,paintSeries()})}const paintSeries=function(){let t="";for(const e of seriesList)null!==e.show.image?(t+="<li>",t+=`<h3 class="serie-title">${e.show.name}</h3>`,t+=`<img src="${e.show.image.medium}" class="serie-img" alt="${e.show.name}"/>`,t+=`<button class=" fav-btn js-add-fav-btn" data-id="${e.show.id}">Favorito</button>`,t+="</li>"):(t+="<li>",t+=`<h3 class="serie-title">${e.show.name}</h3>`,t+=`<img src="${imgDefault}" class="serie-img" alt="${e.show.name}"/>`,t+=`<button class="fav-btn js-add-fav-btn" data-id="${e.show.id}">Favorito</button>`,t+="</li>");searchResults.innerHTML=t,lisenAddFavoritesBtns()},lisenAddFavoritesBtns=()=>{const t=document.querySelectorAll(".js-add-fav-btn");for(const e of t)e.addEventListener("click",addFavorites);const e=document.querySelectorAll(".js-remove-fav-btn");console.log(e);for(const t of e)t.addEventListener("click",addFavorites)},addFavorites=function(t){const e=parseInt(t.target.dataset.id),s=favorites.findIndex(t=>t.show.id===e);if(!1===(-1!==s)){const t=seriesList.find(t=>t.show.id===e);favorites.push(t)}else favorites.splice(s,1);paintFavorites(),setInLocalStorage()},paintFavorites=function(){let t="";for(const e of favorites)null!==e.show.image?(t+='<li class="fav-li">',t+=`<img src="${e.show.image.medium}" class="serie-img" alt="${e.show.name}"/>`,t+=`<h3 class="serie-title">${e.show.name}</h3>`,t+=`<button class="fav-btn js-remove-fav-btn" data-id="${e.show.id}">X</button>`,t+="</li>"):(t+='<li class="fav-li">',t+=`<img src="${imgDefault}" class="serie-img" alt="${e.show.name}"/>`,t+=`<h3 class="serie-title">${e.show.name}</h3>`,t+=`<button class="fav-btn js-remove-fav-btn" data-id="${e.show.id}">X</button>`,t+="</li>");favoritesList.innerHTML=t,lisenAddFavoritesBtns()},btn=document.querySelector(".js-btn-Search");btn.addEventListener("click",getDataFromApi);const getFromLocalStorage=()=>{const t=localStorage.getItem("favorites");null!==t&&(favorites=JSON.parse(t),paintFavorites())},setInLocalStorage=()=>{const t=JSON.stringify(favorites);localStorage.setItem("favorites",t)};getFromLocalStorage(),getDataFromApi();