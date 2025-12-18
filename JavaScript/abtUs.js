document.addEventListener("DOMContentLoaded", () => {
    let mttSmallCircle = document.getElementById("mtt");
    let wytSmallCircle = document.getElementById("wyt");
    let htppSmallCircle = document.getElementById("htpp");
    let wmSmallCircle = document.getElementById("wm");
    const smallCircles = [mttSmallCircle, wytSmallCircle, htppSmallCircle, wmSmallCircle];

    let bigCircle = document.getElementById("big-circle");
    let personName = document.getElementById("clicked-person-name");
    let personText = document.getElementById("current-person-text");

    smallCircles.forEach(circle => {
        circle.addEventListener("click", () => {
            if (circle === mttSmallCircle) {
                smallCircles.forEach(c => c.classList.remove("person-active"));
                mttSmallCircle.classList.add("person-active");
                personText.innerHTML = "Hi, I am Min Thu Tah, a Year-9 student from EDUSN digital School. My purpose of working on this website is to respond to the issue of people these days not having healthy lifestyles. People these days spend too much time on work and using their phones, so I created this website to encourage people to stay health.";
                personName.innerHTML = "Min Thu Tah";
                bigCircle.style.backgroundImage = "url(../images/Mtt.jpg)";
            }
            if (circle === wytSmallCircle) {
                smallCircles.forEach(c => c.classList.remove("person-active"));
                wytSmallCircle.classList.add("person-active");
                personText.innerHTML = "Hello, I'm Wai Yan Thwin, I'm  a Year-9 student from the EDUSN Digital School. I am a part of group 1 - The Burmese Diplomats. My purpose of making this website is to pass PBL and more. many people these days have too much screentime, expecially young people, so my other intentions are to help people get healthy lifestyles and get fit via going outside."
                personName.innerHTML = "Wai Yan Thwin";
                bigCircle.style.backgroundImage = "url(../images/waiyan.png)";
            }
            if (circle === htppSmallCircle) {
                smallCircles.forEach(c => c.classList.remove("person-active"));
                htppSmallCircle.classList.add("person-active");
                personText.innerHTML = "Hello, and welcome visitors! I am Hein Htet Pyae Phyo, a Year-9 student from EDUSN Digital School. I am a member of The Burmese Diplomats. I primarily contributed to the Data base, Gallery, Map, Nav Bar, and Community pages, working collaboratively with my team members. My purpose of being part of this website project is to provide accessible, high-quality health guidance, showcase the local parks and to motivate people to engage with the park for their well-being.🤠"
                personName.innerHTML = "Hein Htet Pyae Phyo";
                bigCircle.style.backgroundImage = "url(../images/heinhtet.png)";
            }
            if (circle === wmSmallCircle) {
                smallCircles.forEach(c => c.classList.remove("person-active"));
                wmSmallCircle.classList.add("person-active");
                personText.innerHTML = "Hi, I’m Win Myat. I’m currently attending Edusn Sangria Year 9. I made this website is to show that health and fitness activities aren’t just limited to the gym,they can also be done in parks. On this website, we explain different ways people can stay healthy and fit while at the park. Our group has worked hard to create the content for everyone.                 "
                personName.innerHTML = "Win Myat";
                bigCircle.style.backgroundImage = "url(../images/wm.png)";
            }
        })
    })
})