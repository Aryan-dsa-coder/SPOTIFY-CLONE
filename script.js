console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioelement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let MyprogressBar = document.getElementById('MyprogressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songsItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {SongName: "Dilon Ki Doriyan", filePath: "songs/1.mp3", coverPath: "dilon-ki-doriyan-bawaal-500-500.jpg"},
    {SongName: "Abhi-Abhi", filePath: "songs/2.mp3", coverPath: "Abhi-Abhi-Male-Jism-2-500-500.jpg"},
    {SongName: "Asal Mein", filePath: "songs/3.mp3", coverPath: "Asal-Mein-Asal-Mein---Single-500-500.jpg"},
    {SongName: "Dil Mein Ho Tum", filePath: "songs/4.mp3", coverPath: "128Dil Mein Ho Tum - Why Cheat India 128 Kbps.jpg"},
    {SongName: "Guzarish", filePath: "songs/5.mp3", coverPath: "Guzarish-Ghajini-500-500.jpg"},
    {SongName: "Jiyein Kyun", filePath: "songs/6.mp3", coverPath: "Jiyein-Kyun-Dum-Maaro-Dum-500-500.jpg"},
    {SongName: "Lagdi Lahore Di", filePath: "songs/7.mp3", coverPath: "Lagdi-Lahore-Di-Street-Dancer-3D-500-500.jpg"},
    {SongName: "Tere Vaaste", filePath: "songs/8.mp3", coverPath: "tere-vaaste-zara-hatke-zara-bachke-500-500.jpg"},
    {SongName: "Tu Har Lamha", filePath: "songs/9.mp3", coverPath: "Tu-Har-Lamha-Khamoshiyan-500-500.jpg"},
    {SongName: "Tumhe Kitna Pyaar Karte", filePath: "songs/10.mp3", coverPath: "tumhe-kitna-pyaar-karte-bawaal-500-500.jpg"},
]
songsItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].SongName;
})
// audioelement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioelement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to events
audioelement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioelement.currentTime/audioelement.duration) * 100);
    MyprogressBar.value = progress;
})

MyprogressBar.addEventListener('change', ()=>{
    audioelement.currentTime = MyprogressBar.value * audioelement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause'); 
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioelement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].SongName;
        audioelement.currentTime = 0;
        audioelement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioelement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].SongName;
    audioelement.currentTime = 0;
    audioelement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioelement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].SongName;
    audioelement.currentTime = 0;
    audioelement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})