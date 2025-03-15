document.addEventListener("DOMContentLoaded", () => {
 
    document.getElementById("year").textContent = new Date().getFullYear();

  
    document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleString();


    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    menuButton.addEventListener("click", () => {
        if (navMenu.style.display === "flex") {
            navMenu.style.display = "none";
            menuButton.innerHTML = "&#9776;";
        } else {
            navMenu.style.display = "flex";
            menuButton.innerHTML = "&#10006;"; //
        }
    });
});