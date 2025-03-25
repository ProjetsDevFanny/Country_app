// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
// https://restcountries.com/v3.1/all

const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const rangeSlider = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");

// On récupère les 3 boutons:
const triCroissant = document.getElementById("minToMax");
const triDecroissant = document.getElementById("maxToMin");
const triAlpha = document.getElementById("alpha");

let countries = [];

// Fonction pour aller chercher les données de l'API
async function fetchCountries() {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json()) // On transforme la réponse en JSON
    .then((data) => {
      countries = data; // Stocke les données API dans "countries"
      console.log(countries); // toujours ce garder l'objet ouvert dans la console
      countriesDisplay(); // ⬅️ On appelle cette fonction après avoir reçu les données
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des pays :", error)
    ); // Gestion des erreurs
}

// Fonction d'affichage des Pays
function countriesDisplay() {
  const searchTerm = inputSearch.value.toLowerCase(); // Récupère le texte entré
  const numberOfCountries = rangeSlider.value; // Nombre de pays à afficher

  // Met à jour la valeur affichée à côté du curseur
  rangeValue.textContent = numberOfCountries;

  // On crée une fonction pour convertir la population :
  function formattedPopulation(population) {
    const newPopulation = population.toLocaleString("fr-FR"); // "1 456 789"
    return newPopulation;
  }

  // Filtrage et limitation des pays affichés
  const filteredCountries = countries
    .filter((country) => country.name.common.toLowerCase().includes(searchTerm))
    .slice(0, numberOfCountries);

  // Génération du HTML
  countriesContainer.innerHTML = filteredCountries
    .map(
      (country) => `
        <div class="card">
          <img src="${country.flags.png}" alt="Drapeau de ${
        country.name.common
      }">
          <h2>${country.name.common}</h2>
          <h3>${country.capital ? country.capital[0] : "Aucune capitale"}</h3>
          <p>Population : ${formattedPopulation(country.population)}</p>
          
          </div>
      `
    )
    .join(""); // Évite les virgules dans le HTML
}

// Met à jour l'affichage à chaque modification du texte ou du curseur
inputSearch.addEventListener("input", countriesDisplay);
rangeSlider.addEventListener("input", countriesDisplay);

triCroissant.addEventListener("click", countriesDisplay);
triDecroissant.addEventListener("click", countriesDisplay);
triAlpha.addEventListener("click", countriesDisplay);

// Charger les pays au démarrage
fetchCountries();

// Résumé de l'ordre d'exécution 🚀
// 1️⃣ Le code démarre et exécute fetchCountries();.
// 2️⃣ fetchCountries() fait une requête à l'API (attend la réponse).
// 3️⃣ Une fois la réponse reçue, les données sont stockées dans countries.
// 4️⃣ countriesDisplay() est appelée pour afficher les données sur la page. (il faut le mettre dans le await .then sinon, l'API n'a pas eu le tps de faire sa requête et l'affichage est vide)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays

//s'appuyez sur l'architecture de l'application de cuisine

// Architecture de la fonction d'affichage
// countriesContainer.innerHtml = monTableau
// .filter((country) => country.nomdupays.includes(inputSearch.value))
// .sort((a,b) => {
//   if(...) {
//      return ...
//    } else if (...) {
//      return ...
//    }
//     })
//     .slice(0, inputRange.value)
//     .map((country) => `
//     <div class="card">
//     </div>
//     `)
