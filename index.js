// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
// https://restcountries.com/v3.1/all

// Les const se mettent avt les let :
const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");
const btnSort = document.querySelectorAll(".btnSort"); // On récupère juste la class des 3 btn

let countries = [];
let critereTri = "alpha";

// Fonction pour aller chercher les données de l'API
async function fetchCountries() {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json()) // On transforme la réponse en JSON
    .then((data) => {
      countries = data; // Stocke les données API dans "countries"
      console.log(countries); // toujours ce garder l'objet ouvert dans la console
      countriesDisplay(); // ⬅️ On appelle cette fonction après avoir reçu les données
      // Copie initiale de l'ordre des pays
      // initialOrderCountries = [...countries]; // création d'un copie de countries pour l'utilser dans les 2nds click des boutons
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des pays :", error)
    ); // Gestion des erreurs
}

// Fonction d'affichage des Pays
function countriesDisplay() {
  const searchTerm = inputSearch.value.toLowerCase(); // Récupère le texte entré
  const numberOfCountries = inputRange.value; // Nombre de pays à afficher

  // Met à jour la valeur affichée à côté du curseur
  rangeValue.textContent = numberOfCountries;

  // Filtrage et limitation des pays affichés
  const filteredCountries = countries
    .filter((country) =>
      country.translations.fra.common.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      // attention si on a plusieurs lignes dans le sort() ou le filter() mettre des {} et des return !!! exemple ci-dessous : (= explications vidéo correction du TP à 38:31)
      if (critereTri === "maxToMin") {
        return b.population - a.population;
      } else if (critereTri === "minToMax") {
        return a.population - b.population;
      } else if (critereTri === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, numberOfCountries);

  // Génération du HTML
  countriesContainer.innerHTML = filteredCountries
    .map(
      (country) => `
    <div class="card">
          <img src="${country.flags.svg}" alt="Drapeau de ${
        country.translations.fra.common
      }">
      <h2>${country.translations.fra.common}</h2>
      <h3>${country.capital ? country.capital[0] : "Aucune capitale"}</h3>
      <p>Population : ${country.population.toLocaleString(
        "fr-FR"
      )} habitants</p>
  
    </div>
    `
    )
    .join(""); // Évite les virgules dans le HTML
}

//A noter = .svg plus léger que .png

// Met à jour l'affichage à chaque modification du texte ou du curseur
inputSearch.addEventListener("input", countriesDisplay);
inputRange.addEventListener("input", countriesDisplay);

// Gestion des click sur les 3 boutons: (évite de créer 3 events)
btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    critereTri = e.target.id;
    countriesDisplay();
  });
});

// Charger les pays au démarrage
fetchCountries();

// let initialOrderCountries = [];
// let sortedAlpha = false;
// let sortedCroi = false;
// let sortedDec = false;

// Tri alphabétique de pays au click du bouton "Alpha" puis remise à l'ordre initial au 2nd click

// triAlpha.addEventListener("click", () => {
//   if (sortedAlpha) {
//     // Si le tableau a déjà été trié (sorted === true), on rétablit l'ordre initial
//     countries = [...initialOrderCountries];
//   } else {
//     // Sinon, on trie par ordre alphabétique
//     countries = [...initialOrderCountries].sort((a, b) =>
//       a.name.common.localeCompare(b.name.common)
//     );
//   }
//   sortedAlpha = !sortedAlpha; // Inverse l'état de sorted au click = sinon, on reste à l'état du 1er click (tri alpha)
//   countriesDisplay(); // Met à jour l'affichage avec les nouvelles données
// });

// // Tri croissant de la population des pays au click du bouton "minToMax" puis remise à l'ordre initial au 2nd click

// triCroissant.addEventListener("click", () => {
//   if (sortedCroi) {
//     // Si le tableau a déjà été trié (sorted === true), on rétablit l'ordre initial
//     countries = [...initialOrderCountries];
//   } else {
//     // Sinon, on trie par ordre croissant
//     countries = [...initialOrderCountries].sort(
//       (a, b) => a.population - b.population
//     );
//   }
//   sortedCroi = !sortedCroi; // Inverse l'état de sorted au click = sinon, on reste à l'état du 1er click (tri alpha)
//   countriesDisplay(); // Met à jour l'affichage avec les nouvelles données
// });

// // Tri décroissant de pays au click du bouton "maxToMin" puis remise à l'ordre initial au 2nd click

// triDecroissant.addEventListener("click", () => {
//   if (sortedDec) {
//     // Si le tableau a déjà été trié (sorted === true), on rétablit l'ordre initial
//     countries = [...initialOrderCountries];
//   } else {
//     // Sinon, on trie par ordre décroissant
//     countries = [...initialOrderCountries].sort(
//       (a, b) => b.population - a.population
//     );
//   }
//   sortedDec = !sortedDec; // Inverse l'état de sorted au click = sinon, on reste à l'état du 1er click (tri alpha)
//   countriesDisplay(); // Met à jour l'affichage avec les nouvelles données
// });

// Résumé de l'ordre d'exécution 🚀
// 1️⃣ Le code démarre et exécute fetchCountries();.
// 2️⃣ fetchCountries() fait une requête à l'API (attend la réponse).
// 3️⃣ Une fois la réponse reçue, les données sont stockées dans countries.
// 4️⃣ countriesDisplay() est appelée pour afficher les données sur la page. (il faut le mettre dans le await .then sinon, l'API n'a pas eu le tps de faire sa requête et l'affichage est vide)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
