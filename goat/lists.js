/**
 * Author: Jacob Russell
 * Description: List user submitted decks
 * For: lists.html
 */

let currentRange = 0;
let currentPage = 1;
let searchDecks = [];

const getDecks = async () => {
	try {
		return (await fetch("https://goat-server.onrender.com/api/decks")).json();
	} catch (error) {
		console.log(error);
		return 0;
	}
}

const getDeck = (deck) => {
	const section = document.createElement("section");
	section.classList.add("deck-list");
	const titleH3 = document.createElement("h3");
	titleH3.innerHTML = deck.deckName;
	section.append(titleH3);
	const nameH4 = document.createElement("h4");
	nameH4.innerHTML = `Created By ${deck.userName}`;
	section.append(nameH4);
	const featuredCardImg = document.createElement("img");
	featuredCardImg.classList.add("deck-list-card");
	featuredCardImg.src = `images/cards-hd/${deck.featuredCard}.jpg`;
	section.append(featuredCardImg);
	const descriptionP = document.createElement("p");
	descriptionP.innerHTML = deck.description;
	section.append(descriptionP);
	section.onclick = (event) => {
		event.preventDefault();
		const deckView = document.getElementById("deck-view");
		deckView.innerHTML = "";
		const closeButtonWrapper = document.createElement("p");
		closeButtonWrapper.classList.add("modal-close");
		const closeButton = document.createElement("button");
		closeButton.innerHTML = "X";
		closeButton.onclick = () => {
			root.style.setProperty("--show-deck", "none");
			deckView.innerHTML = "";
		};
		closeButtonWrapper.append(closeButton);
		deckView.append(closeButtonWrapper);
		const headerWrapper = document.createElement("div");
		headerWrapper.id = "deck-header";
		const titleH2 = document.createElement("h1");
		titleH2.innerHTML = deck.deckName;
		headerWrapper.append(titleH2);
		const infoButton = document.createElement("button");
		infoButton.innerHTML = "&#9432;";
		infoButton.onclick = (event) => {
			event.preventDefault();
			window.alert(`Deck Name: ${deck.deckName}\nDeck Creator: ${deck.userName}\nDescription: ${deck.description}`);
		};
		headerWrapper.append(infoButton);
		editButton = document.createElement("button");
		editButton.innerHTML = "&#9998;";
		editButton.onclick = (event) => {
			event.preventDefault();
			const queryString = "?para1=" + deck._id;
			window.location.href = "builder.html" + queryString;
		}
		headerWrapper.append(editButton);
		deleteButton = document.createElement("button");
		deleteButton.innerHTML = "&#128465;";
		deleteButton.onclick = async (event) => {
			event.preventDefault();
			let response = await fetch(`https://goat-server.onrender.com/api/decks/${deck._id}`, {
				method:"DELETE",
				headers:{"Content-Type":"application/json;charset=utf-8"}
			});
			if (response.status != 200) {
				window.alert("Error Deleting Deck");
				return;
			}
			let result = await response.json();
			showDecks(currentRange);
			root.style.setProperty("--show-deck", "none");
		};
		headerWrapper.append(deleteButton);
		deckView.append(headerWrapper);
		const deckArea = document.createElement("div");
		deckArea.id = "deck-area";
		deck.deck.forEach(card => {
			const cardImage = document.createElement("img");
			cardImage.src = `images/cards/${card}.jpg`;
			cardImage.classList.add("deck-card");
			cardImage.onclick = (event) => {
				event.preventDefault();
				window.open(`images/cards-hd/${card}.jpg`);
			};
			deckArea.append(cardImage);
		});
		deckView.append(deckArea);
		const extraArea = document.createElement("div");
		extraArea.id = "extra-area";
		if (!(deck.extra === undefined) || !(deck.extra == 0)) {
			deck.extra.forEach(card => {
			const cardImage = document.createElement("img");
			cardImage.src = `images/cards/${card}.jpg`;
			cardImage.classList.add("deck-card");
			cardImage.onclick = (event) => {
				event.preventDefault();
				window.open(`images/cards-hd/${card}.jpg`);
			};
			extraArea.append(cardImage);
			});
		}
		deckView.append(extraArea);
		root.style.setProperty("--show-deck", "block");
	};
	return section;
};

const showDecks = async (range) => {
	if (range < 0) return;
	const deckArea = document.getElementById("list-area");
	if (searchDecks.length != 0) {
		deckArea.innerHTML = "";
		try {
			deckArea.append(getDeck(searchDecks[range]));
		} catch {
			previousPage();
			return;
		}
		try {
			deckArea.append(getDeck(searchDecks[++range]));
		} catch {
			return;
		}
		try {
			deckArea.append(getDeck(searchDecks[++range]));
		} catch {
			return;
		}
	} else {
		const decksJSON = await getDecks();
		deckArea.innerHTML = "";
		if (decksJSON == 0) {
			deckArea.innerHTML = "error no decks found";
		} else {
			try {
			deckArea.append(getDeck(decksJSON[range]));
			} catch {
				previousPage();
				return;
			}
			try {
			deckArea.append(getDeck(decksJSON[++range]));
			} catch {
				return;
			}
			try {
			deckArea.append(getDeck(decksJSON[++range]));
			} catch {
				return;
			}
		}
	}
};

const nextPage = () => {
	currentRange = currentRange + 3;
	const pageNumber = document.getElementById("page-number");
	++currentPage;
	pageNumber.innerHTML = `Page ${currentPage}`;
	showDecks(currentRange);
};

const previousPage = () => {
	currentRange = currentRange - 3;
	if (currentRange < 0) {
		currentRange = 0;
		return;
	}
	const pageNumber = document.getElementById("page-number");
	--currentPage;
	pageNumber.innerHTML = `Page ${currentPage}`;
	showDecks(currentRange);
};

const openSearch = () => {
	root.style.setProperty("--show-search", "block");
};

const search = async () => {
	const deckName = document.getElementById("deck-name").value;
	const userName = document.getElementById("user-name").value;
	const errorMessage = document.getElementById("error-message");
	errorMessage.innerHTML = "";
	searchDecks = [];
	if (deckName == "" && userName == "") {
		errorMessage.innerHTML = "No Search Criteria";
		return;
	}
	const decksJSON = await getDecks();
	if (deckName != "" && userName != "") {
		decksJSON.forEach((deck) => {
			if (deck.deckName.toLowerCase().includes(deckName.toLowerCase()) && deck.userName.toLowerCase().includes(userName.toLowerCase())) {
				searchDecks.push(deck);
			}
		});
	} else if (deckName == "" && userName != "") {
		decksJSON.forEach((deck) => {
			if (deck.userName.toLowerCase().includes(userName.toLowerCase())) {
				searchDecks.push(deck);
			}
		});
	} else if (deckName != "" && userName == "") {
		decksJSON.forEach((deck) => {
			if (deck.deckName.toLowerCase().includes(deckName.toLowerCase())) {
				searchDecks.push(deck);
			}
		});
	}
	if (searchDecks.length == 0) {
		errorMessage.innerHTML = "No Results Found";
		return;
	}
	currentRange = 0;
	showDecks(currentRange);
	closeSearch();
};

const closeSearch = () => {
	root.style.setProperty("--show-search", "none");
};

const clearSearch = () => {
	searchDecks = [];
	const deckName = document.getElementById("deck-name");
	const userName = document.getElementById("user-name");
	const errorMessage = document.getElementById("error-message");
	deckName.value = "";
	userName.value = "";
	errorMessage.innerHTML = "";
	currentRange = 0;
	showDecks(currentRange);
	closeSearch();
};

showDecks(currentRange);
document.getElementById("next-button").onclick = nextPage;
document.getElementById("previous-button").onclick = previousPage;
document.getElementById("open-search-button").onclick = openSearch;
document.getElementById("close-search-button").onclick = closeSearch;
document.getElementById("submit-search-button").onclick = search;
document.getElementById("clear-search-button").onclick = clearSearch;
