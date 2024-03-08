let count = 1;

const interval = setInterval(() => {
	const allSections = document.querySelectorAll(".items section");
	allSections.forEach((section) => {
		section.classList.remove("highlighted");
	});
	if (count > allSections.length) {
		count = 1;
		//clearInterval(interval);
		//return;
	}
	document.querySelector(`.items section:nth-child(${count})`).classList.add("highlighted");
	//console.log(count);
	count++;
}, 500);

/*
const interval = setInterval(()=>{
    const currentSection = document.querySelectorAll(".items section.highlighted");
    let nextSection = currentSection.nextElementSibling;
    if (nextSection == null) {
        nextSection = document.querySelector(".items section");
    }
    currentSection.classList.remove("highlighted");
    nextSection.classList.add("highlighted");
}, 500);
*/

const slideForward = () => {
	console.log("forward");
	//ad the end of images
	if (getCurrentImage().nextElementSibling == null) {
		slide(document.querySelector("#preview img"));
	} else {
		slide(getCurrentImage().nextElementSibling);
	}
};

const slideBackward = () => {
	console.log("Backward");
	if (getCurrentImage().previousElementSibling == null) {
		slide(document.querySelector("#preview :last-child"));
	} else {
		slide(getCurrentImage().previousElementSibling);
	}
};

const slide = (nextImage) => {
	getCurrentImage().classList.add("hidden");
	nextImage.classList.remove("hidden");
};

const getCurrentImage = () => {
	return document.querySelector("#preview :not(.hidden");
};

document.getElementById("forward-arrow").onclick = slideForward;
document.getElementById("backward-arrow").onclick = slideBackward;

document.querySelectorAll("#thumbs img").forEach((img, index) => {
	img.onclick = () => {
		slide(document.querySelector(`#preview :nth-child(${index + 1})`));
	};
});
