/**
 * Author: Jacob Russell
 * This file is not really a part of the website.
 * It's a tool made to help get image files from ygoprodeck.com
 * It outputs the urls to download the files needed to the browsers console.
 * I took the out put from the console and ran the downthemall browser extension to download the image files.
 */

/**
 * Card list is obtained from the Yu-Gi-Oh! API by YGOPRODeck
 * Using API v7
 * https://ygoprodeck.com/api-guide/
 */

const getCardDB = async () => {
	const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?&enddate=2005-09-30&dateregion=tcg";
	try {
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		console.log(error);
	}
};

//lists the url to download every high res image file
const getImagesHD = async () => {
	const cards = await getCardDB();
	cards.data.forEach((card) => {
		console.log(card.card_images[0].image_url);
	});
	console.log("====Complete====");
};

//lists the url to download every low res image file
const getImages = async () => {
	const cards = await getCardDB();
	cards.data.forEach((card) => {
		console.log(card.card_images[0].image_url_small);
	});
	console.log("====Complete====");
};

//getImagesHD();

//getImages();
