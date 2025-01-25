/**
 * Author: Jacob Russell
 * Description: Nav Menu
 * For: every page
 */

//css root variable
const root = document.querySelector(":root");

const showOverlay = () => {
    root.style.setProperty("--show-overlay", "block");
};

const showNav = () => {
    showOverlay();
    root.style.setProperty("--menu", "block");
};

const hideNav = () => {
    root.style.setProperty("--menu", "none");
    root.style.setProperty("--show-overlay", "none");
};

document.getElementById("nav-button").onclick = showNav;
document.getElementById("close-nav-button").onclick = hideNav;
document.getElementById("transparent-overlay").onclick = hideNav;
