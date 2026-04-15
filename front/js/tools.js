// Afficher une erreur dans le formulaire
function showError(id, message) {
    const el = document.getElementById(id);
    el.textContent = message;
    el.classList.remove('hidden');
}

// Masquer l'erreur d'un formulaire si elle a été corrigée
function hideError(id) {
    const el = document.getElementById(id);
    el.textContent = '';
    el.classList.add('hidden');
}

// Bandeau de notification pour indiquer à l'utilisateur la réussite ou l'échec de l'action
function showNotification(message, classe) {
    const notif = document.getElementById('notification');
    notif.textContent = message;
    notif.classList.remove('hidden');
    notif.classList.add(classe);
    setTimeout(() => {
        notif.classList.add('hidden');
        notif.classList.remove(classe);
    }, 1000);
}