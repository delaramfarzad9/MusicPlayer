
const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("plays");
const pauseBtn = document.getElementById("play-pause");

const nextBtn = document.getElementById("next");
// const background = document.getElementById("background");



// Music
const songs = [
    {
      path:
        "media/Lunatic Soul - adrift.mp3",
      displayName: "Adrift",
      artist: "Lunatic Soul",
      cover:
        "images/lunaticsoul.jpeg",
    },
    {
      path: "media/Tycho - A Walk.mp3",
      displayName: "A Walk",
      artist: "Tycho",
      cover: "images/tycho.jfif",
    },
    {
      path:
        "media/Younger Brother - Train.mp3",
      displayName: "Train",
      artist: "Younger Brother",
      cover:
        "images/train.jfif",
    },
  ];
   // Check if Playing
let isPlaying = false;
// Current Song
let songIndex = 0

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("flex","hidden");
  pauseBtn.classList.replace("hidden","flex");
//   playBtn.setAttribute("title", "Pause");
  music.play();
}
// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("hidden","flex");
  pauseBtn.classList.replace("flex","hidden");
    music.pause();
  }
  //  Play or Pause Event Listener
  function clicked(){
    if (isPlaying) {
        pauseSong()
      } else {
        playSong()
      }
  }
  playBtn.addEventListener('click',clicked),
  pauseBtn.addEventListener('click',clicked);


// Update DOM
function loadSong(song) {
    console.log(song);
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = song.path;
    changeCover(song.cover);
  }
  
  function changeCover(cover) {
    // image.classList.remove("active");
    // setTimeout(() => {
    //   image.src = cover;
    //   image.classList.add("active");
    // }, 100);
    // background.src = cover;
    image.src = cover;
  }
// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }
  
  
  // Next Song
  function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }
  
  // On Load - Select First Song
  loadSong(songs[songIndex]);
// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
      const duration = e.srcElement.duration;
      const currentTime = e.srcElement.currentTime;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      progress.style.width = progressPercent + "%";
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        durationEl.textContent = durationMinutes + ":" + durationSeconds;
      }
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
    }
  }
  
  // Set Progress Bar
  function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    music.currentTime = (clickX / width) * duration;
  }
  


  // Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
