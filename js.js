document.addEventListener("DOMContentLoaded", start);

let modal = document.querySelector("#modal");
// Globale variabler
let attractions;
let filter = "alle";

function start() {
  console.log("Site startet");

  async function hentData(url) {
    const resultat = await fetch(url, options);
    console.log("resultat", resultat);
    retter = await resultat.json();
    visByer();
  }

  const url = "https://t7passionsopgave-bbad.restdb.io/rest/attractions";
  const options = {
    headers: {
      "x-apikey": "620f892934fd6215658587cf",
    },
  };

  const filterknapper = document.querySelectorAll("button");
  filterknapper.forEach((knap) => {
    knap.addEventListener("click", filtrerByer);
  });
  hentData(url);
}

function filtrerByer() {
  console.log(this);
  filter = this.dataset.kategori; // Sætter variblen til det der er valgt
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  // document.querySelector("h2").textContent = this.textContent;

  visByer();

  header.textContent = this.textContent;
}

function visByer() {
  console.log("Byer loaded");

  // Forbindelse til HTML elementer
  const container = document.querySelector("section");
  const modal = document.querySelector("#modal");
  const temp = document.querySelector("template").content;

  container.textContent = ""; // Ryd container

  container.innerHTML = "";
  attractions.forEach((attractions) => {
    if ((filter = attractions.kategori || filter == "alle")) {
      const klon = temp.cloneNode(true);
      klon.querySelector("img").src = "images/" + attractions.billede;
      klon.querySelector("h2").textContent = `${attractions.navne}`;

      klon.querySelector(".adresse").textContent = `${attractions.adresse}`;
      klon.querySelector(".paragraf").textContent = attractions.paragraf;
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(attractions));
      container.appendChild(klon);
    }
  });
}

function visDetaljer(attractions) {
  console.log(attractions);
  modal.querySelector("h2").textContent = `${attractions.navn}`;
  modal.querySelector(".beskrivelse").textContent = `${attractions.paragraf}`;
  modal.querySelector("img").src = "images/" + attractions.billede;
  modal.querySelector(".adresse").textContent =
    "adresse: " + attractions.adresse + ",-";
  modal.style.display = "block";
}

modal.addEventListener("click", () => (modal.style.display = "none"));
