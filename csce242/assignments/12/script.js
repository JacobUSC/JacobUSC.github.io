const getHouses = async() => {
    const url = "https://portiaportia.github.io/json/house-plans.json";
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

const showHouses = async() => {
    const houseList = await getHouses();
    const houses = document.getElementById("houses");
    houseList.forEach(house => {
        houses.append(getHouse(house));
    });
};

const getHouse = (house) => {
    const houseSection = document.createElement("section");
    houseSection.classList.add("house");

    const nameH2 = document.createElement("h2");
    nameH2.innerHTML = house.name;
    houseSection.append(nameH2);

    const mainInfoDiv = document.createElement("div");
    mainInfoDiv.classList.add("info");

    houseImage = document.createElement("img");
    houseImage.src = `https://portiaportia.github.io/json/images/house-plans/${house.main_image}`;
    houseImage.classList.add("main-image");
    mainInfoDiv.append(houseImage);

    const infoSection = document.createElement("section");
    infoSection.classList.add("info-text");

    const sizeP = document.createElement("p");
    sizeP.innerHTML = `<strong>Size</strong>: ${house.size}`
    infoSection.append(sizeP);

    const bedroomsP = document.createElement("p");
    bedroomsP.innerHTML = `<strong>Bedrooms</strong>: ${house.bedrooms}`
    infoSection.append(bedroomsP);

    const bathroomsP = document.createElement("p");
    bathroomsP.innerHTML = `<strong>Bathrooms</strong>: ${house.bathrooms}`
    infoSection.append(bathroomsP);

    const featuresP = document.createElement("p");
    house.features.forEach(feature => {
        featuresP.innerHTML += `* ${feature} `;
    });
    infoSection.append(featuresP);

    mainInfoDiv.append(infoSection);

    houseSection.append(mainInfoDiv);

    const levelDiv = document.createElement("div");
    levelDiv.classList.add("levels");
    house.floor_plans.forEach(level =>{
        levelDiv.append(getLevel(level));
    });
    houseSection.append(levelDiv);

    return houseSection;
};

const getFeatures = () => {

};

const getLevel = (level) => {
    const levelSection = document.createElement("section");
    levelSection.classList.add("level");
    const nameH3 = document.createElement("h3");
    nameH3.innerHTML = level.name;
    levelSection.append(nameH3);
    levelImage = document.createElement("img");
    levelImage.src = `https://portiaportia.github.io/json/images/house-plans/${level.image}`;
    levelImage.classList.add("level-image");
    levelSection.append(levelImage);
    return levelSection;
};

window.onload = () => showHouses();