let elList = document.querySelector(".film__list");
let elForm = document.querySelector(".form");
let elSelect = document.querySelector(".js-select");
let elSort = document.querySelector(".js-sort");
let elModal = document.querySelector('.modals');
let elBookmarkList = document.querySelector(".bookmark-list");

const localFilm = JSON.parse(window.localStorage.getItem("bookmark"))

let bookmark = localFilm || [];
renderBookmark(bookmark, elBookmarkList);

function renderBookmark(arr, element) {
  element.innerHTML = "";
  arr.forEach(e => {
    let newItem = document.createElement("li");
    let newDeleteBtn = document.createElement("button");

    newItem.textContent = e.title;
    newDeleteBtn.textContent = "Delete";

    newItem.classList.add("bookmark-item")
    newDeleteBtn.classList.add("delete-bookmark-btn");

    newDeleteBtn.type = "button";
    newDeleteBtn.dataset.filmId = e.id;

    newItem.appendChild(newDeleteBtn);

    element.appendChild(newItem);
  });
}

elBookmarkList.addEventListener("click", evt => {
  const isDeleteBtn = evt.target.matches(".delete-bookmark-btn");

  if (isDeleteBtn) {
    const deleteBtnId = evt.target.dataset.filmId;

    const findBookmarkFilmId = bookmark.findIndex(e => e.id == deleteBtnId);

    bookmark.splice(findBookmarkFilmId, 1);
    window.localStorage.setItem("bookmark", JSON.stringify(bookmark))
    renderBookmark(bookmark, elBookmarkList);
  }
})


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
    let elBtnInfo = document.createElement('button');
    let newBookmarkBtn = document.createElement("button");

    newHeading.textContent = film.title;
    newText.textContent =
      film.overview.split(" ").slice(0, 10).join(" ") + "...";
    newGenres.textContent = film.genres.join(", ");
    elBtnInfo.textContent = 'More'
    elBtnInfo.dataset.idNumber = film.id;

    newItem.setAttribute("class", "card ");
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

    elBtnInfo.classList.add('btn', 'btn-info');
    newBookmarkBtn.classList.add("bookmark-btn");
    newBookmarkBtn.textContent = "Bookmark";
    newBookmarkBtn.dataset.filmId = film.id;

    newItem.appendChild(newImg);
    newItem.appendChild(newSubbox);
    newSubbox.appendChild(newHeading);
    newSubbox.appendChild(newText);
    newSubbox.appendChild(newTime);
    // newSubbox.appendChild(newSublist);
    // newSublist.appendChild(newGenres);
    newItem.appendChild(newBookmarkBtn);
    newItem.appendChild(elBtnInfo);
    elList.appendChild(newItem);
  }
}

elSelect.addEventListener("change", (evt) => {
  evt.preventDefault();

  const elSelectVal = elSelect.value;

  let filterTypes =
    elSelectVal == "all genres" ?
    films :
    films.filter((f) => f.genres.includes(elSelectVal));

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



elList.addEventListener("click", evt => {
  const bookmarkBtn = evt.target.matches(".bookmark-btn");
  if (bookmarkBtn) {
    
    const filmId = evt.target.dataset.filmId;
    const findFilm = films.find(e => e.id == filmId);
    
    if (!bookmark.includes(findFilm)) {
      bookmark.push(findFilm);
      window.localStorage.setItem("bookmark", JSON.stringify(bookmark))
      renderBookmark(bookmark, elBookmarkList);
    }
  }
});


let modal = [];

function modalFunc(film, element) {
  element.innerHTML = "";
  film.forEach(render => {
    let title = render.title.split(" ", 3).join(' ');
    let elCard = document.createElement('div');
    let elTitle = document.createElement('h5');
    let elText = document.createElement('p');
    let elBtnClose = document.createElement('button');

    elCard.classList.add('card');
    elTitle.classList.add('card-title', 'm-0', 'mb-3');
    elText.classList.add('card-text');
    elBtnClose.classList.add('btn', 'btn-danger');

    elBtnClose.textContent = 'X';
    elBtnClose.dataset.idNumber = render.id;
    elTitle.textContent = title;
    elText.textContent = render.overview;

    elCard.appendChild(elBtnClose);
    elCard.appendChild(elTitle);
    elCard.appendChild(elText);
    element.appendChild(elCard);
  })
}

elList.addEventListener('click', function (e) {
  let btnMore = e.target.matches('.btn-info');
  if (btnMore) {
    let btnId = e.target.dataset.idNumber;
    let idNum = films.find(a => a.id == btnId);
    if (!modal.includes(idNum)) {
      modal.push(idNum);
      modalFunc(modal, elModal);
    }
  }
})

document.body.addEventListener('click', function (e) {
  let btnDelete = e.target.matches('.btn-danger');

  if (btnDelete) {
    let btnId = e.target.dataset.idNumber;
    let btnClose = bookmark.findIndex(a => a.id == btnId);
    modal.splice(btnClose, 1);
    modalFunc(modal, elModal);
  } else if (!e.target.matches('.btn-info')) {
    let btnId = e.target.dataset.idNumber;
    let btnClose = bookmark.findIndex(a => a.id == btnId);
    modal.splice(btnClose, 1);
    modalFunc(modal, elModal);
  }
})