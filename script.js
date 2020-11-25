function storage(val) {
  if (val) {
    localStorage.setItem("state", JSON.stringify(val));
  }
  return JSON.parse(localStorage.getItem("state"));
}

function initialize(state) {
  const header = document.createElement("header");
  const link = document.createElement("a");
  const search = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const icon = document.createElement("i");
  const loader = document.createElement("div");
  const pictureContainer = document.createElement("div");

  document.body.innerHTML = "";
  if (state) {
    document.body.innerHTML = storage();
  } else {
    link.classList.add("link");
    link.setAttribute("href", "https://github.com/o8o0o8o/fetch-API");
    link.innerText = "Repository";
    header.append(link);
    document.body.append(header);
    search.classList.add("search");
    input.classList.add("search-panel");
    input.setAttribute("placeholder", "Keyword");
    button.classList.add("btn");
    button.setAttribute("onclick", "workflow()");
    button.innerText = "Search";
    icon.classList.add("fas");
    icon.classList.add("fa-search");
    icon.classList.add("lupe");
    loader.classList.add("ld");
    loader.classList.add("ld-cross");
    loader.classList.add("ld-spin-fast");
    loader.classList.add("loader");
    loader.classList.add("hidden");
    loader.setAttribute("style", "font-size: 40px; color: #8da");
    search.append(input);
    search.append(button);
    search.append(icon);
    search.append(loader);
    document.body.append(search);
    pictureContainer.classList.add("picture-container");
    document.body.append(pictureContainer);
  }
}

initialize();

function toggleLoader() {
  const loader = document.querySelector(".loader");

  loader.classList.toggle("hidden");
}

let isRequestIsSend = false;

function getPictures() {
  toggleLoader();
  const searchPanel = document.querySelector(".search-panel");
  const tag = searchPanel.value || "nature";
  const key = "abyh5yYrieq3s9G2eYr5Zgimn8ae_uxG3DRCf03r0Qc";
  const url = `https://api.unsplash.com/search/photos?per_page=6&query=${tag}&client_id=${key}`;

  return (isRequestIsSend =
    true &&
    fetch(url).then((res) => {
      isRequestIsSend = false;
      toggleLoader();
      return res.json();
    }));
}

function loaderBig() {
  const loaderWrapper = document.createElement("div");
  const loaderBig = document.createElement("div");

  document.body.innerHTML = "";
  loaderBig.classList.add("loader-big");
  loaderWrapper.classList.add("loader-wrapper");
  loaderWrapper.append(loaderBig);
  document.body.append(loaderWrapper);
}

function showPictures(data) {
  const container = document.querySelector(".picture-container");
  container.innerHTML = "";

  data.results.forEach((element) => {
    const img = document.createElement("img");
    img.setAttribute("src", element.urls.small);
    img.setAttribute("data-bigUrl", element.urls.full);
    img.classList.add("img-small");
    img.onclick = () => {};
    container.append(img);
  });
}

async function workflow() {
  if (!isRequestIsSend) {
    showPictures(await getPictures());
  }
}

function handleKeyboardPress(e) {
  if (e.code === "Enter") {
    workflow();
  }
}

function handleMousePress(e) {
  if (e.target.className === "img-small") {
    storage(document.body.innerHTML);
    document.body.innerHTML = "";
    loaderBig();
    const imgBig = document.createElement("img");
    const url = e.target.getAttribute("data-bigUrl");
    imgBig.setAttribute("src", url);
    imgBig.classList.add("img-big");

    imgBig.onload = () => {
      document.body.append(imgBig);
    };
  } else if (e.target.className === "img-big") {
    initialize(storage());
  }
}

document.body.onkeydown = handleKeyboardPress;
document.body.onclick = handleMousePress;
