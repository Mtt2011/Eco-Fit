const clickSound = document.getElementById("clickSound");
var imageWidth = 2000;
var imageHeight = 1200;

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 4
});

var bounds = [[0, 0], [imageHeight, imageWidth]];
L.imageOverlay("../images/map.png", bounds).addTo(map);
map.fitBounds(bounds);


function open360(photoFile, personName, date, personInfo) {

    const loader = document.getElementById("loader");
    loader.style.display = "flex";
    document.getElementById("npcBox").style.display = "none";

    setTimeout(() => {
        document.getElementById("map").style.display = "none";
        const viewerWrapper = document.getElementById("viewerWrapper");
        viewerWrapper.style.display = "flex";

        const infoBox = document.getElementById("infoBox");
        infoBox.style.display = "block";
        infoBox.innerHTML = `
            <h2>🌿 ${personName}</h2>
            <h4>🍂 ${date}</h4>
            <p>Description: ${personInfo}</p>
            <button onclick="goBack()">⬅ Back to Map</button>
        `;

        pannellum.viewer("panorama", {
            type: "equirectangular",
            panorama: photoFile,
            autoLoad: true
        });

        loader.style.display = "none";
    }, 2800);
}



function goBack() {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    setTimeout(() => {
        document.getElementById("map").style.display = "block";
        document.getElementById("npcBox").style.display = "block";
        document.getElementById("viewerWrapper").style.display = "none";
        document.getElementById("infoBox").style.display = "none";

        loader.style.display = "none";
    }, 1200);
    clickSound.play();
}

var WaiYanIcon = L.icon({
    iconUrl: "../images/WYTICON.png",
    iconSize: [45, 45],
    iconAnchor: [22, 45],
    popupAnchor: [0, -45]
});

var HHPPICON = L.icon({
    iconUrl: "../images/HHPPICON.png",
    iconSize: [45, 45],
    iconAnchor: [22, 45],
    popupAnchor: [0, -45]
});


var marker1 = L.marker([1050, 463], { icon: HHPPICON }).addTo(map);
marker1.on("click", function () {
    open360(
        "../images/5_360.png",
        "Photo by: Hein Htet Pyae Phyo 📸",
        "Nov 30, 2025",
        "This photo was taken to showcase the beauty and verdi kool grassland 🍃. Nice weather and the turtle shaped stone 🐢."
    );
    clickSound.play();
});

var marker2 = L.marker([300, 1015], { icon: WaiYanIcon }).addTo(map);
marker2.on("click", function () {
    open360(
        "../images/7_360.jpg",
        "Photo by: Wai Yan Thwin",
        "Nov 30, 2025",
        "This place is a bit famous for its beautiful scenery and looks like the dragon ball summoning dragon episode. <br> 🐉 [ Eternal Dragon, by your name, I summon you forth: Shenron!⚡ ]"
    );
    clickSound.play();
});

var marker3 = L.marker([1000, 440], { icon: WaiYanIcon }).addTo(map);
marker3.on("click", function () {
    open360(
        "../images/8_360.png",
        "Photo by: Wi Yan Thwin",
        "Nov 30, 2025",
        "A mysterious location with a calm atmosphere with grass. <br> We can see Sanjay Hein Htet, Sanjay Win Myat and the MC Lone tone! 😁"
    );
    clickSound.play();
});



var marker4 = L.marker([400, 480], { icon: WaiYanIcon }).addTo(map);
marker4.on("click", function () {
    open360(
        "../images/9_360.jpg",
        "Photo by: Wi Yan Thwin",
        "Nov 30, 2025",
        "Write something here wai yan"
    );
    clickSound.play();
});

var marker5 = L.marker([420, 220], { icon: HHPPICON }).addTo(map);
marker5.on("click", function () {
    open360(
        "../images/10_360.png",
        "Photo by: Hein Htet Pyae Phyo",
        "Nov 30, 2025",
        "Beautiful shelter, ducks in the lake, hidden meaning behind this! 🍀"
    );
    clickSound.play();
});

const npcBox = document.getElementById("npcBox");
const npcDialog = document.getElementById("npcDialog");
const npcOptions = document.getElementById("npcOptions");
const npcAnswerBox = document.getElementById("npcAnswerBox");

// Answers
const answers = {
    weather: "🌦 The weather is peaceful today. Perfect for touching grass, LOL🍃",
    place: " This is the Map of Theingottara Park, near ShweDagon Pagoda! Click the tiny icons on the map to see 360° photos!",
    joke: " Why did tung tung tung sahur choose bat as a weapon? Cuz it looks like him!                        "
};

// Show answer function
function showAnswer(type) {
    npcOptions.style.display = "none";
    npcAnswerBox.style.display = "block";
    npcAnswerBox.innerHTML = "";

    const rahhText = answers[type] || "";
    let sahur = 0;

    const jinbo = document.createElement("span");
    jinbo.className = "jinbo";
    npcAnswerBox.appendChild(jinbo);

    function step() {
        if (sahur < rahhText.length) {
            jinbo.insertAdjacentText('beforebegin', rahhText[sahur]);
            sahur++;
            setTimeout(step, 28);
        } else {

            jinbo.remove();
        }
    }
    step();
    clickSound.play();
}

// Click on the NPC to open dialog
npcBox.addEventListener("click", () => {
    npcDialog.classList.toggle("open");
    npcOptions.style.display = "block";
    npcAnswerBox.style.display = "none";
    clickSound.play();
});

// Press e to talk
document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "e") {

        // check if 360 viewer is visible or not
        const viewerWrapper = document.getElementById("viewerWrapper");
        if (viewerWrapper.style.display !== "flex") {
            // toggle NPC dialog
            npcDialog.classList.toggle("open");
            clickSound.play();
        }
    }
});


function backToQuestions() {
    npcAnswerBox.style.display = "none";
    npcOptions.style.display = "block";
    npcAnswerBox.innerHTML = "";
    clickSound.play();
}
function closeDialog() {
    npcDialog.classList.remove("open");
    npcOptions.style.display = "block";
    npcAnswerBox.style.display = "none";
    npcAnswerBox.innerHTML = "";
    clickSound.play();
}