const main = document.getElementById("main");

async function Index() {
    const url = new URLSearchParams(window.location.search);
    const currentPage = parseInt(url.get("page")) || 1;
    const limit = 3;

    try {
        const res = await fetch(`../back/routeur.php?action=index&page=${currentPage}&limit=${limit}`);
        const result = await res.json();

        main.innerHTML = "";

        if (result.success) {
            const container = document.createElement("div");

            // On parcourt tous les contacts et on crée une card
            result.data.forEach(contact => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                  <h3>${contact.prenom} ${contact.nom}</h3>
                  <p>Email : ${contact.email}</p>
                  <p>Téléphone : ${contact.telephone}</p>
                  <button class="${contact.favoris == 1 ? 'liked' : ''}" onclick="updateLike(${contact.id}, this)"><i class="fa-solid fa-star"></i></button>
                  <button onclick="showEditForm(${contact.id}, '${contact.prenom}', '${contact.nom}', '${contact.email}', '${contact.telephone}')">Modifier</button>
                  <button onclick="Remove(${contact.id})">Supprimer</button>
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

