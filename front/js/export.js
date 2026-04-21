const btnExport = document.getElementById("btn-export");

btnExport.addEventListener("click", () => {
    window.location.href = "../back/routeur.php?action=export";
});