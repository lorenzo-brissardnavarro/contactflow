const btnContacts = document.getElementById("btn-contacts");
const btnFavorites = document.getElementById("btn-favorites");

function setActiveButton(activeBtn) {
    document.querySelectorAll(".nav button").forEach(btn => {
        btn.classList.remove("active");
    });
    activeBtn.classList.add("active");
}

const url = new URLSearchParams(window.location.search);
let isFavorite = url.get("favorite") === "1";

if(isFavorite) {
    setActiveButton(btnFavorites);
} else {
    setActiveButton(btnContacts);
}

btnContacts.addEventListener("click", () => {
    setActiveButton(btnContacts);
    isFavorite = false;
    Index();
});

btnFavorites.addEventListener("click", () => {
    setActiveButton(btnFavorites);
    isFavorite = true;
    Index();
});