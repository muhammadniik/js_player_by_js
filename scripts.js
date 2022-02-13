const btnsDiv = document.querySelector(".btns");
const imageSound = document.querySelector(".cont img");
const palyBtn = document.querySelector("#playStop");

document.querySelector(".bar input").value = "0";
const sounds = [
    { name: "Arshiyas", audio: new Audio("./music/Arshiyas - Eshtebah.mp3"), pic: "./images/arshiyas.jpg" },
    { name: "Mohsen Ebrahimzadeh", audio: new Audio("./music/Mohsen Ebrahimzadeh - Taghche Bala.mp3"), pic: "./images/ebrahimzadeh.jpg" }
];

let cutentSound = 0;


// btnsDiv.
// btnsDiv.addEventListener("click", (e) => {
// console.log(e.target, (e.target).parentElement);
// if (e.target.id == "backBtn" || (e.target).parentElement.id == "backBtn") {
//     console.log("back")
// } else if (e.target.id == "nextBtn" || (e.target).parentElement.id == "nextBtn") {
//     console.log("next");
// } else if (e.target.id == "playStop" || (e.target).parentElement.id == "playStop") {
// if (palyBtn.className == "fas fa-play") {

//     palyBtn.classList.replace("fa-play", "fa-equals", true);
//     // palyBtn.setAttribute(" data-icon", "equals")


// } else {
//     palyBtn.classList.replace("fa-equals", "fa-play", true);

// }
console.log(palyBtn)
    //     }
    // })





palyBtn.addEventListener("click", (e) => {
    if (palyBtn.getAttribute("state") == "puse") {
        palyBtn.children[0].style.display = "none";
        palyBtn.children[1].style.display = "block";
        palyBtn.setAttribute("state", "play");


        playStop("play");
        sounds[cutentSound].audio.play();

    } else {
        palyBtn.children[1].style.display = "none";
        palyBtn.children[0].style.display = "block";
        palyBtn.setAttribute("state", "puse");



        playStop("stop");
        sounds[cutentSound].audio.pause();
    }



})

function playStop(name) {
    switch (name) {
        case "stop":
            {
                imageSound.style.animationPlayState = "paused";
                console.log("stop");
                break;
            }
        case "play":
            {
                imageSound.style.animationPlayState = "running";
                console.log("run");
                break;
            }
    }
}
playMusicSet(sounds[cutentSound]);

function playMusicSet(sounds) {
    document.querySelector("#titleText").innerText = sounds.name;
    document.querySelector(".cont img").src = sounds.pic;
    sounds.audio.addEventListener("canplay", () => {
        document.querySelector(".bar input").max = sounds.audio.duration;

        // sounds.audio.play();
    })


    sounds.audio.addEventListener("timeupdate", () => {
        document.querySelector(".bar input").value = sounds.audio.currentTime;
    })
}

function playMusic(sounds) {
    playMusicSet(sounds);
    sounds.audio.play();
}

document.querySelector(".bar input").addEventListener("input", () => {
    sounds[cutentSound].audio.currentTime = document.querySelector(".bar input").value;
});
document.querySelector("#backBtn").addEventListener("click", () => {
    document.querySelector(".bar input").value = 0;
    playStop("stop");
    sounds[cutentSound].audio.pause();
    sounds[cutentSound].audio.currentTime = 0;

    if (cutentSound <= 0) {
        cutentSound = sounds.length - 1;
    } else {
        cutentSound -= 1;
    }

    playMusic(sounds[cutentSound]);

})
document.querySelector("#nextBtn").addEventListener("click", () => {
    document.querySelector(".bar input").value = 0;
    playStop("stop");
    sounds[cutentSound].audio.pause();
    sounds[cutentSound].audio.currentTime = 0;

    if (cutentSound >= sounds.length - 1) {
        cutentSound = 0;
    } else {
        cutentSound += 1;
    }

    playMusic(sounds[cutentSound]);
})