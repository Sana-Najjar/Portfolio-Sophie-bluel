// récupérer les données via l'API
let getData =null
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {

        const galleryContainer= document.querySelector(".gallery");
        displayData(data, galleryContainer)
         getData=data
    })

//fonction pour créer un élément figure
    function createFigure(dataItem) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
       
        img.src=dataItem.imageUrl;
        img.alt=dataItem.title;
        figure.appendChild(img);
        figcaption.innerHTML=dataItem.title;
        figure.appendChild(figcaption);
       
        return figure;
    }

// fonction pour afficher les données dans la galerie
function displayData (data, container) {
    for (let i = 0; i < data.length; i++) {
        const figure = createFigure(data[i]);
        container.appendChild(figure);
      }
    }


    // Création de la bar de tri des projets par catégorie

const mesProjets= document.querySelector("#portfolio h2");
const categoryFilter = document.createElement("div")
mesProjets.appendChild(categoryFilter)
console.log(categoryFilter);
var buttonTous = document.createElement('button');
buttonTous.innerHTML='Tous';
categoryFilter.appendChild(buttonTous);
buttonTous.className = 'btn-tous btn btn-clicked';
console.log(buttonTous)
var buttonObjets = document.createElement('button');
buttonObjets.innerHTML='Objets';
categoryFilter.appendChild(buttonObjets);
buttonObjets.className = 'btn-objets btn';
var buttonAppart = document.createElement('button');
buttonAppart.innerHTML='Appartements';
categoryFilter.appendChild(buttonAppart);
buttonAppart.className=  'btn-objets btn';
var buttonHotel = document.createElement('button');
buttonHotel.innerHTML='Hôtels & restaurants';
categoryFilter.appendChild(buttonHotel);
buttonHotel.className=  'btn-objets btn';


//filtrer les projets par catégorie

const btns = [buttonTous,buttonObjets,buttonAppart,buttonHotel]

function setActiveBtn(e){
    btns.forEach(btn => {
        btn.classList.remove('btn-clicked');
    })
    e.target.classList.add('btn-clicked')
}
const gallery= document.querySelector(".gallery");
buttonObjets.addEventListener("click",function(e){
    setActiveBtn(e)
    const getObjets = getData.filter(function (data) {
        return data.categoryId ==1;
    });
   console.log(getObjets);
   gallery.innerHTML="";
   for(let i=0; i<getObjets.length; i++){
     console.log(getObjets[i].imageUrl)  
     const figure = document.createElement("figure");
     const img = document.createElement("img");
     const figcaption = document.createElement("figcaption");         
     img.src=getObjets[i].imageUrl;
     img.alt=getObjets[i].title;
     figure.appendChild(img);
     figcaption.innerHTML=getObjets[i].title;
     figure.appendChild(figcaption);
     gallery.appendChild(figure)
   }
})

buttonAppart.addEventListener("click",function(e){
    setActiveBtn(e)
    const getAppart = getData.filter(function (data) {
        return data.categoryId ==2;
    });
    console.log(getAppart);
    gallery.innerHTML="";
    for(let i=0; i<getAppart.length; i++){
        console.log(getAppart[i].imageUrl)
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption"); 
        img.src = getAppart[i].imageUrl;
        img.alt = getAppart[i].title;
        figure.appendChild(img);
        figcaption.innerHTML = getAppart[i].title;
        figure.appendChild(figcaption);
        gallery.appendChild(figure)
    }
})

buttonHotel.addEventListener("click",function(e){
    setActiveBtn(e)
    const getHotel = getData.filter(function (data) {
        return data.categoryId ==3;
    });
    console.log(getHotel);
    gallery.innerHTML="";
    for(let i=0; i<getHotel.length; i++){
        console.log(getHotel[i].imageUrl)
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption"); 
        img.src = getHotel[i].imageUrl;
        img.alt = getHotel[i].title;
        figure.appendChild(img);
        figcaption.innerHTML = getHotel[i].title;
        figure.appendChild(figcaption);
        gallery.appendChild(figure)
    }
})


buttonTous.addEventListener("click",function(e){

    setActiveBtn(e)
    gallery.innerHTML="";
    for(let i=0; i<getData.length; i++){

        console.log(getData[i].imageUrl)
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption"); 
        img.src = getData[i].imageUrl;
        img.alt = getData[i].title;
        figure.appendChild(img);
        figcaption.innerHTML = getData[i].title;
        figure.appendChild(figcaption);
        gallery.appendChild(figure)
    }
})


