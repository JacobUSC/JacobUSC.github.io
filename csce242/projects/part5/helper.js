/**
 * Card list is obtained from the Yu-Gi-Oh! API by YGOPRODeck
 * Using API v7
 * https://ygoprodeck.com/api-guide/
 */

//This file is made to help get image files from ygoprodeck.com
const getCardDB = async () => {
	const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?&enddate=2005-09-30&dateregion=tcg";
	try {
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		console.log(error);
	}
};

//lists the url to download every image file
const getImages = async () => {
	const cards = await getCardDB();
	cards.data.forEach((card) => {
		console.log(card.card_images[0].image_url);
	});
	console.log("====Complete====");
};
//getImages();
