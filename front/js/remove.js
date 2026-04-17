// Fonction pour supprimer le contact en utilisant l'ID
async function Remove(id) {
  try {
    const response = await fetch("../back/routeur.php?action=remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
        showNotification("Contact supprimé !", "green");
        Index();
    } else {
        showNotification("Erreur", "red");
    }
  } catch (error) {
    console.error(error);
  }
}