/**
 * Author: Jacob Russell
 * Description:
 * For:
 */
 
 const setDateTime = () => {
	 const date = new Date();
	 let hours = date.getHours();
	 let minutes = date.getMinutes();
	 let seconds = date.getSeconds();
	 let meridiem = "AM";
	 
	 if (hours == 0) {
		 hours = 12;
	 }
	 
	 if (hours > 12) {
		 hours = hours - 12;
		 meridiem = "PM";
	 }
	 
	 if (hours < 10) {
		 hours = "0" + hours;
	 }
	 
	 if (minutes < 10) {
		 minutes = "0" + minutes;
	 }
	 
	 if (seconds < 10) {
		 seconds = "0" + seconds;
	 }
	 
	 document.getElementById("time").innerHTML = `${hours}:${minutes}:${seconds} ${meridiem}`;
	 
	 let month = date.getMonth() + 1;
	 let day = date.getDate();
	 let year = date.getFullYear();
	 
	 let weekDay = date.getDay();
	 
	 switch (weekDay) {
		 case 1:
			weekDay = "Monday";
			break;
		case 2:
			weekDay = "Tuesday";
			break;
		case 3:
			weekDay = "Wednsday";
			break;
		case 4:
			weekDay = "Thursday";
			break;
		case 5:
			weekDay = "Friday";
			break;
		case 6:
			weekDay = "Saturday";
			break;
		case 7:
			weekDay = "Sunday";
			break;
	 }
	 
	 document.getElementById("date").innerHTML = `${weekDay} ${month}/${day}/${year}`
	 
	 setTimeout(()=>{setDateTime()}, 1000);
 }
 
 const setDate = () => {
	 
 }
 
 const setTime = () => {
	 
 }
 
 setDateTime();
