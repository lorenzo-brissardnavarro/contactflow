function renderPagination(total, currentPage, limit) {
    const pagination = document.querySelector(".pagination");
    const pages = Math.ceil(total / limit);

    pagination.innerHTML = "";

    if(!(currentPage === 1)){
        pagination.innerHTML += `
                <li>
                    <a href="?page=${currentPage - 1}">Précédente</a>
                </li>
            `;
    }
    

    for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `
            <li class="${currentPage === i ? "active" : ""}">
                <a href="?page=${i}">${i}</a>
            </li>
        `;
    }

    if(!(currentPage === pages)){
        pagination.innerHTML += `
                <li>
                    <a href="?page=${currentPage + 1}">Suivante</a>
                </li>
            `;
    }
    
}