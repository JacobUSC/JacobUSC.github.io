/**
 * Author: Jacob Russell
 * Loads card data from ygoprodeck
 * Generates a card list
 * Filters and searches the card list
 */

/**
 * Card list is obtained from the Yu-Gi-Oh! API by YGOPRODeck
 * Using API v7
 * https://ygoprodeck.com/api-guide/
 */

const cards = [];

const getCards = async () => {
	const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?&enddate=2005-09-30&dateregion=tcg";
	try {
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		console.log(error);
	}
};

const assignCards = async () => {
	const cardsJSON = await getCards();
	cardsJSON.data.forEach((card) => {
		cards.push(card);
	});
};

const showCardsFirst = async () => {
	await assignCards();
	showCards();
};

const showCards = () => {
	const cardList = document.getElementById("card-list");
	cards.forEach((card) => {
		cardList.append(getCardHTML(card));
	});
};

const getCardHTML = (card) => {
	const image = document.createElement("img");
	image.classList.add("list-card");
	image.src = `images/cards/${card.id}.jpg`;
	image.onclick = () => {
		root.style.setProperty("--show-overlay", "block");
		const bigCardDiv = document.getElementById("big-card");
		bigCardDiv.innerHTML = "";
		const bigCardImg = document.createElement("img");
		bigCardImg.src = `images/cards-hd/${card.id}.jpg`;
		bigCardImg.classList.add("big-card");
		bigCardDiv.append(bigCardImg);
		root.style.setProperty("--show-big-card", "block");
		bigCardDiv.onclick = () => {
			root.style.setProperty("--show-big-card", "none");
			root.style.setProperty("--show-overlay", "none");
		};
	};
	return image;
};

const openSort = () => {
	root.style.setProperty("--show-overlay", "block");
	root.style.setProperty("--show-sort", "block");
};

const closeSort = () => {
	root.style.setProperty("--show-sort", "none");
	root.style.setProperty("--show-overlay", "none");
};

const sort = (e) => {
	e.preventDefault();
	const cardsSorted = [];
	const cardList = document.getElementById("card-list");
	cardList.innerHTML = "";
	const form = document.getElementById("sort-form");
	const search = form.elements["search-text"].value.trim().toLowerCase();
	cards.forEach((card) => {
		if ((!search == "" && card.name.toLowerCase().includes(search)) || card.desc.toLowerCase().includes(search)) {
			cardsSorted.push(card);
			return;
		}
	});
	cardsSorted.forEach((card) => {
		cardList.append(getCardHTML(card));
	});
};

root.style.setProperty("--card-list-size", `${window.innerHeight - 200}px`);
root.style.setProperty("--card-list-size-mobile", `${window.innerHeight - 300}px`);
showCardsFirst();

document.getElementById("open-sort-button").onclick = openSort;
document.getElementById("sort-form").onsubmit = sort;
document.getElementById("close-sort").onclick = closeSort;
