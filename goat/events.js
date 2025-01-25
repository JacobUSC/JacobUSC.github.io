/**
 * Author: Jacob Russell
 * Description: Get list of current events
 * For: events.html
 */

let iEvent = -1;

const getEvents = async () => {
    const url = "json/events.json";
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.log(error);
    }
};

const getMap = (link) => {
    map = document.createElement("iframe");
    map.src = link;
    map.width = 600;
    map.height = 450;
    map.style = "border:0;";
    map.allowfullscreen = "";
    map.loading = "lazy";
    map.referrerpolicy = "no-referrer-when-downgrade";
    return map;
};

const getSection = (event) => {
    eventSect = document.createElement("section");
    eventName = document.createElement("h3");
    eventName.innerHTML = event.locationName;
    eventSect.append(eventName);
    eventType = document.createElement("p");
    eventType.innerHTML = event.type;
    eventSect.append(eventType);
    //date
    eventSect.append(getMap(event.map));
    return eventSect;
};

const getNext = async () => {
    const events = await getEvents();
    const sect = document.getElementById("event");
    sect.innerHTML = "";
    iEvent++;
    try {
        sect.append(getSection(events[iEvent]));
    } catch {
        iEvent--;
        sect.append(getSection(events[iEvent]));
        document.getElementById("next").classList.add("hidden");
    }
    if (iEvent > 0) {
        document.getElementById("prev").classList.remove("hidden");
    }
};

const getPrev = async () => {
    document.getElementById("next").classList.remove("hidden");
    const events = await getEvents();
    const sect = document.getElementById("event");
    sect.innerHTML = "";
    iEvent--;
    try {
        sect.append(getSection(events[iEvent]));
    } catch {
        iEvent++;
        sect.append(getSection(events[iEvent]));
        document.getElementById("prev").classList.add("hidden");
    }
    if (iEvent > 0) {
        document.getElementById("prev").classList.remove("hidden");
    }
    if (iEvent == 0) {
        document.getElementById("prev").classList.add("hidden");
    }
};

getNext();

document.getElementById("next").onclick = getNext;
document.getElementById("prev").onclick = getPrev;
