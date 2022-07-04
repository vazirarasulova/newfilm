let elList = document.querySelector(".film__list");
let elForm = document.querySelector(".form");
let elSelect = document.querySelector(".js-select");
let elSort = document.querySelector(".js-sort");

// const sortFunction = {
//   az: (a, b) => {
//     if (a.title.toLowerCase() < b.title.toLowerCase()) {
//       return -1
//     } else {
//       return 1
//     }
//   },
//   za: (a, b) => {
//     if (a.title.toLowerCase() < b.title.toLowerCase()) {
//       return 1
//     } else {
//       return -1
//     }
//   }
// }

function renderType(arr, element) {
  let renderTypes = [];

  arr.forEach((f) => {
    f.genres.forEach((genres) => {
      if (!renderTypes.includes(genres)) {
        renderTypes.push(genres);
      }
    });
  });

  renderTypes.forEach((genres) => {
    const newOption = document.createElement("option");
    newOption.value = genres;
    newOption.textContent = genres;
    element.appendChild(newOption);
  });
}

function func(arr) {
  elList.innerHTML = "";

  for (let film of arr) {
    let newItem = document.createElement("li");
    let newImg = document.createElement("img");
    let newSubbox = document.createElement("div");
    let newHeading = document.createElement("h2");
    let newText = document.createElement("p");
    let newTime = document.createElement("time");
    let newSublist = document.createElement("ul");
    let newGenres = document.createElement("li");

    newHeading.textContent = film.title;
    newText.textContent =
      film.overview.split(" ").slice(0, 10).join(" ") + "...";
    newGenres.textContent = film.genres.join(", ");

    newItem.setAttribute("class", "card m-3 bg-secondary");
    newItem.setAttribute("style", "width: 18rem");
    newImg.setAttribute("src", film.img);
    newImg.setAttribute("height", 280);
    newImg.setAttribute("class", "card-img");
    newSubbox.setAttribute(
      "class",
      "card-body text-center bg-secondary bg-opacity-25"
    );
    newText.setAttribute("class", "card-title");
    newText.setAttribute("class", "card-text");
    newTime.setAttribute("class", "card-time");
    newSublist.setAttribute("class", "card-list");
    newItem.setAttribute("class", "card");
    newImg.setAttribute("src", film.poster);
    newText.setAttribute("class", "card-text");
    newTime.setAttribute("datetime", "2022-03-12");
    newSublist.setAttribute("class", "card-list list-unstyled");

    newItem.appendChild(newImg);
    newItem.appendChild(newSubbox);
    newSubbox.appendChild(newHeading);
    newSubbox.appendChild(newText);
    newSubbox.appendChild(newTime);
    newSubbox.appendChild(newSublist);
    newSublist.appendChild(newGenres);
    elList.appendChild(newItem);
  }
}

elSelect.addEventListener("change", (evt) => {
  evt.preventDefault();

  const elSelectVal = elSelect.value;

  let filterTypes =
    elSelectVal == "all genres"
      ? films
      : films.filter((f) => f.genres.includes(elSelectVal));

  func(filterTypes, elList);
});

elSort.addEventListener("change", function () {
  let elva = elSort.value;

  let sortedFilms = films.sort((a, b) => {
    if (elva === "az") {
      if (a.title > b.title) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (a.title < b.title) {
        return 1;
      } else {
        return -1;
      }
    }
  });

  func(sortedFilms);
  console.log(elva);
  console.log(sortedFilms);
});

func(films);
renderType(films, elSelect);
