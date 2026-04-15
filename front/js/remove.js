async function Remove(id) {
    const data = {
    id: id
    };
  try {
    const response = await fetch("../back/routeur.php?action=remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({data})
    });

    const result = await response.json();

    if (result.success) {
      alert("Contact supprimé !");
      Index();
    } else {
      alert("Erreur");
    }
  } catch (error) {
    console.error(error);
  }
}