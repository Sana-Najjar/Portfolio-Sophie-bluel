const projects = [];
let token = localStorage.getItem('token');

//Affichage des projets dans la page

function viewProjects(){
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        for (let i=0; i< data.length; i++){
            const figure = document.createElement("figure");
            const img = document.createElement("img");
            const figcaption = document.createElement("figcaption");
            const gallery= document.querySelector(".gallery");
            img.src=data[i].imageUrl;
            img.alt=data[i].title;
            figure.appendChild(img);
            figcaption.innerHTML=data[i].title;
            figure.appendChild(figcaption);
            gallery.appendChild(figure) 
            projects.push(data);
        } 
    })
}
viewProjects()
//Bouton logout
const logoutButton = document.querySelector(".logoutButton")
logoutButton.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
})
//Gestion de l'affichage du modale
let modal=null
const openModal = function(e){
    e.preventDefault()
    const target=document.querySelector(e.target.getAttribute('href'))
    target.style.display=null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal','true')
    modal=target
    modal.addEventListener('click',closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click',closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click',stopPropagation)
}
const closeModal=function(e){
    if(modal===null)return
    e.preventDefault()
    modal.style.display="none"
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click',closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click',closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click',stopPropagation)
    modal=null
}
const stopPropagation = function(e){
    e.stopPropagation()
}
document.querySelectorAll('.js-modal').forEach(a=>{
    a.addEventListener('click',openModal)
})
document.querySelectorAll('.modal1').forEach(a=>{
    a.addEventListener('click',viewProjects())
})
let modal2=null
const openModal2 = function(e){
    e.preventDefault()
    const target=document.querySelector(e.target.getAttribute('href'))
    target.style.display=null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal','true')
    modal2=target
    modal2.addEventListener('click',closeModal2)
    modal2.querySelector('.js-modal-close2').addEventListener('click',closeModal2)
    modal2.querySelector('.js-modal-stop2').addEventListener('click',stopPropagation)
}
const closeModal2=function(e){
    if(modal2===null)return
    e.preventDefault()
    modal2.style.display="none"
    modal2.setAttribute('aria-hidden','true')
    modal2.removeAttribute('aria-modal')
    modal2.removeEventListener('click',closeModal2)
    modal2.querySelector('.js-modal-close2').removeEventListener('click',closeModal2)
    modal2.querySelector('.js-modal-stop2').removeEventListener('click',stopPropagation)
    modal2=null
}
document.querySelectorAll('.add-btn').forEach(a=>{
    a.addEventListener('click',openModal2)
})
document.querySelector("#btn-back").addEventListener("click",function(e){
    e.preventDefault();
    document.querySelector("#modal1").style.display="null"
    document.querySelector("#modal2").style.display="none"
})
//Création des élements du modale

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        for(let i=0; i< data.length; i++){
            let figure = document.createElement("figure");
            let span =document.createElement("span");
            let zoom=document.createElement("span");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption");
            const galleryModal= document.querySelector(".gallery-modal");
            span.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
            img.src=data[i].imageUrl;
            img.classList.add("imgModale");
            span.classList.add("deleteProject");
            span.classList.add("icon-div-style-shown");
            galleryModal.append(figure);
            figure.append(zoom);
            figure.append(span,img,figcaption);
            zoom.classList.add("icon-div-arrows")
            zoom.classList.add("icon-div-style-not-shown")
            const firstArrowsIcon = document.querySelector('.icon-div-arrows:first-child');
            firstArrowsIcon.classList.replace('icon-div-style-not-shown', 'icon-div-style-shown');
            span.addEventListener("click",(index)=>{
                   console.log(data[i].id)
                   alert('êtes-vous sûr de vouloir supprimer ce projet?')
                   deleteRequest(data[i].id);
                   if (index=data[i].id) {
                     data.splice(index,1)
                   }
                   location.reload();
            })
        }
    })

//Suppression de travaux existants

function deleteRequest(id) {
    fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            };
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        })
}

///// preview image before upload

const upFile = document.querySelector('#upfile');
function viewPhoto() {
    const newPhoto = document.querySelector('.new-image-style');
    let selectedFile;
    upFile.addEventListener('change', () => {
        const newFile = upFile.files[0];
        const upFileSize = 4000000;
        const upFileTypes = ["image/png", "image/jpeg"];
        if ((newFile.size > upFileSize) || !(upFileTypes.includes(newFile.type))) {
            alert('Le fichier ne doit pas dépasser 4 mo et seuls les fichiers au format jpg ou jpeg sont acceptés.');
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            selectedFile = reader.result;
            newPhoto.setAttribute('src', selectedFile);
        }
        reader.readAsDataURL(newFile);
        newPhoto.style.display = null;
        document.querySelector('.landscape-icon').style.display = 'none';
        document.querySelector('#add-photo-label').style.display = 'none';
        document.querySelector('.form-layout-file span').style.display = 'none';
        document.querySelector('#upfile').style.top = '50px';
    })
}
viewPhoto();

//changement du style du bouton valider

const form= document.querySelector("#formElem");
form.addEventListener('input', () => {
  const upFile = document.querySelector('#upfile');
  const title = document.querySelector('#title');
  if (upFile.files[0] && title.value) {
      document.querySelector('.validate-submit-button').style.background = '#1D6154';
  } else {
      document.querySelector('.validate-submit-button').style.background = '#A7A7A7';
  }
})

//Vérification des champs remplis

function checkAddForm() {
    const upFile = document.querySelector('#upfile');
    const title = document.querySelector('#title');
    if (!(upFile.files[0]) || !(title.value)) {
        alert('Tous les champs doivent être remplis.');
        return false;
    }
    return true;
}

//Ajout d'un nouveau projet

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    if(checkAddForm() === true){
    const newProject = new FormData(form);
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: newProject,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            };
            return response.json();
        })
        .then((value) => {
            console.log(value);
            projects.push(value);
        })
         .then(() => {
            location.reload();
            viewProjects();
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        })
    }
})