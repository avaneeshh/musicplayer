let playing = document.querySelector('.currently-playing');
let trackname = document.querySelector('.song-name');
let trackartist = document.querySelector('.song-artist');
let previous = document.querySelector('.previous');
let pause = document.querySelector('.pause');
let next = document.querySelector('.next');
let seek = document.querySelector('.seek');
let song_length = document.querySelector('.song-length');
let current = document.querySelector('.currtime');

let currentlyPlaying = false;
let trackindex = 0;
let timeupdate;

let track = document.createElement('audio');

let music=[{
    name: "Stay the night",
    artist: "The Shires",
    path: "song2.mp3"
},
{
    name: "Some Kind Of Love",
    artist: "The Killers",
    path: "song1.mp3"
}
]

function loadsong(trackindex){
    clearInterval(timeupdate);
    resetValues();
    track.src = music[trackindex].path;
    track.load();
    trackname.textContent = music[trackindex].name;
    trackartist.textContent = music[trackindex].artist;

    timeupdate = setInterval(seekUpdate,1000);

    track.addEventListener("over",nextsong);
}
function resetValues() {
    current.textContent = "0:00";
    song_length.textContent = "0:00";
    seek.value = 0;
  }
function playsong(){
    track.play();
    pause.innerHTML = '<i class="fa fa-pause-circle fa-3x"></i>';
}
function pausesong(){
    track.pause();
    pause.innerHTML = '<i class="fa fa-play-circle fa-3x"></i>';
}
function prev() {
    if (trackindex > 0)
      trackindex -= 1;
    else trackindex = track_list.length;
    loadsong(trackindex);
    play();
}

function nextsong(){
    if(trackindex<music.length-1)
        trackindex++;
    else
        trackindex = 0;
    loadsong(trackindex);
    playsong();
}
function seekTo() {
  
    let seekto = track.duration * (seek.value / 100);
    track.currentTime = seekto;
}
function seekUpdate() {
    let seekPosition = 0;
  
    if (!isNaN(track.duration)) {
      seekPos = track.currentTime * (100 /track.duration);
  
      seek.value = seekPosition;
  
      let currMins = Math.floor(track.currentTime / 60);
      let currSecs = Math.floor(track.currentTime - currMins * 60);
      let durMins = Math.floor(track.duration / 60);
      let durSecs = Math.floor(track.duration - durMins * 60);
  
      if (currSecs < 10) { currSecs = "0" + currSecs; }
      if (durSecs < 10) { durSecs = "0" + durSecs; }
      if (currMins < 10) { currMins = "0" + currMins; }
      if (durMins < 10) { durMins = "0" + durMins; }
  
      current.textContent = currMins + ":" + currSecs;
      song_length.textContent = durMins + ":" + durSecs;
    }
  }
loadsong(trackindex);