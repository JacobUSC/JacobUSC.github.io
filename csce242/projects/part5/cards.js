/**
 * Card list is obtained from the Yu-Gi-Oh! API by YGOPRODeck
 * Using API v7
 * https://ygoprodeck.com/api-guide/
 */

const getCards = async () => {
	const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?&enddate=2005-09-30&dateregion=tcg";
	try {
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		console.log(error);
	}
};

const showCards = async () => {
	const cards = await getCards();
	const cardList = document.getElementById("card-list");
	cards.data.forEach((card) => {
		const image = document.createElement("img");
		image.classList.add("list-card");
		image.src = `images/cards/${card.id}.jpg`;
		image.onclick = () => {
			const root = document.querySelector(":root");
			root.style.setProperty("--show-overlay", "block");
			const bigCardDiv = document.getElementById("big-card");
			bigCardDiv.innerHTML = "";
			const bigCardImg = document.createElement("img");
			bigCardImg.src = image.src;
			bigCardImg.classList.add("big-card");
			bigCardDiv.append(image);
			root.style.setProperty("--show-big-card", "block");
			bigCardDiv.onclick = () => {
				root.style.setProperty("--show-big-card", "none");
				root.style.setProperty("--show-overlay", "none");
			};
		};
		cardList.append(image);
	});
	console.log("====Complete====");
};

showCards();
