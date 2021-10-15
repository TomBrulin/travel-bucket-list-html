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

addform.addEventListener('submit', async (e) => {
    e.preventDefault();

    /* 
    Récupération des données du formualire
    */
    let form = document.forms.addform;
    let city = form.city.value;
    let country = form.country.value;
    let year = form.year.value;
    let duration = form.duration.value;

    const selectUnit = document.getElementById('unit')
    let unit = selectUnit.options[selectUnit.selectedIndex].text;
    // ...

    if (city == '' || country == '' || year == '' || duration == '')
    {
        alert("Veuillez saisir tous les champs");
        return;
    }

    const requestBody = {
        "city": city,
        "country": country,
        "year": year,
        "duration": duration,
        "unit": unit
    }

    const resp = await fetch(`${server}/buckets`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    const createdBucket = await resp.json();
    cities.push(createdBucket);

    renderCities();
})

/*
TODO 3: 
Supprimer un élément au clic sur "Delete"
*/
function deleteItem(e) {
    const bucketId = e.target.id;

    fetch(`${server}/buckets/${bucketId}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    for (let [i, bucket] of cities.entries()) {
        if (bucket._id == bucketId)
            cities.splice(i, 1)
    }

    renderCities()
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
        addToWishList.id = cities[i]._id;
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
