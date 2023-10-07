document.addEventListener("DOMContentLoaded", function () {
    const maxTextLength = 50; // Panjang maksimum teks yang diizinkan

    const cells = document.querySelectorAll(".text-truncate");

    cells.forEach(function (cell) {
        const text = cell.textContent;
        if (text.length > maxTextLength) {
            const truncatedText = text.substring(0, maxTextLength) + "...";
            cell.textContent = truncatedText;
        }
    });

    // const searchInput = document.querySelector(".form-control");
    // const searchIcon = document.getElementById("searchIcon");

    // searchIcon.addEventListener("click", function () {
    //     // Dapatkan nilai pencarian dari input
    //     const searchTerm = searchInput.value;

    //     // Lakukan sesuatu dengan nilai pencarian, misalnya lakukan pencarian
    //     alert("Searching for: " + searchTerm);
    // });
});
