const menuDisplay = () => {
    const button = document.getElementById("button-text");
    // This only works with the actual UTF-8 Geometric Shape and not the decimal code.
    // I tried to use the decimal code with == and localCompare and neither worked.
    if (button.innerHTML == "▼") {
        // For some reason it does work here
        button.innerHTML = "&#9650";
    } else {
        // For some reason it does work here
        button.innerHTML = "&#9660";
    }
    document.getElementById("nav-list").classList.toggle("hide");
}

const commandDisplay = () => {
    if (!document.getElementById("yoga").classList.contains("hide")) {
        document.getElementById("yoga").classList.toggle("hide");
    }
    document.getElementById("command").classList.toggle("hide");
};

const commandRun = () => {
    const command = document.getElementById("command-box").value.toLowerCase().trim().slice(-1);
    const image = document.getElementById("command-img");
    if (command =='b') {
        image.src = "images/read.jpg";
    } else if (command == 'c') {
        image.src = "images/clown.jpg";
    } else if (command == 'p') {
        image.src = "images/birthday.jpg";
    } else if (command == 'r') {
        image.src = "images/rain.jpg";
    } else if (command == 's') {
        image.src = "images/shovel.jpg";
    } else if (command == 'w') {
        image.src = "images/work.jpg";
    }
};

const yogaDisplay = () => {
    if (!document.getElementById("command").classList.contains("hide")) {
        document.getElementById("command").classList.toggle("hide");
    }
    document.getElementById("yoga").classList.toggle("hide");
};

const yogaPose = () => {
    const pose = document.getElementById("yoga-slider").value;
    const image = document.getElementById("yoga-img");
    if (pose == 1) {
        image.src = "images/yoga1.jpg";
    } else if (pose == 2) {
        image.src = "images/yoga2.jpg";
    } else if (pose == 3) {
        image.src = "images/yoga3.jpg";
    }  else if (pose == 4) {
        image.src = "images/yoga4.jpg";
    }  else if (pose == 5) {
        image.src = "images/yoga5.jpg";
    } else if (pose == 6) {
        image.src = "images/yoga6.jpg";
    } else if (pose == 7) {
        image.src = "images/yoga7.jpg";
    } else if (pose == 8) {
        image.src = "images/yoga8.jpg";
    }
};

document.getElementById("menu-button").onclick = menuDisplay;
document.getElementById("command-button").onclick = commandDisplay;
document.getElementById("command-box").onkeyup = commandRun;
document.getElementById("yoga-button").onclick = yogaDisplay;
document.getElementById("yoga-slider").oninput = yogaPose;