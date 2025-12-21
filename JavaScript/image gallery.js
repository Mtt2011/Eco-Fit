let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slide = document.querySelector('.slide');

next.addEventListener('click', () => {
    let items = document.querySelectorAll('.slide .item');
    slide.appendChild(items[0]); // move first item to the end
});

prev.addEventListener('click', () => {
    let items = document.querySelectorAll('.slide .item');
    slide.prepend(items[items.length - 1]); // move last item to the front
});
const galleryData = [
    { type: "image", src: "../imagesTwo/grass1.jpg", title: "Clean space in the park", description: "Clean space in the park with healthy green grass and beautiful scenery" },
    { type: "image", src: "../imagesTwo/grass2.jpg", title: "View of grass and trees", description: "The picture shows various different trees, some still young, some old" },
    { type: "image", src: "../imagesTwo/grass3.jpg", title: "River view", description: "View of the river in the park with swan you can ride along with a bridge to cross the bridge" },
    { type: "image", src: "../imagesTwo/grass4.jpg", title: "Pathway", description: "Pathway in the middle of patches of grass with trees in it" },
    { type: "image", src: "../imagesTwo/grass5.jpg", title: "Clearer pathway view", description: "Shows a clearer view of the pathway with water drainage system" },
    { type: "image", src: "../imagesTwo/grass6.jpg", title: "Grass clearing", description: "A clearing in the open where there is grass and a few shrubbery." },
    { type: "image", src: "../imagesTwo/grass7.jpg", title: "Panoramic grass clearing", description: "A panoramic view of the grass clearing with the pathway visible in front" },
    { type: "image", src: "../imagesTwo/grass8.jpg", title: "Close up view of the river", description: "Closer view of the river from beside a tree" },
    { type: "image", src: "../imagesTwo/grass9.jpg", title: "Clear bridge view", description: "A very clear view of the bridge in Kan Taw Mingalar Park." },
    { type: "image", src: "../imagesTwo/grass10.jpg", title: "Section of the park", description: "Shows the view of multiple sections of Kan Taw Mingalar park." },
    { type: "video", src: "../videos/armCircles.mp4", title: "Exercising", description: "A video showing an exercise you can do with park equipments in the background" },
    { type: "image", src: "../imagesTwo/grass11.jpg", title: "Beautiful scenery with ducks", description: "Shows a very vibrant sunlight shining on the grass as the ducks mind their business" },
    { type: "image", src: "../imagesTwo/grass12.jpg", title: "Shaded area", description: "Shaded are for visitors can rest without worrying about the heat of the sun" },
    { type: "image", src: "../imagesTwo/grass13.jpg", title: "Bizarre tree shape", description: "Shows a scenery with a bizarre tree shaped like pac-man" },
    { type: "image", src: "../imagesTwo/grass14.jpg", title: "Space between rivers", description: "Land between two rivers that has many trees and shrubs." },
    { type: "image", src: "../imagesTwo/grass15.jpg", title: "Trees and shrubs", description: "An area with many trees and shrubs." },
    { type: "image", src: "../imagesTwo/grass16.jpg", title: "Friend taking a rest", description: "Shows our friend, Wai Yan Thwin, taking a walk in the park and relaxing" },
    { type: "image", src: "../imagesTwo/grass17.jpg", title: "Stream", description: "View of a lovely stream flowing in the park" },
    { type: "image", src: "../imagesTwo/grass18.jpg", title: "Plant circle", description: "Plants in a circle shape in the middle of a clearing" },
    { type: "image", src: "../imagesTwo/grass19.jpg", title: "Sidewalk view", description: "Shows a lot of thin trees and colorful plants and shrubs beside the sidewalk" },
    { type: "image", src: "../imagesTwo/grass20.jpg", title: "Two Flower Circles", description: "A picture of two colorful flower circles with trees in the center, a UNIQUE and ORIGINAL design." },
    { type: "image", src: "../imagesTwo/grass21.jpg", title: "Picture from sidewalk", description: "A picture of plants taken from one of the cameramen from the sidewalk." },
    { type: "video", src: "../videos/benchPushUps.mp4", title: "Push Ups Guide", description: "Our very athletic friend, Win Myat, demonstrating how to do bench push ups" },
    { type: "video", src: "../videos/hipCircles.mp4", title: "Warm Up Guide", description: "Hein Htet's little brother kindly demonstrating how to do warm ups before working out" },
    { type: "image", src: "../imagesTwo/grass22.jpg", title: "Another Flower Circle", description: "One of the many flower circles in the park, there are too many of them around here." },
    { type: "image", src: "../imagesTwo/grass23.jpg", title: "Small Hill", description: "A small hill near the fences of the park." },
    { type: "image", src: "../imagesTwo/grass24.jpg", title: "Flower pots", description: "Shows a row of flower pots with different plants in it" },
    { type: "image", src: "../imagesTwo/grass25.jpg", title: "Stone monument", description: "A stone monument with burmese writings written on it with illustrations in burmese culture" },
    { type: "image", src: "../imagesTwo/grass26.jpg", title: "Click here!", description: "Just a Random Picture in Theingottra Park. " },
    { type: "image", src: "../imagesTwo/grass27.jpg", title: "A lake", description: "Shin Upagutta lake in Theingottra park. Really nice view, we can see ShweDagon Pagoda from there." },
    { type: "video", src: "../videos/JoggingInPlace.mp4", title: "I wanna run away~", description: "Our member Hein Htet's little brother doing jogging exercise in the park." },
    { type: "image", src: "../imagesTwo/grass28.jpg", title: "A lake (sunny)", description: "Shin Upagutta lake in Theingottra park. There are fishes in the lake!" },
    { type: "video", src: "../videos/LegSwingsFront.mp4", title: "Kick!", description: "Our member Win Myat doing leg swinging exercise! (Front view)" },
    { type: "video", src: "../videos/legSwingsSide.mp4", title: "With a tree? (Swing it!)", description: "Our member Win Myat doing leg swinging exercise! (side view)" },
    { type: "video", src: "../videos/notBenchDips.mp4", title: "Dragon Dips!", description: "Our member Win myat doing dip exercise on the dragon round area in dragon round park!" },
    { type: "image", src: "../imagesTwo/grass30.jpg", title: "Majestic Floating Place", description: "Shin Upagutta's place in middle of the lake." },
    { type: "image", src: "../imagesTwo/grass31.jpg", title: "Lake view during the afternoon", description: "Another view of Shin Upagutta's place in middle of the lake. " },
    { type: "image", src: "../imagesTwo/grass32.jpg", title: "Plants!", description: "Random pictures our member Hein Htet took." },
    { type: "image", src: "../imagesTwo/grass33.jpg", title: "Old trees", description: "Random pictures our member Hein Htet took." },
    { type: "image", src: "../imagesTwo/grass34.jpg", title: "Trees", description: "Random BEAUTIFUL pictures our member Hein Htet took." },
    { type: "image", src: "../imagesTwo/grass35.jpg", title: "Trees", description: "Random BEAUTIFUL pictures our member Hein Htet took." },
    { type: "image", src: "../imagesTwo/grass36.jpg", title: "Great Wallpaper!", description: "Random BEAUTIFUL pictures our member Hein Htet took." },
    { type: "image", src: "../images/67.png", title: "Normal", description: "OMG, OMG, OMG SANJAY KUMAR IS HERE GUYS!" },
    { type: "image", src: "../imagesTwo/grass37.jpg", title: "Artificial Waterfall", description: "A human-made water fall in Theingottra Park." },
    { type: "video", src: "../videos/parkEquipmentExercise1.mp4", title: "Gym In The Park!", description: "Our member Win Myat doing exercise with the equipments in the park!" },
    { type: "image", src: "../imagesTwo/grass38.jpg", title: "Minecraft Tree!", description: "Minecraft style tree in Kan Daw Mingalar Park. Taken by our member Hein Htet." },
    { type: "image", src: "../imagesTwo/grass39.jpg", title: "Early, -", description: "Early in the morning picture of a area in Theingottra park. Taken by Hein Htet" },
    { type: "image", src: "../imagesTwo/grass40.jpg", title: "Early Dragon", description: "Early in the morning picture of a area in Dragon round park. We can see the ShweDagon pagoda from there. Taken by Hein Htet" },
    { type: "image", src: "../imagesTwo/grass41.jpg", title: "Dragons Round!", description: "Early in the morning picture of a area in Dragon round park. Taken by Hein Htet" },
    { type: "video", src: "../videos/parkEquipmentExercise2.mp4", title: "Rainbow Belt--Push Up!", description: "Our member Win Myat doing push up with equipments in the park." },
    { type: "image", src: "../imagesTwo/grass42.jpg", title: "Night,-", description: "Radom picture our memeber Hein Htet took." },
    { type: "video", src: "../videos/parkEquipmentExercise3.mp4", title: "Monkey!", description: "Our member Hein Htet trying monkey bars for the first time!" },
    { type: "image", src: "../imagesTwo/grass43.jpg", title: "East Dragon!", description: "A statue of dragon from dragron roudn area." },
    { type: "image", src: "../imagesTwo/grass44.jpg", title: "East dragon(side)", description: "A statue of dragon from dragron roudn area." },
    { type: "video", src: "../videos/parkequipmentExercise4.mp4", title: "GO Go!", description: "Our member Win myat trying the cycling exercise equipment in the park." },
    { type: "image", src: "../imagesTwo/grass45.jpg", title: "Night Lake", description: "Shin Upagutta lake in Theingottra park. (Early in the morning view) taken by Hein Htet." },
    { type: "image", src: "../imagesTwo/grass46.jpg", title: "Click me!", description: "Random Picture our member hein htet took." },
    { type: "image", src: "../imagesTwo/grass47.jpg", title: "Meaning of BEAUTIFUL", description: "Pathway in dragon roudn park. Early in the morning view. taken by Hein Htet. 😎" },
    { type: "image", src: "../imagesTwo/grass48.jpg", title: "Shwedagon Pagoda", description: "ShweDagon Pagoda view from dragonroudn park." },
    { type: "image", src: "../imagesTwo/grass49.jpg", title: "Fountain Statue", description: "A golden statue in the fountain of Dragon Round Park." },
    { type: "image", src: "../imagesTwo/grass50.jpg", title: "Evening Park", description: "The park in the evening with the view of a pagoda in the background." },
    { type: "image", src: "../imagesTwo/grass51.jpg", title: "Flower Circle", description: "Another perspective of the area of land with flower circles in the morning." },
    { type: "image", src: "../imagesTwo/grass52.jpg", title: "Dragon Round Park", description: "The most eye-catching feature in Dragon Round Park." },
    { type: "image", src: "../imagesTwo/grass53.jpg", title: "Dragon Round Park", description: "Another perspective of Dragon Round Park from another area." },
    { type: "video", src: "../videos/ParkEquipmentExercise5.mp4", title: "Treadmill Equipment", description: "Footage of Hein Htet's brother using the treadmill equpiment." },
    { type: "image", src: "../imagesTwo/grass54.jpg", title: "Dragon of clouds", description: "Clody weather picture of a area in Dragon round park. Taken by Hein Htet" },
    { type: "image", src: "../imagesTwo/grass55.jpg", title: "Rules!", description: "Dragon roudn park rules!" },
    { type: "image", src: "../imagesTwo/grass56.jpg", title: "A fallen tree", description: "A very old tree that have great memories with our member Hein Htet." },
    { type: "image", src: "../imagesTwo/grass57.jpg", title: "Deer antlers (WOW!)", description: "an old tree that have a shape like deer antlers!" },
    { type: "image", src: "../imagesTwo/grass58.jpg", title: "Clearn pathway", description: "very clean and beautiful path way" },
    { type: "image", src: "../imagesTwo/grass59.jpg", title: "Man-U boy!", description: "Hein Htet's brotehr posting on the bridge " },
    { type: "image", src: "../imagesTwo/grass60.jpg", title: "Pathway II", description: "very clean pathway" },
    { type: "image", src: "../imagesTwo/grass61.jpg", title: "Clouds", description: "4pm cloud view from the park!" },
    { type: "image", src: "../imagesTwo/grass62.jpg", title: "Lonliest Tree", description: "the tallest tree in the park!" },
    { type: "image", src: "../imagesTwo/grass63.jpg", title: "Chilly pathway", description: "very clean and nice path way in theingottra" },
    { type: "image", src: "../imagesTwo/grass64.jpg", title: "Pano, go!", description: "panorama picture" },


];

const grid = document.getElementById("grid");
const searchInput = document.getElementById("search");
const noResults = document.getElementById("noResults");
const modal = new bootstrap.Modal(document.getElementById('detailModal'));
const modalTitle = document.getElementById('detailModalLabel');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const modalDescription = document.getElementById('modalDescription');
const downloadBtn = document.getElementById('downloadBtn');

function displayGallery(items) {
    grid.innerHTML = "";
    if (items.length === 0) {
        noResults.style.display = "block";
        return;
    } else {
        noResults.style.display = "none";
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "card-img item";

        let mediaContent = "";
        if (item.type === "image") mediaContent = `<img src="${item.src}" alt="${item.title}" />`;
        else if (item.type === "video") mediaContent = `<video src="${item.src}" muted></video>`;

        card.innerHTML = `
            ${mediaContent}
            <div class="caption">${item.title}</div>
        `;
        grid.appendChild(card);

        card.querySelector('.caption').addEventListener('click', () => {
            modalTitle.textContent = item.title;
            modalDescription.textContent = item.description;
            if (item.type === "image") {
                modalImage.src = item.src; modalImage.style.display = "block";
                modalVideo.style.display = "none";
            } else {
                modalVideo.src = item.src; modalVideo.style.display = "block";
                modalImage.style.display = "none";
            }
            downloadBtn.href = item.src;
            modal.show();
        });
    });
}


displayGallery(galleryData);

document.getElementById('detailModal').addEventListener('hidden.bs.modal', () => {
    modalVideo.pause();
    modalVideo.currentTime = 0;
});
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = galleryData.filter(item =>
        item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
    );
    displayGallery(filtered);
});

