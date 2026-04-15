
function showEditForm(id, prenom, nom, email, telephone) {
  main.innerHTML = `
    <h2>Modifier le contact</h2>
    <form id="editForm">
      <input type="text" name="prenom" value="${prenom}" required>
      <input type="text" name="nom" value="${nom}" required>
      <input type="email" name="email" value="${email}" required>
      <input type="text" name="telephone" value="${telephone}" required>
      <button type="submit">Modifier</button>
    </form>
  `;

  document.getElementById("editForm").addEventListener("submit", (e) => {
    e.preventDefault();
    updateContact(id, e.target);
  });
}

async function updateContact(id, form) {
  const data = {
    id: id,
    prenom: form.prenom.value,
    nom: form.nom.value,
    email: form.email.value,
    telephone: form.telephone.value
  };

  try {
    const response = await fetch("../back/routeur.php?action=edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      alert("Contact modifié !");
      Index();
    } else {
      alert("Erreur");
    }
  } catch (error) {
    console.error(error);
  }
}
  