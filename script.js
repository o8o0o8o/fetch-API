function initialize() {
  const header = document.createElement("header");
  const link = document.createElement("a");
  const search = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");
  const icon = document.createElement("i");
  const loader = document.createElement("div");
  const pictureContainer = document.createElement("div");

  document.body.innerHTML = "";
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
    img.classList.add("img-small");
    img.onclick = () => {
      document.body.innerHTML = "";
      loaderBig();
      const imgBig = document.createElement("img");
      imgBig.setAttribute("src", element.urls.full);
      imgBig.classList.add("img-big");
      imgBig.onclick = () => {
        initialize();
      };
      imgBig.onload = () => {
        document.body.append(imgBig);
      };
    };
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

document.body.onkeydown = handleKeyboardPress;
