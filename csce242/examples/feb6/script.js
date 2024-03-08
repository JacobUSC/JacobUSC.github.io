const showHideNav = () => {
	document.getElementById("nav-items").classList.toggle("hide-small");
};

const changeP = (e) => {
	e.preventDefault();
	document.getElementById("display").textContent = "Hello";
};

const showMood = () => {
	const color = document.getElementById("txt-mood").value.toLowerCase().trim();
	const moodP = document.getElementById("mood");
	let mood = "unknown";

	if (color == "red") {
		mood = "angry";
	} else if (color == "blue") {
		mood = "sad";
	} else if (color == "yellow") {
		mood = "yellow";
	}

	moodP.innerHTML = `you are ${mood}`;
};

const evalForm = (e) => {
	e.preventDefault();
	console.log("Buy Sell Trade");
};

document.getElementById("hamburger").onclick = showHideNav;
document.getElementById("link-click"), (onclick = changeP);
document.getElementById("txt-mood").onkeyup = showMood;
document.getElementById("form").onsubmit = evalForm;
