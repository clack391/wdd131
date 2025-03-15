document.addEventListener("DOMContentLoaded", () => {
    // Update footer year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Update last modified date
    document.getElementById("lastModified").textContent = document.lastModified;

    // Hamburger menu functionality
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    menuButton.addEventListener("click", () => {
        if (navMenu.style.display === "flex") {
            navMenu.style.display = "none";
            menuButton.innerHTML = "&#9776;"; // Hamburger icon
        } else {
            navMenu.style.display = "flex";
            menuButton.innerHTML = "&#10006;"; // 'X' close icon
        }
    });
});
