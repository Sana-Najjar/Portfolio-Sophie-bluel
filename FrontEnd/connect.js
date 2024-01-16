const form = {
  email: document.querySelector("#email"),
  password: document.querySelector("#password"),
  submit: document.querySelector("#btn-submit"),
};

let button = form.submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const login = 'http://localhost:5678/api/users/login';
  const reponse = await fetch(login, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    })
  })
  const data = await reponse.json();
  if (data.userId) {
    localStorage.setItem("token", data.token);
    window.location = 'homepage_edit.html'
  } else {
    alert("Erreur dans l’identifiant ou le mot de passe");
  }
});

