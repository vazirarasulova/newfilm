var elList = document.querySelector(".film__list");
var elForm = document.querySelector(".form");
var elSelect = document.querySelector(".js-select");


function renderType(arr, element) {
  let renderTypes = [];

  arr.forEach((f) => {
    f.genres.forEach(genres => {
      if (!renderTypes.includes(genres)) {
        renderTypes.push(genres)
      }
    })
  })

  renderTypes.forEach(genres => {
    const newOption = document.createElement("option");
    newOption.value = genres;
    newOption.textContent = genres;
    element.appendChild(newOption);
  })
}

function func(arr) {
  elList.innerHTML = ""

  for (var film of arr) {

    var newItem = document.createElement("li");
    var newImg = document.createElement("img");
    var newSubbox = document.createElement("div")
    var newHeading = document.createElement("h2");
    var newText = document.createElement("p");
    var newTime = document.createElement("time");
    var newSublist = document.createElement("ul");
    var newGenres = document.createElement("li");


    newHeading.textContent = film.title;
    newText.textContent = film.overview.split(" ").slice(0, 10).join(" ") + "...";
    newGenres.textContent = film.genres.join(", ");


    newItem.setAttribute("class", "card m-3 bg-secondary");
    newItem.setAttribute("style", "width: 18rem");
    newImg.setAttribute("src", film.img);
    newImg.setAttribute("height", 280);
    newImg.setAttribute("class", "card-img");
    newSubbox.setAttribute("class", "card-body text-center bg-secondary bg-opacity-25");
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
    newItem.appendChild(newSubbox)
    newSubbox.appendChild(newHeading);
    newSubbox.appendChild(newText);
    newSubbox.appendChild(newTime);
    newSubbox.appendChild(newSublist);
    newSublist.appendChild(newGenres);
    elList.appendChild(newItem);

  }
}

elForm.addEventListener("change", evt => {
  evt.preventDefault();

  const elSelectVal = elSelect.value;

  let filterTypes = elSelectVal == "all genres" ? films : films.filter(f => f.genres.includes(elSelectVal));

  console.log(filterTypes);
  func(filterTypes, elList);
})


func(films);
renderType(films, elSelect);