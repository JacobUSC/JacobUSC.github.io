/**
 * Author: Jacob Russell
 * Gives functionality to the nav menu
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

const showSignup = () => {
	showOverlay();
	root.style.setProperty("--show-signup", "block");
};

const showLogin = () => {
	showOverlay();
	root.style.setProperty("--show-login", "block");
};

const hideAll = () => {
	root.style.setProperty("--show-overlay", "none");
	root.style.setProperty("--menu", "none");
	root.style.setProperty("--show-signup", "none");
	root.style.setProperty("--show-login", "none");
};

//Nav Menu
document.getElementById("nav-button").onclick = showNav;
document.getElementById("close-nav-button").onclick = hideAll;

//Signup Menu
document.getElementById("signup-button").onclick = showSignup;
document.getElementById("exit-signup").onclick = hideAll;

//login Menu
document.getElementById("login-button").onclick = showLogin;
document.getElementById("exit-login").onclick = hideAll;

//background clicked
document.getElementById("transparent-overlay").onclick = hideAll;
