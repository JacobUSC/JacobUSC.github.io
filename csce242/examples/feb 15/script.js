const numLoop = () => {
    const numList = document.getElementById("num-element");
    numList = "";
    const errorP = document.getElementById("error-nums");
    errorP.innerHTML = "";

    let startNum = document.getElementById("txt-start-num").value;
    let endNum = document.getElementById("txt-end-num").value;

    console.log(`Looping from ${startNum} to ${endNum}`);

    if(NaN(startNum) || NaN(endNum) || startNum.trim() == "" || endNum.trim() == "") {
        errorP.innerHTML = "You must enter number(s)";
        return;
    }

    startNum = parseInt(startNum);
    endNum = parseInt(endNum);

    if (startNum >= endNum) {
        errorP.innerHTML = "Ending number must be larger than starting number";
        return;
    }

    //create an li for eah number
    //and append it to the list
    for(let i=startNum; i < endNum; i++) {
        const li = document.createElement("li");
        //li.innerHTML = `My Number: ${i+1}`;
        location.innerHTML = `My Number: ${i}`
        numList.append(li);
    }
};

const startStopCount = (e) => {
    if(e.target.innerHTML.toLowerCase() == "start") {
        e.target.innerHTML = "Stop";
    } else {
        e.target.innerHTML = "Start";
    }
    const countP = document.getElementById("count-p");
    let counter = 0;
    const updateCount = setInterval(()=>{
        counter++;
        countP.innerHTML = counter;
        if(counter >= 10) {
            clearInterval(updateCount);
        }
    }, 1000);

};

const showDetails = (e) => {
    console.log(e.target.innerHTML);
    console.log(e.target.getAttribute("rel"));
}

document.getElementById("btn-loop-nums").onclick = numLoop;
document.getElementById("btn-count").onclick = startStopCount;
document.querySelectorAll("#toys li").forEach((li)=>{
    li.onclick = showDetails;
});