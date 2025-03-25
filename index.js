// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
// https://restcountries.com/v3.1/all

const countriesContainer = document.querySelector(".countries-container");
const form = document.querySelector("form");
const inputRange = document.getElementById("inputRange");

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
  // if (!countries || countries.length === 0) {
  //   // Vérifie si countries est null ou vide
  //   countriesContainer.innerHTML = "<h4>Aucun résultat</h4>";
  // // } else {
  // //   console.log("Pays trouvés:", countries);
  // //   // Si le tableau contient des pays, on affiche les résultats
  // //   countries.length = 48; // Si tu veux limiter à 48 pays

    // On crée une fonction pour convertir la population :
    function formattedPopulation(population) {
      const newPopulation = population.toLocaleString("fr-FR"); // "1 456 789"
      return newPopulation;
    }

    countriesContainer.innerHTML = countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(inputSearch.value) // Filtrage par recherche
      )
      .slice(0, inputRange.value)
      .map(
        (country) => `
        <div class="card">
          <img src="${country.flags.png}" alt="Drapeau de ${
          country.name.common
        }">
          <h2>${country.name.common}</h2>
          <h3>${country.capital[0]}</h3>
          <p>Population : ${formattedPopulation(country.population)}</p>
          
          </div>
      `
      )
      .join(""); // Évite les virgules dans le HTML
  }


// Appeler la fonction pour récupérer et afficher les pays
fetchCountries();

// Résumé de l'ordre d'exécution 🚀
// 1️⃣ Le code démarre et exécute fetchCountries();.
// 2️⃣ fetchCountries() fait une requête à l'API (attend la réponse).
// 3️⃣ Une fois la réponse reçue, les données sont stockées dans countries.
// 4️⃣ countriesDisplay() est appelée pour afficher les données sur la page. (il faut le mettre dans le await .then sinon, l'API n'a pas eu le tps de faire sa requête et l'affichage est vide)

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// country.name.includes(inputSearch.value);

const inputSearch = document.getElementById("inputSearch");
inputSearch.addEventListener("input", (e) => {
  // console.log(e.target.value); // On veut récupérer la valeur de l'input
  // a chaque fois que qqc est tapé dans l'input on peut afficher les plats (en temps réel) :
  fetchCountries(e.target.value.toLowerCase()).then(() => countriesDisplay());
});

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

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
