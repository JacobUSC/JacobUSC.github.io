/**
 * Author: Jacob Russell
 * Description: Deck Builder
 * For: builder.html
 */

/**
 * Card list is obtained from the Yu-Gi-Oh! API by YGOPRODeck
 * Using API v7
 * https://ygoprodeck.com/api-guide/
 */

const deck = [];
const extra = [];
const deckArea = document.getElementById("deck-area");
const extraArea = document.getElementById("fusion-deck-area");

const deckCheck = (nCard) => {
	if (nCard == "") return false;
	if (nCard.type == "Fusion Monster") return false;
	//fix
	if ("banlist_info" in nCard) {
		if (nCard.banlist_info.ban_goat == "Banned") return false;
		if (nCard.banlist_info.ban_goat == "Limited") {
			deck.forEach((dCard) => {
				if (nCard == dCard) return false;
			});
		}
		if (nCard.banlist_info.ban_goat == "Semi-Limited") {
			let sOccurrence = 0;
			deck.forEach((dCard) => {
				if (nCard == dCard) {
					++sOccurrence;
				}
			});
			if (sOccurrence >= 2) return false;
		}
	}
	let occurrence = 0;
	deck.forEach((dCard) => {
		if (nCard == dCard) {
			++occurrence;
		}
	});
	if (occurrence >= 3) return false;
	return true;
};

const extraCheck = (nCard) => {
	if (nCard == "") return false;
	if (nCard.type != "Fusion Monster") return false;
	let occurrence = 0;
	extra.forEach((dCard) => {
		if (nCard == dCard) {
			++occurrence;
		}
	});
	if (occurrence >= 3) return false;
	return true;
};

const deckRefresh = () => {
	deck.sort((a, b) => {
		const x = a.name.toLowerCase();
		const y = b.name.toLowerCase();
		if (x > y) return 1;
		if (x < y) return -1;
		return 0;
	});
	deckArea.innerHTML = "";
	deck.forEach((card) => {
		deckArea.append(getDeckCardHTML(card));
	});
};

const extraRefresh = () => {
	extra.sort((a, b) => {
		const x = a.name.toLowerCase();
		const y = b.name.toLowerCase();
		if (x > y) return 1;
		if (x < y) return -1;
		return 0;
	});
	extraArea.innerHTML = "";
	extra.forEach((card) => {
		extraArea.append(getDeckCardHTML(card));
	});
};

const getDeckCardHTML = (card) => {
	const image = document.createElement("img");
	image.classList.add("deck-card");
	image.src = `images/cards/${card.id}.jpg`;
	image.onclick = () => {
		const bigCardDiv = document.getElementById("big-card");
		bigCardDiv.innerHTML = "";
		const bigCardImg = document.createElement("img");
		bigCardImg.src = `images/cards-hd/${card.id}.jpg`;
		bigCardImg.classList.add("big-card");
		bigCardDiv.append(bigCardImg);
		root.style.setProperty("--show-big-card", "block");
		bigCardDiv.onclick = () => {
			root.style.setProperty("--show-big-card", "none");
		};
	};
	return image;
};

const updateSize = () => {
	const deckHeight = document.getElementById("deck").offsetHeight;
	root.style.setProperty("--card-pool-size", `${deckHeight}px`);
	root.style.setProperty("--card-list-size", `${deckHeight - 110}px`);
};

const addCardDeck = (ev) => {
	const cardID = ev.dataTransfer.getData("cardID");
	let card = "";
	cards.forEach((cCard) => {
		if (cCard.id == cardID) {
			card = cCard;
		}
	});
	if (deckCheck(card)) {
		deck.push(card);
		deckRefresh();
	} else {
		console.log("invalid card");
		//make popup
	}
	updateSize();
};

const addCardExtra = (ev) => {
	const cardID = ev.dataTransfer.getData("cardID");
	let card = "";
	cards.forEach((cCard) => {
		if (cCard.id == cardID) {
			card = cCard;
		}
	});
	if (extraCheck(card)) {
		extra.push(card);
		extraRefresh();
	} else {
		console.log("invalid card");
		//make popup
	}
	updateSize();
};

const stopDefault = (ev) => {
	ev.preventDefault();
};

const showUpload = () => {
	root.style.setProperty("--show-upload", "block");
};

const hideUpload = () => {
	root.style.setProperty("--show-upload", "none");
};

deckArea.ondragover = stopDefault;
deckArea.ondrop = addCardDeck;
extraArea.ondragover = stopDefault;
extraArea.ondrop = addCardExtra;
document.getElementById("open-upload").onclick = showUpload;
document.getElementById("close-upload").onclick = hideUpload;
updateSize();
