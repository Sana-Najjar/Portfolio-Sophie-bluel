// récupérer les données via l'API

let getData = null
async function fetchData() {
    
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    const galleryContainer = document.querySelector(".gallery");
    displayData(data, galleryContainer)
    getData = data
    return getData;
}
fetchData();

//fonction pour créer un élément figure

function createFigure(dataItem) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = dataItem.imageUrl;
    img.alt = dataItem.title;
    figure.appendChild(img);
    figcaption.innerHTML = dataItem.title;
    figure.appendChild(figcaption);

    return figure;
}

// fonction pour afficher les données dans la galerie

function displayData(data, container) {

    for (let i = 0; i < data.length; i++) {
        const figure = createFigure(data[i]);
        container.appendChild(figure);
    }
}


// Création de la bar de tri des projets par catégorie

const mesProjets = document.querySelector("#portfolio h2");
const categoryFilter = document.createElement("div")
mesProjets.appendChild(categoryFilter)
var buttonTous = document.createElement('button');
buttonTous.innerHTML = 'Tous';
categoryFilter.appendChild(buttonTous);
buttonTous.className = 'btn-tous btn btn-clicked';
var buttonObjets = document.createElement('button');
buttonObjets.innerHTML = 'Objets';
categoryFilter.appendChild(buttonObjets);
buttonObjets.className = 'btn-objets btn';
var buttonAppart = document.createElement('button');
buttonAppart.innerHTML = 'Appartements';
categoryFilter.appendChild(buttonAppart);
buttonAppart.className = 'btn-objets btn';
var buttonHotel = document.createElement('button');
buttonHotel.innerHTML = 'Hôtels & restaurants';
categoryFilter.appendChild(buttonHotel);
buttonHotel.className = 'btn-objets btn';


//filtrer les projets par catégorie

const btns = [buttonTous, buttonObjets, buttonAppart, buttonHotel]

function setActiveBtn(e) {
    btns.forEach(btn => {
        btn.classList.remove('btn-clicked');
    })
    e.target.classList.add('btn-clicked')
}
const gallery = document.querySelector(".gallery");
buttonObjets.addEventListener("click", function (e) {
    setActiveBtn(e)
    const getObjets = getData.filter(function (data) {

        return data.categoryId === 1;
    });
    gallery.innerHTML = "";
    for (let i = 0; i < getObjets.length; i++) {
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        creation(img, figcaption);
        img.src = getObjets[i].imageUrl;
        img.alt = getObjets[i].title;
        figcaption.innerHTML = getObjets[i].title;
    }
})

buttonAppart.addEventListener("click", function (e) {
    setActiveBtn(e)
    const getAppart = getData.filter(function (data) {

        return data.categoryId === 2;
    });
    gallery.innerHTML = "";
    for (let i = 0; i < getAppart.length; i++) {
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        creation(img, figcaption);
        img.src = getAppart[i].imageUrl;
        img.alt = getAppart[i].title;
        figcaption.innerHTML = getAppart[i].title;
    }
})

buttonHotel.addEventListener("click", function (e) {
    setActiveBtn(e)
    const getHotel = getData.filter(function (data) {

        return data.categoryId === 3;
    });
    gallery.innerHTML = "";
    for (let i = 0; i < getHotel.length; i++) {
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        creation(img, figcaption);
        img.src = getHotel[i].imageUrl;
        img.alt = getHotel[i].title;
        figcaption.innerHTML = getHotel[i].title;
    }
})


buttonTous.addEventListener("click", function (e) {

    setActiveBtn(e)
    gallery.innerHTML = "";
    for (let i = 0; i < getData.length; i++) {
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        creation(img, figcaption);
        img.src = getData[i].imageUrl;
        img.alt = getData[i].title;
        figcaption.innerHTML = getData[i].title;

    }
})
function creation(img, figcaption) {
    const figure = document.createElement("figure");
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}

creation(img, figcaption);