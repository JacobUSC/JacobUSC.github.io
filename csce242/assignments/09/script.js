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
};

const ballDisplay = () => {
	const yoga = document.getElementById("yoga");
	const ballBounce = document.getElementById("ball-bounce");
	if (!yoga.classList.contains("hide")) {
		yoga.classList.toggle("hide");
	}
	if (ballBounce.classList.contains("hide")) {
		ballBounce.classList.toggle("hide");
	}
};

// keeps track of the ball going up or down
let direction = true;
// keeps track of the ball's position
let ballPosition = 0;
// function for starting and stopping the interval
let startBall;

const moveBall = (e) => {
	e.preventDefault();
	const root = document.querySelector(":root");
	const ball = document.getElementById("ball");
	const zone = document.getElementById("zone");
	if (e.target.innerHTML == "start") {
		e.target.innerHTML = "stop";
		startBall = setInterval(() => {
			if (ballPosition == 725) {
				direction = false;
			}
			if (ballPosition == 0) {
				direction = true;
			}
			if (direction) {
				ballPosition++;
			} else {
				ballPosition--;
			}
			root.style.setProperty("--ball-position", `${ballPosition}px`);
		}, 1);
	} else {
		e.target.innerHTML = "start";
		clearInterval(startBall);
	}
};

const yogaDisplay = () => {
	const yoga = document.getElementById("yoga");
	const ballBounce = document.getElementById("ball-bounce");
	if (!ballBounce.classList.contains("hide")) {
		ballBounce.classList.toggle("hide");
	}
	if (yoga.classList.contains("hide")) {
		yoga.classList.toggle("hide");
	}
};

const showDetail = (e) => {
	console.log(e.target.getAttribute("rel"));
	e.innerHTML += `<p>${e.target.getAttribute("rel")}</p>`;
};

document.querySelectorAll("#image-list li").forEach((li) => {
	li.onclick = showDetail;
});
document.getElementById("menu-button").onclick = menuDisplay;
document.getElementById("ball-button").onclick = ballDisplay;
document.getElementById("start-stop").onclick = moveBall;
document.getElementById("yoga-button").onclick = yogaDisplay;
