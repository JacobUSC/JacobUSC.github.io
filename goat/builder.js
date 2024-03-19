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

let deck = [];
let extra = [];
const deckArea = document.getElementById("deck-area");
const extraArea = document.getElementById("fusion-deck-area");

const deckCheck = (nCard) => {
	if (nCard == "") return false;
	if (nCard.type == "Fusion Monster") return false;
	let test = true;
	try {
		if (nCard.banlist_info.ban_goat == "Banned") test = false;
		if (nCard.banlist_info.ban_goat == "Limited") {
			deck.forEach((dCard) => {
				if (nCard == dCard) test = false;
			});
		}
		if (nCard.banlist_info.ban_goat == "Semi-Limited") {
			let sOccurrence = 0;
			deck.forEach((dCard) => {
				if (nCard == dCard) {
					++sOccurrence;
				}
			});
			if (sOccurrence >= 2) test = false;
		}
	} catch {
		//message
	}
	if (test == false) {
		return false;
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
	updateSize();
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
	updateSize();
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
	image.oncontextmenu = (ev) => {
		ev.preventDefault;
		if (card.type == "Fusion Monster") {
			extra.splice(extra.indexOf(card), 1);
			extraRefresh();
		} else {
			deck.splice(deck.indexOf(card), 1);
			deckRefresh();
		}
		return false;
	};
	return image;
};

const updateSize = () => {
	const deckHeight = document.getElementById("deck").offsetHeight;
	root.style.setProperty("--card-pool-size", `${deckHeight}px`);
	root.style.setProperty("--card-list-size", `${deckHeight - 110}px`);
	document.getElementById("card-count").innerHTML = `Card Count: ${deck.length}`;
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
		//make popup
	}
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
		//make popup
	}
};

const stopDefault = (ev) => {
	ev.preventDefault();
};

const showUpload = () => {
	const feature = document.getElementById("featured-card");
	const message = document.getElementById("message");
	message.innerHTML = "";
	feature.innerHTML = "";
	let fCards = [];
	deck.forEach((card) => {
		if (!fCards.includes(card)) {
			fCards.push(card);
		}
	});
	extra.forEach((card) => {
		if (!fCards.includes(card)) {
			fCards.push(card);
		}
	});
	fCards.forEach((card) => {
		const cardOption = document.createElement("option");
		cardOption.value = card.id;
		cardOption.innerHTML = card.name;
		feature.append(cardOption);
	});
	root.style.setProperty("--show-upload", "block");
};

const hideUpload = () => {
	root.style.setProperty("--show-upload", "none");
};

const uploadDeck = (ev) => {
	ev.preventDefault();
	const message = document.getElementById("message");
	if (deck.length < 40) {
		message.innerHTML = "Deck must have at least 40 cards to be valid";
		return;
	}
	let subDeck = [];
	deck.forEach((card) => {
		subDeck.push(card.id);
	});
	let subExtra = [];
	extra.forEach((card) => {
		subExtra.push(card.id);
	});
	const deckName = document.getElementById("deck-name").value;
	const userName = document.getElementById("user-name").value;
	const email = document.getElementById("user-email").value;
	const featuredCard = document.getElementById("featured-card").value;
	const desc = document.getElementById("deck-description").value;
	console.log(deckName);
	console.log(userName);
	console.log(email);
	console.log(featuredCard);
	console.log(desc);
	console.log("Deck cards ids");
	console.log(subDeck);
	console.log("Fusion Deck cards ids");
	console.log(subExtra);
	message.innerHTML = "Deck successfully submitted";
	setTimeout(() => {
		message.innerHTML = "";
	}, 2000);
};

deckArea.ondragover = stopDefault;
deckArea.ondrop = addCardDeck;
extraArea.ondragover = stopDefault;
extraArea.ondrop = addCardExtra;
document.getElementById("open-upload").onclick = showUpload;
document.getElementById("close-upload").onclick = hideUpload;
document.getElementById("upload-form").onsubmit = uploadDeck;
updateSize();
