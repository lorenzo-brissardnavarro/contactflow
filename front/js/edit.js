// Fonction pour afficher le formulaire pré-rempli
function showEditForm(id, prenom, nom, email, telephone) {
    headerActions.innerHTML = "";
    pagination.innerHTML = "";
    main.innerHTML = `
    <section>
      <h2>Modifier le contact</h2>
      <p id="error" class="error hidden"></p>

      <form id="editForm">
          <div>
              <label for="prenom">Prénom</label>
              <input type="text" name="prenom" value="${prenom}" id="prenom" placeholder="Ex : Jean" required>
          </div>

          <div>
              <label for="nom">Nom</label>
              <input type="text" name="nom" value="${nom}" id="nom" placeholder="Ex : Dupont" required>
          </div>

          <div>
              <label for="email">Email</label>
              <input type="email" name="email" value="${email}" id="email" placeholder="Ex : jean.dupont@email.com" required>
          </div>

          <div>
              <label for="telephone">Téléphone</label>
              <input type="text" name="telephone" value="${telephone}" id="telephone" placeholder="Ex : 0605040302" required>
          </div>
          <button type="submit">Envoyer</button>

      </form>
  </section>`;

  document.getElementById("editForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Constantes pour utiliser les différents champs du formulaire
    const ChangeFirstNameInput = document.getElementById('prenom');
    const ChangeSurnameInput = document.getElementById('nom');
    const ChangeEmailInput = document.getElementById('email');
    const ChangePhoneInput = document.getElementById('telephone');

    // Ecouteurs d'évènements pour vérifier en direct la saisie de l'utilisateur
    ChangeEmailInput.addEventListener('input', function() {
        if (!ChangeEmailInput.value.match(emailRegex)) {
            showError('error', "Adresse mail invalide");
        } else {
            hideError('error');
        }
    });

    ChangePhoneInput.addEventListener('input', function() {
        if (!ChangePhoneInput.value.match(phoneRegex)) {
            showError('error', "Numéro de téléphone invalide");
        } else {
            hideError('error');
        }
    });
    updateContact(id);
  });
}

async function updateContact(id) {
  // Récupération des valeurs du formulaire en enlevant les espaces en début et fin de chaîne
    const ChangeFirstName = document.getElementById('prenom').value.trim();
    const ChangeSurname = document.getElementById('nom').value.trim();
    const ChangeEmail = document.getElementById('email').value.trim();
    const ChangePhone = document.getElementById('telephone').value.trim();

    // On vérifie de nouveau avec les expressions régulières
    if (!ChangeEmail.match(emailRegex)) {
        showError('error', "Adresse mail invalide");
        return;
    }

    if (!ChangePhone.match(phoneRegex)) {
        showError('error', "Numéro de téléphone invalide");
        return;
    }

    const data = {id: id, prenom: ChangeFirstName, nom: ChangeSurname, email: ChangeEmail, telephone: ChangePhone};

    try {
      const response = await fetch("../back/routeur.php?action=edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
          showNotification("Contact modifié !", "green");
          setTimeout(() => {
            Index();
          }, 1000);
      } else {
          showNotification("Erreur", "red");
      }
    } catch (error) {
      console.error(error);
    }
}
  