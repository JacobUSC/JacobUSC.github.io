//css root
const root = document.querySelector(":root");

//Nav Menu
document.getElementById("nav-button").onclick = () => {
    root.style.setProperty("--menu", "block");
}

document.getElementById("close-nav-button").onclick = () => {
    root.style.setProperty("--menu", "none");
}

//Signup Menu
document.getElementById("signup-button").onclick = () => {
    root.style.setProperty("--show-signup", "block");
};

document.getElementById("exit-signup").onclick = () => {
    root.style.setProperty("--show-signup", "none");
};

//login Menu
document.getElementById("login-button").onclick = () => {
    root.style.setProperty("--show-login", "block");
};

document.getElementById("exit-login").onclick = () => {
    root.style.setProperty("--show-login", "none");
};