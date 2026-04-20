const headerActions = document.getElementById("header-actions");
const main = document.getElementById("main");

async function Index() {
    const url = new URLSearchParams(window.location.search);
    const currentPage = parseInt(url.get("page")) || 1;
    const limit = 3;
    const keyword = url.get("keyword") || "";

    try {
        const res = await fetch(`../back/routeur.php?action=index&page=${currentPage}&limit=${limit}&keyword=${keyword}`);
        const result = await res.json();

        headerActions.innerHTML = "";
        main.innerHTML = "";

        if (result.success) {
            headerActions.innerHTML = `
            <input type="text" id="search" class="search-bar" placeholder="Rechercher un contact...">
            <div id="suggestions"></div>
            <button onclick="showStoreForm()" class="btn-primary">Créer un nouveau contact</button> `;
            initSearch();

            const container = document.createElement("div");
            // On parcourt tous les contacts et on crée une card
            result.data.forEach(contact => {
                const card = document.createElement("div");
                card.classList.add("contact-card");

                card.innerHTML = `
                <div class="contact-info">
                    <h3>${contact.prenom} ${contact.nom}</h3>
                    <p>Email : ${contact.email}</p>
                    <p>Téléphone : ${contact.telephone}</p>
                </div>
                <div class="contact-actions">
                  <button class="icon-btn star ${contact.favoris == 1 ? 'favorite' : ''}" onclick="updateLike(${contact.id}, this)"><i class="fa-solid fa-star"></i></button>
                  <button class="icon-btn edit" onclick="showEditForm(${contact.id}, '${contact.prenom}', '${contact.nom}', '${contact.email}', '${contact.telephone}')">
                    <i class="fa-solid fa-pen-to-square"></i>
                    Modifier
                  </button>
                  <button class="icon-btn delete" onclick="Remove(${contact.id})">
                    <i class="fa-solid fa-trash-can"></i>
                    Supprimer
                  </button>
                </div>
                `;

                container.appendChild(card);
            });


            main.appendChild(container);

            renderPagination(result.total, currentPage, limit);

        } else {
            console.error(result.message);
        }

    } catch (error) {
        console.error("Erreur réseau", error);
    }
}

Index();

function initSearch(){
    const searchInput = document.getElementById("search");
    const suggestions = document.getElementById("suggestions");

    searchInput.addEventListener("input", async () => {
        const value = searchInput.value;

        if (value.length < 2) {
            suggestions.innerHTML = "";
            return;
        }

        const res = await fetch(`../back/routeur.php?action=index&keyword=${value}&limit=5&page=1`);
        const result = await res.json();

        suggestions.innerHTML = "";

        result.data.forEach(contact => {
            const div = document.createElement("div");
            div.textContent = `${contact.prenom} ${contact.nom}`;
            
            div.addEventListener("click", () => {
                searchInput.value = div.textContent;
                suggestions.innerHTML = "";
                window.location.search = `?keyword=${value}&page=1`;
            });

            suggestions.appendChild(div);
        });
    });
}



