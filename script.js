function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function toggleTheme() {
    const html = document.documentElement;
    const themeIcons = document.querySelectorAll(".theme-icon");
    const currentTheme = html.getAttribute("data-theme");

    if (currentTheme === "dark") {
        html.removeAttribute("data-theme");
        themeIcons.forEach(icon => icon.textContent = "🌙");
        localStorage.setItem("theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
        themeIcons.forEach(icon => icon.textContent = "☀️");
        localStorage.setItem("theme", "dark");
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;
    const themeIcons = document.querySelectorAll(".theme-icon");

    if (savedTheme === "dark") {
        html.setAttribute("data-theme", "dark");
        themeIcons.forEach(icon => icon.textContent = "☀️");
    } else {
        html.removeAttribute("data-theme");
        themeIcons.forEach(icon => icon.textContent = "🌙");
    }
}

document.addEventListener("DOMContentLoaded", loadTheme);
