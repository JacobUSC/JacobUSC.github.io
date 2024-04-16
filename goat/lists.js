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
        //close button
        //title
        //edit button
        editButton = document.createElement("button");
        editButton.innerHTML = "&#9998;";
        editButton.onclick = (event) => {
			event.preventDefault();
            //open editor with deck
        }
        //delete button 
        deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#128465;";
        deleteButton.onclick = async (event) => {
            event.preventDefault();
            let response = await fetch('https://goat-server.onrender.com/api/decks/${deck._id}', {
                method:"DELETE",
                headers:{"Content-Type":"application/json;charset=utf-8"}
            });
            if (response.status != 200) {
                //error message;
                return;
            }
            let result = await response.json();
            showDecks(currentRange);
            //close
        };
        //deck
        //fusion deck
        //username
        //email
        //description
        //featured card
        //todo
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