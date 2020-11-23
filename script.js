function getPictures() {
  const container = document.querySelector(".picture-container");
  container.innerHTML = "";
  const searchPanel = document.querySelector(".search-panel");
  const tag = searchPanel.value || "nature";

  const key = "abyh5yYrieq3s9G2eYr5Zgimn8ae_uxG3DRCf03r0Qc";
  const url = `https://api.unsplash.com/search/photos?per_page=6&query=${tag}&client_id=${key}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
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
    });
}
