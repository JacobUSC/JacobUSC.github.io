/**
 * Author: Jacob Russell
 * Description:
 * For:
 */
 
 /**
 * Weather data provided by the National Weather Service (NWS)
 * weather.gov
 */
 
 const getCordData = async (cords) => {
	 const cordDataURL = `https://api.weather.gov/points/${cords}`;
	 try {
		const response = await fetch(cordDataURL);
		return response.json();
	} catch (error) {
		console.log(error);
	}
 }
 
 const setWeatherRadar = (station) => {
	 const radar = document.getElementById("radar");
	 radar.src = "https://place-hold.it/600x550/ffffff/ffffff";
	 radar.src = `https://radar.weather.gov/ridge/standard/${station}_loop.gif`;
 }
 
 const getWeatherData = async (cords) => {
	const cordData = await getCordData(cords);
	try {
		const response = await fetch(cordData.properties.forcast);
		setWeatherRadar(cordData.properties.radarStation);
	} catch (error) {
		console.log(error);
	}
 }
 
 const setDayData = (dayData) => {
	 const dayDataDiv = document.createElement("div");
	 dayDataDiv.class = "day-data";
	 const weatherIcon = document.createElement("img");
	 weatherIcon.src = "dayData.icon";
	 weatherIcon.class = "weather-icon";
	 dayDataDiv.append(weatherIcon);
	 const weatherName = document.createElement("");
 }
 
 const setWeatherData = async (cords) => {
	 const weatherData = await getWeatherData(cords);
	 document.getElementById("weather").innerHTML = "";
	 weatherData.periods.forEach((dayData) => {setDayData(dayData);});
	 setTimeout(() => {setWeatherData(cords);}, 300000);
 }
 
 setWeatherData("34.10,-81.18");
 
 //KCAE