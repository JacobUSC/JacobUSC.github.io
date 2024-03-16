/**
 * Author: Jacob Russell
 * Description:
 * Loads card data from ygoprodeck.
 * Generates a card list.
 * Filters and searches the card list.
 * For: cards.html builder.html
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
	image.draggable = "true";
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
	image.ondragstart = (ev) => {
		ev.dataTransfer.setData("cardID", card.id);
	};
	return image;
};

const openFilter = () => {
	root.style.setProperty("--show-filter", "block");
};

const closeFilter = () => {
	root.style.setProperty("--show-filter", "none");
};

const filter = (e) => {
	e.preventDefault();
	const cardsSorted = [];
	const cardList = document.getElementById("card-list");
	cardList.innerHTML = "";
	const form = document.getElementById("filter-form");
	const search = form.elements["search-text"].value.trim().toLowerCase();
	const cardType = form.elements["card-type"].value;
	const monsterType = form.elements["monster-type"].value;
	const spellType = form.elements["spell-type"].value;
	const trapType = form.elements["trap-type"].value;
	const monsterAttr = form.elements["monster-attr"].value;
	const monsterRace = form.elements["monster-race"].value;
	const maxAtk = form.elements["atk-max"].value;
	const minAtk = form.elements["atk-min"].value;
	const maxDef = form.elements["def-max"].value;
	const minDef = form.elements["def-min"].value;
	cards.forEach((card) => {
		if (search != "") {
			//better search logic
			if (!card.name.toLowerCase().includes(search) && !card.desc.toLowerCase().includes(search)) return;
		}
		if (cardType != "None") {
			if (!card.type.includes(cardType)) return;
			if (monsterType != "None" && !card.type.includes(monsterType)) return;
			if (spellType != "None" && card.race != spellType) return;
			if (trapType != "None" && card.race != trapType) return;
			if (cardType.includes("Monster")) {
				if (monsterAttr != "None" && monsterAttr != card.attribute) return;
				if (monsterRace != "None" && monsterRace != card.race) return;
				if (maxAtk != 0 && card.atk >= maxAtk) return;
				if (minAtk != 0 && card.atk < minAtk) return;
				if (maxDef != 0 && card.def >= maxDef) return;
				if (minDef != 0 && card.def < minDef) return;
			}
		}
		cardsSorted.push(card);
	});
	if (cardsSorted.length == 0) {
		window.alert("Invalid Filter Criteria");
		//make popup
	} else {
		cardsSorted.forEach((card) => {
			cardList.append(getCardHTML(card));
		});
		closeFilter();
	}
};

root.style.setProperty("--card-list-size", `${window.innerHeight - 200}px`);
root.style.setProperty("--card-list-size-mobile", `${window.innerHeight - 300}px`);
showCardsFirst();

document.getElementById("open-filter").onclick = openFilter;
document.getElementById("filter-form").onsubmit = filter;
document.getElementById("close-filter").onclick = closeFilter;
