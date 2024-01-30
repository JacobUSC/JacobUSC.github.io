const doStuff = () => {
    alert("doing stuff");
    const messageP = document.getElementById("message");
    messageP.innerHTML = "surprise text!";
    messageP.classList.add("special");
};

const hideCar = () => {
    document.getElementById("car").classList.add("hidden");
};

document.getElementById("btn-click").onclick = doStuff;
document.getElementById("car").onclick = hideCar;