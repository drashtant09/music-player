// lets select all required tags or elements

const wrapper = document.querySelector(".wrapper"),
musicImg = document.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio");
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector("music-list"),
showMoreBtn = wrapper.querySelector("#music-more"),
hideMusicBtn = wrapper.querySelector("#close");

let musicIndex = Math.floor( (Math.random() * allMusic.length) + 1)
isMusicPaused = true;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingSong();

});

function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].img}.jpeg`;
    mainAudio.src = `songs/${allMusic[indexNumb -1].src}.mp3`;

}

//play music function 
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}

//pause music function 
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

function prevMusic(){
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

//play or music button event
playPauseBtn.addEventListener("click", ()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
    playingSong();
});


nextBtn.addEventListener("click", ()=>{
    nextMusic();
});

prevBtn.addEventListener("click", ()=>{
    prevMusic();
});

// update progress bar width according to music current time

mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

        let musicCurrentTime = wrapper.querySelector(".current"),
        musicDuration = wrapper.querySelector(".duration");

        mainAudio.addEventListener("loadeddata", ()=>{
         
    // total duration

        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
     // current time
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if(currentSec < 10){
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    });

    //update playing song currentTime on according to the progress bar width

    progressArea.addEventListener("click", (e)=>{
        let progressWidthval = progressArea.clientWidth;
        let clickedOffSetX = e.offsetX;
        let songDuration = mainAudio.duration;

        mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
        playMusic();
        
    });

    //change loop, shuffle, repeat icon onclick

    const repeatBtn = wrapper.querySelector("#repeat_plist");
    repeatBtn.addEventListener("click", ()=>{
        let getText = repeatBtn.innerText;
        switch(getText){
            case "repeat":
                repeatBtn.innerText = "repeat_one";
                repeatBtn.setAttribute("title", "Song looped");
                break;
                case "repeat_one":
                    repeatBtn.innerText = "shuffle";
                    repeatBtn.setAttribute("title", "Playback shuffle");
                    break;
                    case "shuffle":
                        repeatBtn.innerText = "repeat";
                        repeatBtn.setAttribute("title", "Playlist looped");
                        break;
            }
    });

   // code for what to do after song ended

   mainAudio.addEventListener("ended", ()=>{
    let getText = repeatBtn.innerText;
        switch(getText){
            case "repeat":
                nextMusic();
                break;
                case "repeat_one":
                    mainAudio.currentTime = 0;
                    loadMusic(musicIndex);
                    playMusic();
                    break;
                    case "shuffle":
                        let randIndex = Math.floor(Math.random() * allMusic.length + 1);
                        do{
                            andIndex = Math.floor(Math.random() * allMusic.length + 1);
                        }while(musicIndex = randIndex);
                        musicIndex = randIndex;
                        loadMusic(musicIndex);
                        playMusic();
                        break;
        }
   });

   showMoreBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
   });

   hideMusicBtn.addEventListener("click", ()=>{
    showMoreBtn.click();
   });

const ulTag = wrapper.querySelector("ul");

// let create li tags according to array length for list

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
    <div class="row">
    <span>${allMusic[i].name}</span>
    <p>${allMusic[i].artist}</p>
    <span id="${allMusic[i].src}" class="audio-duration">3:03</span>
    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
    </li>`;

ulTag.insertAdjacentHTML("beforeend", liTag);

let liAudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`);
let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

liAudioTag.addEventListener("loadeddata", ()=>{
    let duration = liAudioTag.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if(totalSec < 10){
        totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerText = `${totalMin}:${totalSec}`;
});
}
//play particular song from the list onclick of li tag
function playingSong() {
const allLiTags = ulTag.querySelectorAll("li");

for (let j = 0; j < allLiTags.length; j++) {
    let audioTag = allLiTag[j].querySelector(".audio-duration");

    if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing");
        let adDuration = audioTag.getAttribute(t-duration);
        audioTag.innerText = adDuration;
    }
    //if the li tag index is equal to the musicIndex then add playing class in it

    if(allLiTag[j].getAttribute("li-index") == musicIndex) {
        allLiTag[j].classList.add("playing");
        audioTag.innerText = "Playing";
    }
    allLiTag[j].setAttribute("onclick", "clicked(this)");
}
}
//particular li clicked function
function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playingMusic();
    playingSong();
}



