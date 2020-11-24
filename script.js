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

function showPictures(data) {
  const container = document.querySelector(".picture-container");
  container.innerHTML = "";

  data.results.forEach((element) => {
    const img = document.createElement("img");
    img.setAttribute("src", element.urls.small);
    img.classList.add("img-small");
    img.onclick = () => {
      const imgBig = document.createElement("img");
      imgBig.setAttribute("src", element.urls.full);
      imgBig.classList.add("img-big");
      container.append(imgBig);
      imgBig.onclick = () => {
        imgBig.parentNode.removeChild(imgBig);
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
    getPictures();
  }
}

document.body.onkeydown = handleKeyboardPress;
