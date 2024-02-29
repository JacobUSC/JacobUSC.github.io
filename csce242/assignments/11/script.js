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

    getSection() {
        const section = document.createElement("section");
        const h3 = document.createElement("h3");
        h3.innerHTML(this.title);
        const image = document.createElement("img");
        image.src = `images/${file}`;
        section.append(h3,image);
        return section;
    };

    getExpandedSection() {
        const section = document.createElement("section");

        section.append();
        return section;
    };

    expandOrClose(e) {
        //todo
    };
};

const cards = [];
cards.push(new Card("dark-magician.jpg", "Dark Magician", "Spellcaster", "Normal", 7, "Dark", 2500, 2100, "The ultimate wizard in terms of attack and defense."));
cards.push(new Card("red-eyes-black-dragon.jpg", "Red-Eyes Black Dragon", "Dragon", "Normal", 7, "Dark", 2400, 2000, "A ferocious dragon with a deadly attack."));
cards.push(new Card("blue-eyes-white-dragon.jpg", "Blue-Eyes White Dragon", "Dragon", "Normal", 8, "Light", 3000, 2500, "This legendary dragon is a powerful engine of destruction. Virtually invincible, very few have faced this awesome creature and live to tell the tale."));
cards.push(new Card("blue-eyes-ultimate-dragon.jpg", "Blue-Eyes Ultimate Dragon", "Dragon", "Fusion", 12, "Light", 4500, 3800, "\"Blue-Eyes White Dragon\" + \"Blue-Eyes White Dragon\" + \"Blue-Eyes White Dragon\""));

cards.forEach((card) => {
    document.getElementById("card-list").append(card.getSection());
    document.getElementById("main").append(card.getExpandedSection());
});