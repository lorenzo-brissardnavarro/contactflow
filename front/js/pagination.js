const pagination = document.querySelector(".pagination");
function renderPagination(total, currentPage, limit) {
    const pages = Math.ceil(total / limit);

    const url = new URLSearchParams(window.location.search);
    const keyword = url.get("keyword") || "";
    const keywordParam = keyword ? `&keyword=${keyword}` : "";

    pagination.innerHTML = "";

    if (currentPage !== 1) {
        pagination.innerHTML += `
            <li>
                <a href="?page=${currentPage - 1}${keywordParam}">Précédente</a>
            </li>
        `;
    }

    for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `
            <li>
                <a href="?page=${i}${keywordParam}" class="${currentPage === i ? "active" : ""}">${i}</a>
            </li>
        `;
    }

    if (currentPage !== pages) {
        pagination.innerHTML += `
            <li>
                <a href="?page=${currentPage + 1}${keywordParam}">Suivante</a>
            </li>
        `;
    }
}