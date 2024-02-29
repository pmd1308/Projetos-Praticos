const usernameInput = document.getElementById("username");
const profileInfo = document.getElementById("profile-info");
const errorDisplay = document.getElementById("error");

function searchProfile() {
  const username = usernameInput.value.trim();

  if (username === "") {
    errorDisplay.textContent = "Por favor, informe um nome de usuário";  
    return;
  }

  errorDisplay.textContent = "";  

  fetch(`https://api.github.com/users/${username}`)  
    .then(response => {
      if (!response.ok) {  
        throw new Error("Usuário não encontrado");
      }
      return response.json();
    })
    .then(data => {
      profileInfo.innerHTML = `
        <h2>${data.login}</h2>
        <p>Nome: ${data.name ? data.name : "N/A"}</p>
        <p>Bio: ${data.bio ? `"${data.bio}"` : "N/A"}</p>
        <p>Repositórios Públicos: ${data.public_repos}</p>
        <p>Seguidores: ${data.followers}</p>
        <p><a href="${data.html_url}" target="_blank" rel="noopener noreferrer">Ver Perfil</a></p>
      `;
    })
    .catch(error => {
      errorDisplay.textContent = error.message;
    });
}
