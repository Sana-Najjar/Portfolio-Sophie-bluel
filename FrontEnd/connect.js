const form = {
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    submit: document.querySelector("#btn-submit"),
  };
  
  let button = form.submit.addEventListener("click", (e) =>{
    e.preventDefault();
    const login = 'http://localhost:5678/api/users/login';
    fetch(login,{
        method:"POST",
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email: form.email.value,
            password: form.password.value,
        })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.userId) {
        localStorage.setItem("token",data.token);
        window.location = 'homepage_edit.html'
      } else {
        alert("Erreur dans l’identifiant ou le mot de passe");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  });