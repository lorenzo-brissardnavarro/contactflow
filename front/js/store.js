
main.innerHTML =`
    <section>
        <form id="contactForm">
            <input type="text" name="prenom" placeholder="Prénom" required>
            <input type="text" name="nom" placeholder="Nom" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="text" name="telephone" placeholder="Téléphone" required>
            <button type="submit">Envoyer</button>
        </form>
    </section>`;

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const data = {
    prenom: form.prenom.value,
    nom: form.nom.value,
    email: form.email.value,
    telephone: form.telephone.value
  };

  try {
    const response = await fetch("../back/routeur.php?action=store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      alert("Contact ajouté !");
      form.reset();
      Index();
    } else {
      alert("Erreur");
    }
  } catch (error) {
    console.error(error);
  }
});