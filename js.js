document.addEventListener("DOMContentLoaded", start);

let attraktioner;
let filter = "alle";
const header = document.querySelector(".h2_skift");

function start() {
  console.log("Site startet");

  async function hentData(url) {
    const resultat = await fetch(url, options);
    console.log("resultat", resultat);
    attraktioner = await resultat.json();
    visByer();
  }

  const url = "https://t7passionsopgave-bbad.restdb.io/rest/attractions";
  const options = {
    headers: { "x-apikey": "620f892934fd6215658587cf" },
  };

  const filterKnapper = document.querySelectorAll(".filtrer_by");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerByer));

  hentData(url);

  const btn = document.querySelector(".toggle-btn");
  const nav = document.querySelector("nav");

  //   /* Tilføj et klik-event til btn, der sætter toggleMenu-funktionen i gang */
  btn.addEventListener("click", toggleMenu);
  // // Lav en function, der hedder toggleMenu()
  function toggleMenu() {
    console.log("toggleMenu");
    // 1. Toggle en klasse på nav vha. classList.toggle
    // 2. Toggle en klasse, der hedder "shown"
    nav.classList.toggle("shown");
    // 1. Lav en variabel, der hedder menuShown
    // 2. Den skal være lig med, om nav-variablen indeholder klassen "shown" vha. classList.contains("")
    let menuShown = nav.classList.contains("shown");
    // 1. Lav en if/else sætning => if (...) {...} else {...}
    // 2. Spørg om menu i if-sætningen => if (menu)
    if (menuShown) {
      // hvis nav har klassen "shown", sæt da btn.textContent til "Luk"
      btn.textContent = "Luk";
    } else {
      // hvis IKKE nav har klassen "shown", sæt da btn.textContent til "Menu"
      btn.textContent = "Menu";
    }
  }
}

function filtrerByer() {
  console.log(this);

  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  console.log(filter);

  let kategoritekster = document.querySelectorAll(".skift_kategoritekst span");
  kategoritekster.forEach((kategoritekst) => {
    kategoritekst.classList.add("hide");
  });

  document.querySelector(`.${filter}`).classList.remove("hide");

  visByer();

  header.textContent = this.textContent;
}

function visByer() {
  console.log("Byer loaded");

  const container = document.querySelector("#kategori_second_section");
  const byTemplate = document.querySelector("#template_byer");
  container.textContent = "";

  // const byKategoritekst = document.querySelector(".skift_kategoritekst");
  // byKategoritekst.textContent = attractions.byKategoritekst;

  attraktioner.forEach((attractions) => {
    if (filter == attractions.kategori || filter == "alle") {
      const klon = byTemplate.cloneNode(true).content;
      klon.querySelector(".template_bynavn").textContent = attractions.navne;
      klon.querySelector(".template_img").src = "images/" + attractions.billede;
      klon
        .querySelector(".template_article")
        .addEventListener("click", () => visBy(attractions));
      container.appendChild(klon);
    }
  });
}

function visBy(attractions) {
  // const modal = document.querySelector("#modal");
  console.log(attractions);

  modal.querySelector(".modal_bynavn").textContent = attractions.navne;
  modal.querySelector(".luk_knap").src = "images/ikoner/lukpopup.svg";
  modal.querySelector(".modal_img").src = "images/" + attractions.billede;
  // modal.querySelector(".bynavn_overskrift").textContent =
  //   attractions.byoverskrift;
  modal.querySelector(".paragraf").textContent = attractions.paragraf;
  modal.querySelector(".adresse").textContent = attractions.adresse;
  modal.style.display = "block";
}

modal.addEventListener("click", () => (modal.style.display = "none"));
