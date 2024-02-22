const adTextList = ["If you got Heartburn i tell you what You Need to get Prilosec GIT'R DONE",
"I eat ribs everyday and I love it, but I tell what, one more thing about ribs I eat; A lOT.",
"EAT PRILOSEC!",
"CONSUME PRILOSEC",
"Obey Prilosec",
"Buy Sell its a bear market it on Prilosec",
"IF YOU-- IF YOU GO TO A FOOTBALL... ...SPORTS GAME AND YOU RUN OUT OF CHIPS.. EAT PRILOSEC. it'll bring you joy",
"IT'S GOT LOADS'A CALORIES! And it'll give you heartburn like crazy!"];

// I don't like having this global variable.
// The only other way I could think of doing this would involve searching the array each time to determine the index of the next element.
let index = 0;

const showAdText = () => {
    const pText = document.getElementById("ad-text");
    pText.innerHTML = adTextList[index];
    index++;
    if (index == adTextList.length) {
        index = 0;
    }
};

// This needs to be called before setInterval, so text shows immediately.
// setInterval waits until after the first interval before calling the function.
showAdText();

setInterval(showAdText, 2000);