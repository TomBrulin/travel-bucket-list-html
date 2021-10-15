const server = 'http://localhost:3000';

/*
TODO: 1 
Récupérer les villes visitées depuis la base de données
Remplacer "cities" par le résultat du fetch
*/
let cities = [];

/* 
Mise à jour de l'affichage
*/

(async function() {
    "use strict";
  
    const resp = await fetch(`${server}/buckets`)
    const buckets = await resp.json(); 

    cities.push(...buckets)

    renderCities();
})();

/*
TODO: 2 
Ajouter une ville dans la base de données
*/
let addform = document.getElementById('addform');

addform.addEventListener('submit', (e) => {
    e.preventDefault();

    /* 
    Récupération des données du formualire
    */
    let form = document.forms.addform;
    let city = form.city.value;
    // ...

    console.log(form);
    console.log(city);

    renderCities();
})

/*
TODO 3: 
Supprimer un élément au clic sur "Delete"
*/
function deleteItem() {

}

/*
TODO 4: Création d'une WishList: 
Ajoutez un formulaire qui va permettre d'ajouter 
une ville dans un tableau "wishlist"

1. Création du formulaire ou réutilisaiton de celui déjà présent
2. Ajouter d'un nouveau tableau 'Villes à visiter' dans la partie front
3. Mettre à jour du back-end pour permettre le CRUD sur la wishlist
*/

/*
* On crée une nouvelle ligne dans le tableau "Cities" pour chaque ville 
* du tableau "let cities = [...]"
*/
function renderCities() {
    // On récupère le tableau
    let citiesTable = document.getElementById('cities-list');

    // Suppresssion des éléments
    citiesTable.innerHTML = '';

    // Pour toutes les objets du tableau
    for (i in cities) {

        // Nouvelle ligne <tr> avec comme id, la position dans le tableau
        let tr = document.createElement('tr');
        tr.dataset.id = i;

        // Création du <td> contenant le nom de la ville
        let city = document.createElement('td');
        let cityName = document.createTextNode(cities[i].city);

        // Création du <td> contenant le nom du pays
        let country = document.createElement('td');
        let countryName = document.createTextNode(cities[i].country);

        let year = document.createElement('td');
        let yearName = document.createTextNode(cities[i].year);

        let duration = document.createElement('td');
        let durationName = document.createTextNode(cities[i].duration + " " + cities[i].unit);

        // Création du <td> contenant le bouton d'ajout
        let action = document.createElement('td');

        // Création du bouton d'ajout
        let addToWishList = document.createElement('button');
        addToWishList.setAttribute('class', 'btn btn-danger');
        addToWishList.innerText = 'Retirer'
        // Exécution de la fonction au clic
        addToWishList.addEventListener('click', deleteItem)

        //On ajoute les textNodes aux éléments <td> puis le bouton au <td> correspondant
        city.appendChild(cityName);
        country.appendChild(countryName);
        year.appendChild(yearName);
        duration.appendChild(durationName);
        action.appendChild(addToWishList);

        // On ajoute les <td> à la ligne <tr>
        tr.appendChild(city);
        tr.appendChild(country);
        tr.appendChild(year);
        tr.appendChild(duration);
        tr.appendChild(action);

        // On ajoute toute la ligne au tableau
        citiesTable.appendChild(tr);
    }
}
