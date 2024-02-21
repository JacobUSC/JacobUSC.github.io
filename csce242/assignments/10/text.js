const adTextList = ["If you got Heartburn i tell you what You Need to get Prilosec GIT'R DONE",
"I eat ribs everyday and I love it, but I tell what, one more thing about ribs I eat; A lOT.",
"EAT PRILOSEC!",
"CONSUME PRILOSEC",
"Obey Prilosec",
"Buy Sell its a bear market it on Prilosec",
"IF YOU-- IF YOU GO TO A FOOTBALL... ...SPORTS GAME AND YOU RUN OUT OF CHIPS.. EAT PRILOSEC. it'll bring you joy",
"IT'S GOT LOADS'A CALORIES! And it'll give you heartburn like crazy!",];

let index = 0;

const showAdText = () => {
    const pText = document.getElementById("ad-text");
    pText.innerHTML = adTextList[index];
    index++;
    if (index == adTextList.length-1) {
        index = 0;
    }
};

setInterval(showAdText, 2000);