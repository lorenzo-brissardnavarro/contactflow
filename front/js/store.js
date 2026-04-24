// Expressions régulières pour tester le mail et le numéro de téléphone
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^0[1-9]\d{8}$/;

// Affichage du formulaire d'ajout de contact
function showStoreForm() {
    headerActions.innerHTML = "";
    pagination.innerHTML = "";
    main.innerHTML = `
    <section>
        <h2>Ajouter un nouveau contact</h2>
        <p id="error" class="error hidden"></p>

        <form id="contactForm">
            <div>
                <label for="prenom">Prénom</label>
                <input type="text" name="prenom" id="prenom" placeholder="Ex : Jean" required>
            </div>

            <div>
                <label for="nom">Nom</label>
                <input type="text" name="nom" id="nom" placeholder="Ex : Dupont" required>
            </div>

            <div>
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Ex : jean.dupont@email.com" required>
            </div>

            <div>
                <label for="telephone">Téléphone</label>
                <input type="text" name="telephone" id="telephone" placeholder="Ex : 0605040302" required>
            </div>
            <button type="submit">Envoyer</button>

        </form>
    </section>`;

    // Constantes pour utiliser les différents champs du formulaire
    const firstNameInput = document.getElementById('prenom');
    const surnameInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('telephone');


    // Ecouteurs d'évènements pour vérifier en direct la saisie de l'utilisateur
    emailInput.addEventListener('input', function() {
        if (!emailInput.value.match(emailRegex)) {
            showError('error', "Adresse mail invalide");
        } else {
            hideError('error');
        }
    });

    phoneInput.addEventListener('input', function() {
        if (!phoneInput.value.match(phoneRegex)) {
            showError('error', "Numéro de téléphone invalide");
        } else {
            hideError('error');
        }
    });

    // Lorque le formulaire est soumis
    document.getElementById("contactForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        // Récupération des valeurs du formulaire en enlevant les espaces en début et fin de chaîne
        const firstName = firstNameInput.value.trim();
        const surname = surnameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        // On vérifie de nouveau avec les expressions régulières
        if (!email.match(emailRegex)) {
            showError('error', "Adresse mail invalide");
            return;
        }

        if (!phone.match(phoneRegex)) {
            showError('error', "Numéro de téléphone invalide");
            return;
        }

        // Si les données sont correctes, on peut les stocker
        const data = {prenom: firstName, nom: surname, email: email, telephone: phone};

        try {
            // Appel API et envoi des données
            const response = await fetch("../back/routeur.php?action=store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                showNotification("Contact ajouté !", "green");
                document.getElementById("contactForm").reset();
                setTimeout(() => {
                    Index();
                }, 1000);
            } else {
                showNotification("Erreur", "red");
            }
        } catch (error) {
        console.error(error);
        }
    });
}