const main = document.getElementById("main");

// On affiche l'ensemble des contacts
async function Index() {
    try {
        const res = await fetch("../back/routeur.php?action=index");
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
                  <button onclick="showEditForm(${contact.id}, '${contact.prenom}', '${contact.nom}', '${contact.email}', '${contact.telephone}')">Modifier</button>
                  <button onclick="Remove(${contact.id})">Supprimer</button>
                `;

                container.appendChild(card);
            });

            main.appendChild(container);
        } else {
            console.error(result.message);
        }

    } catch (error) {
      console.error("Erreur réseau", error);
    }
}

Index();