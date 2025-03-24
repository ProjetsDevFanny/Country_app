// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
// https://restcountries.com/v3.1/all

// 3 - Passer les données à une variable

const countriesContainer = document.querySelector(".countries-container");
const form = document.querySelector("form");
const input = document.querySelector("input");

let countries = [];

// Fonction pour aller chercher les données de l'API
async function fetchCountries() {
  await fetch(`https://restcountries.com/v3.1/all`)
    .then((res) => res.json())
    .then((data) => {
      countries = data; // Stocke directement le tableau retourné
      console.log(countries); // toujours ce garder l'objet ouvert dans la console
      countriesDisplay();
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des pays :", error)
    ); // Gestion des erreurs
}

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// Fonction d'affichage des Pays
function countriesDisplay() {
  if (countries === null) {
    countriesContainer.innerHTML = "<h2>Aucun résultat</h2>";
  } else {
    countries.length = 24;

    countriesContainer.innerHTML = countries
      .map(
        (country) => `
        <div class="card">
          <img src="${country.flags.png}" alt="Drapeau de ${country.name.common}">
          <h2>${country.name.common}</h2>
        </div>
      `
      )
      .join(""); // Évite les virgules dans le HTML
  }
}

// Appeler la fonction pour récupérer et afficher les pays
fetchCountries();

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// country.name.includes(inputSearch.value);

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
//     .slice(0, inputRange.Value)
//     .map((country) => `
//     <div class="card">
//     </div>
//     `)

// let meals = [];

// // Fonction pour aller chercher les données avec l'API
// async function fetchMeals() {
//   // await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=duck") // on veut remplacer "duck" par la recherche de l'utilisateur ()= valeur de l'input) = avec le paramètre "search" de la fonction :
//   // await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search) AUTRE FACON D'ECRIRE:
//   await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=Duck`)
//     .then((res) =>
//       // console.log(res)
//       res.json()
//     )
//     // .then((data) => console.log(data.meals))
//     .then((data) => (meals = data.meals)); // On met les données dans le tableau meals
//   console.log(meals); // toujours ce garder l'objet ouvert dans la console
// }

// fetchMeals();
