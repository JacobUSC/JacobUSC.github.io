class Card {
    constructor(file, title, type, effect, rank, attribute, attack, defense, description) {
        this.file = file;
        this.title = title;
        this.type  = type;
        this.effect = effect;
        this.rank = rank;
        this.attribute = attribute;
        this.attack = attack;
        this.defense = defense;
        this.description = description;
    };

    get section() {
        const section = document.createElement("section");
        
        const h3 = document.createElement("h3");
        h3.innerHTML = this.title;
        section.append(h3);

        const image = document.createElement("img");
        image.src = `images/${this.file}`;
        image.classList.add("image-small");
        section.append(image);
        
        section.onclick = this.showHide.bind(this);
        section.classList.add("content");
        
        return section;
    };

    get modalSection() {
        const section = document.createElement("section");
        section.classList.add("modal-section");
        section.classList.add(this.file);
        section.classList.add("hidden");

        const buttonClose = document.createElement("button");
        buttonClose.innerHTML = "X";
        buttonClose.onclick = this.showHide.bind(this);
        section.append(buttonClose);

        const columns = document.createElement("section");
        columns.classList.add("columns")

        const textColumn = document.createElement("section");
        textColumn.classList.add("textColumn");
        
        const h3Title = document.createElement("h3");
        h3Title.innerHTML = this.title;
        textColumn.append(h3Title);

        const pType = document.createElement("p");
        pType.innerHTML = `<strong>Type:</strong> ${this.type}`;
        textColumn.append(pType);

        const pEffect = document.createElement("p");
        pEffect.innerHTML = `<strong>Effect:</strong> ${this.effect}`;
        textColumn.append(pEffect);

        const pRank = document.createElement("p");
        pRank.innerHTML = `<strong>Rank:</strong> ${this.rank}`;
        textColumn.append(pRank);

        const pAttr = document.createElement("p");
        pAttr.innerHTML = `<strong>Attribute:</strong> ${this.attribute}`;
        textColumn.append(pAttr);

        const pATK = document.createElement("p");
        pATK.innerHTML = `<strong>Attack:</strong> ${this.attack}`;
        textColumn.append(pATK);

        const pDEF = document.createElement("p");
        pDEF.innerHTML = `<strong>Defense:</strong> ${this.defense}`;
        textColumn.append(pDEF);

        const pDESC = document.createElement("p");
        pDESC.innerHTML = `<strong>Description:</strong> ${this.description}`;
        textColumn.append(pDESC);

        const imageColumn = document.createElement("section");
        imageColumn.classList.add("imageColumn")

        const image = document.createElement("img");
        image.src = `images/${this.file}`;
        image.classList.add("image");
        imageColumn.append(image);

        columns.append(textColumn);
        columns.append(imageColumn);
        section.append(columns);


        return section;
    };

    //
    showHide() {
        const modals = document.getElementsByClassName("modal-section");
        for (let i = 0; i < modals.length; i++) {
            if (modals.item(i).classList.contains(this.file)) {
                if (modals.item(i).classList.contains("hidden")) {
                    modals.item(i).classList.remove("hidden");
                    document.getElementById("transparent").classList.remove("hidden");
                    document.getElementById("card-modal").classList.remove("hidden");
                } else {
                    modals.item(i).classList.add("hidden");
                    document.getElementById("transparent").classList.add("hidden");
                    document.getElementById("card-modal").classList.add("hidden");
                }
                return;
            };
        };
    };
};

const cards = [];
cards.push(new Card("dark-magician.jpg", "Dark Magician", "Spellcaster", "Normal", 7, "Dark", 2500, 2100, "The ultimate wizard in terms of attack and defense."));
cards.push(new Card("red-eyes-black-dragon.jpg", "Red-Eyes Black Dragon", "Dragon", "Normal", 7, "Dark", 2400, 2000, "A ferocious dragon with a deadly attack."));
cards.push(new Card("blue-eyes-white-dragon.jpg", "Blue-Eyes White Dragon", "Dragon", "Normal", 8, "Light", 3000, 2500, "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and live to tell the tale."));
cards.push(new Card("blue-eyes-ultimate-dragon.jpg", "Blue-Eyes Ultimate Dragon", "Dragon", "Fusion", 12, "Light", 4500, 3800, "\"Blue-Eyes White Dragon\" + \"Blue-Eyes White Dragon\" + \"Blue-Eyes White Dragon\""));

cards.forEach((card) => {
    document.getElementById("card-list").append(card.section);
    document.getElementById("card-modal").append(card.modalSection);
});