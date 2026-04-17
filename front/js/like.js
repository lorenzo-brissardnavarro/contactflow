async function updateLike(id, element){
    try {
    const response = await fetch("../back/routeur.php?action=like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    const result = await response.json();

    if (result.success) {
        if (result.favoris === 1) {
            element.classList.add("liked");
        } else {
            element.classList.remove("liked");
        }
    }
  } catch (error) {
    console.error(error);
  }
}