//changing image
const changeImage = () => {
    // used part of this code from here https://css-tricks.com/snippets/javascript/random-hex-color/
    const randomColor = Math.floor(Math.random()*16777215).toString(16);

    const image = document.getElementById("changing-image");
    image.src = "https://place-hold.it/200/" + randomColor;
}

document.getElementById("changing-image").onclick = changeImage;

//rotating image
let slider = document.getElementById("rotate-slider");

slider.oninput = function() {
    const root = document.querySelector(":root");
    root.style.setProperty("--rotating-amount", this.value + "deg");
}

//stars
function addStar() {
    const starArea = document.getElementById("stars");
    const star = document.createElement("img");
    star.classList.add("star");
    star.src = "images/star.png";
    starArea.append(star);
}

document.getElementById("stars").onclick = addStar;
