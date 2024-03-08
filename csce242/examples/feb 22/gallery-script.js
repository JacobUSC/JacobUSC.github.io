document.querySelectorAll(".items section").forEach((section) => {
	section.onclick = () => {
		document.getElementById("dialog").style.display = "block";
	};
});
