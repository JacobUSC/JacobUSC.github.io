/**
 * Author: Jacob Russell
 * Description: Contact Me Form
 * For: Every Pages
 */

const showContact = (e) => {
	e.preventDefault();
	root.style.setProperty("--menu", "none");
	showOverlay();
	root.style.setProperty("--show-contact", "block");
};

const closeContact = () => {
	root.style.setProperty("--show-contact", "none");
	root.style.setProperty("--show-overlay", "none");
};

const showEmailResult = async (e) => {
	e.preventDefault();
	const result = document.getElementById("contact-result");
	let response = await getEmailResult();
	if (response.status == 200) {
		result.innerHTML = "Email Successfully Sent";
	} else {
		result.innerHTML = "Sorry, your email was not sent.";
	}
};

const getEmailResult = async (e) => {
	const form = document.getElementById("contact-form");
	const formData = new FormData(form);
	const object = Object.fromEntries(formData);
	const json = JSON.stringify(object);
	const result = document.getElementById("contact-result");
	result.innerHTML = "Please wait...";
	try {
		const response = await fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: json,
		});
		return response;
	} catch (error) {
		console.log(error);
		document.getElementById("result").innerHTML = "Sorry your email couldn't be sent";
	}
};

document.getElementById("contact-form").onsubmit = showEmailResult;
document.getElementById("open-contact").onclick = showContact;
document.getElementById("close-contact").onclick = closeContact;
