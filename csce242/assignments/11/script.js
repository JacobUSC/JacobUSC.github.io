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
        
        section.onclick = this.expand;
        section.classList.add("content");
        
        return section;
    };

    get modalSection() {
        console.log("test");
        const section = document.createElement("section");

        const h3Title = document.createElement("h3");
        h3.innerHTML = this.title;
        section.append(h3Title);

        const pType = document.createElement("p");
        pType.innerHTML = `Type: ${this.type}`;
        section.append(pType);


        const buttonClose = document.createElement("button");
        buttonClose.innerHTML = "X";
        buttonClose.onclick = this.close;
        section.append(buttonClose);

        const image = document.createElement("img");
        image.src = `images/${this.file}`;
        image.classList.add("image");
        section.append(image);

        return section;
    };

    expand() {
        document.getElementById("card-modal").append(this.modalSection);
        document.getElementById("transparent").classList.remove("hidden");
        document.getElementById("card-modal").classList.remove("hidden");
    };

    close() {
        document.getElementById("transparent").classList.add("hidden");
        document.getElementById("card-modal").classList.remove("hidden");
        document.getElementById("card-modal").innerHTML = "";
    };
};

const cards = [];
cards.push(new Card("dark-magician.jpg", "Dark Magician", "Spellcaster", "Normal", 7, "Dark", 2500, 2100, "The ultimate wizard in terms of attack and defense."));
cards.push(new Card("red-eyes-black-dragon.jpg", "Red-Eyes Black Dragon", "Dragon", "Normal", 7, "Dark", 2400, 2000, "A ferocious dragon with a deadly attack."));
cards.push(new Card("blue-eyes-white-dragon.jpg", "Blue-Eyes White Dragon", "Dragon", "Normal", 8, "Light", 3000, 2500, "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and live to tell the tale."));
cards.push(new Card("blue-eyes-ultimate-dragon.jpg", "Blue-Eyes Ultimate Dragon", "Dragon", "Fusion", 12, "Light", 4500, 3800, "\"Blue-Eyes White Dragon\" + \"Blue-Eyes White Dragon\" + \"Blue-Eyes White Dragon\""));

cards.forEach((card) => {
    document.getElementById("card-list").append(card.section);
});