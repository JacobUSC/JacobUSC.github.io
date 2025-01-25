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
    const error = document.getElementById("deck-error");
    error.innerHTML = "";
    if (nCard == "") {
        error.innerHTML = "Error Invalid Card";
        return false;
    }
    if (nCard.type == "Fusion Monster") {
        error.innerHTML = "Cannot Add Fusion Monster To Main Deck";
        return false;
    }
    let test = true;
    try {
        if (nCard.banlist_info.ban_goat == "Banned") {
            error.innerHTML = "Card is Banned";
            test = false;
        }
        if (nCard.banlist_info.ban_goat == "Limited") {
            deck.forEach((dCard) => {
                if (nCard == dCard) {
                    error.innerHTML = "Card is Limited to 1 per deck";
                    test = false;
                }
            });
        }
        if (nCard.banlist_info.ban_goat == "Semi-Limited") {
            let sOccurrence = 0;
            deck.forEach((dCard) => {
                if (nCard == dCard) {
                    ++sOccurrence;
                }
            });
            if (sOccurrence >= 2) {
                error.innerHTML = "Card is Limited to 2 per deck";
                test = false;
            }
        }
    } catch {
        // This needs to do nothing
        // The api I read the card data from only has the banlist_info on cards that are on the ban list, non ban list cards do not have this
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
    if (occurrence >= 3) {
        error.innerHTML = "There is already the maximum amount(3) of this card in the deck";
        return false;
    }
    return true;
};

const extraCheck = (nCard) => {
    if (nCard == "") {
        window.alert("Error Invalid Card");
        return false;
    }
    if (nCard.type != "Fusion Monster") {
        window.alert("Cannot Add non-Fusion Monster to the Fusion Deck");
        return false;
    }
    let occurrence = 0;
    extra.forEach((dCard) => {
        if (nCard == dCard) {
            ++occurrence;
        }
    });
    if (occurrence >= 3) {
        window.alert("There is already the maximum amount(3) of this card in the deck");
        return false;
    }
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
    }
};

const stopDefault = (ev) => {
    ev.preventDefault();
};

const showUpload = () => {
    const feature = document.getElementById("featuredCard");
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

const uploadDeck = async (event) => {
    event.preventDefault();
    const message = document.getElementById("message");
    if (deck.length < 40) {
        message.innerHTML = "Deck must have at least 40 cards to be valid";
        return;
    }
    let deckIDs = [];
    deck.forEach((card) => {
        deckIDs.push(card.id);
    });
    let extraIDs = [];
    extra.forEach((card) => {
        extraIDs.push(card.id);
    });
    const id = document.getElementById("_id").value;
    const deckName = document.getElementById("deckName").value;
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const featuredCard = document.getElementById("featuredCard").value;
    const description = document.getElementById("description").value;
    const submitDeck = JSON.stringify({deckName, userName, email, featuredCard, description, deck: deckIDs, extra: extraIDs});
    let response;
    if (id.trim() == "") {
        response = await fetch("https://goat-server.onrender.com/api/decks", {
            method: "POST",
            headers:{"Content-Type":"application/json;charset=utf-8"},
            body: submitDeck
        });
    } else {
        response = await fetch("https://goat-server.onrender.com/api/decks/" + id, {
            method: "PUT",
            headers:{"Content-Type":"application/json;charset=utf-8"},
            body: submitDeck
        });
    }
    console.log(response);
    if (response.status != 200) {
        message.innerHTML = "error submitting deck"
    } else {
        message.innerHTML = "Deck successfully submitted";
        setTimeout(() => {
            message.innerHTML = "";
            window.location.href = "lists.html";
        }, 2000);
    }
};

const getDeckFromDB = async (id) => {
    try {
        return (await fetch(`https://goat-server.onrender.com/api/decks/${id}`)).json()
    } catch (error) {
        console.log(error);
        return 0;
    }
};

const initDeck = async (deckGet) => {
    document.getElementById("_id").value = deckGet._id;
    document.getElementById("deckName").value = deckGet.deckName;
    document.getElementById("userName").value = deckGet.userName;
    document.getElementById("email").value = deckGet.email;
    document.getElementById("featuredCard").value = deckGet.featuredCard;
    document.getElementById("description").value = deckGet.description;
    deckGet.deck.forEach((cardID) => {
        cards.forEach((card) => {
            if (cardID == card.id) {
                if (deckCheck(card)) {
                    deck.push(card);
                    deckRefresh();
                }
            };
        });
    });
    deckGet.extra.forEach((cardID) => {
        cards.forEach((card) => {
            if (cardID == card.id) {
                if (extraCheck(card)) {
                    extra.push(card);
                    extraRefresh();
                }
            };
        });
    });
    updateSize();
    // this fixes an issue where the deck doesn't load
    if (deck.length == 0) {
        location.reload();
    }
};

const checkParams = async () => {
    const queryString = decodeURIComponent(window.location.search);
    if (queryString == "") {
        return;
    }
    id = queryString.substring(7);
    const deckGet = await getDeckFromDB(id);
    initDeck(deckGet);
};



deckArea.ondragover = stopDefault;
deckArea.ondrop = addCardDeck;
extraArea.ondragover = stopDefault;
extraArea.ondrop = addCardExtra;
document.getElementById("open-upload").onclick = showUpload;
document.getElementById("close-upload").onclick = hideUpload;
document.getElementById("upload-form").onsubmit = uploadDeck;
updateSize();
checkParams();
