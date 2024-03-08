let toys = ["drum", "ball", "blocks", "lego"];
let toyPrices = [];
toyPrices["barbie"] = 7.45;
toyPrices["doll house"] = 86.23;
toyPrices["slide"] = 34.23;
toyPrices["ken"] = 2.3;
toyPrices["bike"] = 5.6;

const showToys = () => {
	const resultDiv = document.getElementById("result");
	resultDiv.innerHTML = "";
	/*
    for (let i in toys) {
        console.log(toys[i]);
    }
    */
	toys.forEach((toy) => {
		const p = document.createElement("p");
		p.innerHTML = toy;
		resultDiv.append(p);
	});
};

const addToy = () => {
	const toy = document.getElementById("txt-toy").value;
	toys.push(toy);
	showToys();
};

const showToysTable = () => {
	const toyTable = document.getElementById("toy-table");
	for (let toy in toyPrices) {
		const tr = document.createElement("tr");
		const td = document.createElement("td");
		td.innerHTML = toy;
		tr.append(td);
		toyTable.append(tr);
		tr.onclick = () => {
			const descp = document.getElementById("toy-description");
			descp.innerHTML = `${toy} costs $${toyPrices[toy]}.`;
		};
		//.bind(null,toy)
		//take out of function
	}
};

showToys();
document.getElementById("button-add-toy").onclick = addToy;
showToysTable();
