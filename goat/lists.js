/**
 * Author: Jacob Russell
 * Description: List user submitted decks
 * For: lists.html
 */

let currentRange = 0;

const getDecks = async () => {
	try {
		return (await fetch("https://goat-server.onrender.com/api/decks")).json();
	} catch (error) {
		console.log(error);
		return "";
	}
}

const getDeck = (deck) => {
	const section = document.createElement("section");
	section.classList.add("deck-list");
	const titleH3 = document.createElement("h3");
	titleH3.innerHTML = deck.deckName;
	section.append(titleH3);
	const nameH4 = document.createElement("h4");
	nameH4.innerHTML = deck.userName;
	section.append(nameH4);
	const featuredCardImg = document.createElement("img");
	featuredCardImg.classList.add("deck-list-card");
	featuredCardImg.src = `images/cards-hd/${deck.featuredCardImg}.jpg`;
	section.append(featuredCardImg);
	const descriptionP = document.createElement("p");
	descriptionP.innerHTML = deck.description;
	section.append(descriptionP);
	section.onclick = (event) => {
		event.preventDefault();
		const deckView = document.getElementById("deck-view");
		deckView.innerHTML = "";
		const closeButtonWrapper = document.createElement("div");
		closeButtonWrapper.id = "close-button-wrapper";
		const closeButton = document.createElement("button");
		closeButton.innerHTML = "X";
		closeButton.onclick = () => {
			//todo
			deckView.innerHTML = "";
		};
		closeButtonWrapper.append(closeButton);
		deckView.append(closeButtonWrapper);
		const headerWrapper = document.createElement("div");
		const titleH2 = document.createElement("h2");
		titleH2.innerHTML = deck.deckName;
		headerWrapper.append(titleH2);
		const infoButton = document.createElement("button");
		infoButton.innerHTML = "";
		infoButton.onclick = (event) => {
			event.preventDefault();
			//title
			//username
			//email
			//description
			//featured card
		};
		headerWrapper.append(infoButton);
		editButton = document.createElement("button");
		editButton.innerHTML = "&#9998;";
		editButton.onclick = (event) => {
			event.preventDefault();
			//open editor with deck
		}
		headerWrapper.append(editButton);
		deleteButton = document.createElement("button");
		deleteButton.innerHTML = "&#128465;";
		deleteButton.onclick = async (event) => {
			event.preventDefault();
			let response = await fetch('https://goat-server.onrender.com/api/decks/${deck._id}', {
				method:"DELETE",
				headers:{"Content-Type":"application/json;charset=utf-8"}
			});
			if (response.status != 200) {
				//error message
				return;
			}
			let result = await response.json();
			showDecks(currentRange);
			//close
		};
		headerWrapper.append(deleteButton);
		deckView.append(headerWrapper);
		const deckArea = document.createElement("div");
		deck.deck.forEach(card => {
			const cardImage = document.createElement("img");
			cardImage.src = `images/cards/${card}.jpg`;
			cardImage.classList.add(""); //todo
			cardImage.onclick = (event) => {
				event.preventDefault();
				//popup card
			};
			deckArea.append(cardImage);
		});
		deckView.append(deckArea);
		const extraArea = document.createElement("div");
		if (!(deck.extra === undefined) || !(deck.extra == 0)) {
			deck.extra.forEach(card => {
			const cardImage = document.createElement("img");
			cardImage.src = `images/cards/${card}.jpg`;
			cardImage.classList.add(""); //todo
			cardImage.onclick = (event) => {
				event.preventDefault();
				//popup card
			};
			deckArea.append(cardImage);
			});
		}
		deckView.append(extraArea);
	};
	return section;
};

const showDecks = async (range) => {
	const decksJSON = await getDecks();
	const deckArea = document.getElementById("list-area");
	deckArea.innerHTML = "";
	deckArea.append(getDeck(decksJSON[range]));
	deckArea.append(getDeck(decksJSON[++range]));
	deckArea.append(getDeck(decksJSON[++range]));
};

const nextPage = () => {
	currentRange = currentRange + 3;
	showDecks(currentRange);
};

const prevPage = () => {
	currentRange = currentRange + 3;
	showDecks(currentRange);
};

showDecks(currentRange);