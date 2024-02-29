const usernameInput = document.getElementById("username");
const profileInfo = document.getElementById("profile-info");
const errorDisplay = documetn.getElementById("error");

function searchProfile() {
    const username = usernameInput.value.trim();

    if (username === ""){
        errorDisplay.textContent = "Nome vazio";
        return;
    }
}

errorDisplay.textContent = "";

fetch(`https://api.github.com/user/${username}`)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Usuário não encontrado")
        }
    })
    .then(data => {
        profileInfo.innerHTML = `
        <h2>${data.login}</h2>
        <p> Nome: ${data.name ? data.name: "N/A"}</p>
        <p>Bio: ${data.bio ? `"${data.bio}"`: "N/A"}</p>
        <p>Public Repos: ${data_public_repos}</p>
        <p>Followers: ${data.followers}<p>
        <p><a href="${data.html_url}" targe="_blank">View Profile</a></p>
        `;
    })
.catch(error => {
    errorDisplay.textContent = error.message;
});
