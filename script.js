console.log("Lets write java script")
let currentSong= new Audio;
let songs;
    function formatTime(seconds) {
     if(isNaN(seconds)|| seconds<0){
        return "00:00";
     }
    
        // Format minutes and seconds to ensure they are two digits
        const minutes = Math.floor(seconds/60);
        var remainingSeconds = Math.floor(seconds%60);

        const formattedMinutes= String(minutes).padStart(2, '0');
        const formattedSeconds= String(remainingSeconds).padStart(2, '0');

    
        // Combine formatted values into desired format
        var formattedTime = formattedMinutes + ':' + formattedSeconds;
    
        return formattedTime;
    }
    



async function getSongs() {
let a = await fetch("http://127.0.0.1:3000/songs/")
let response = await a.text();
console.log(response)
let div = document.createElement("div")
div.innerHTML= response;
let as= div.getElementsByTagName("a")
let songs = []
for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith(".mp3"))
    {
    songs.push(element.href.split("/songs/")[1])
    }  
}
return songs
}
const playMusic = (track, pause= false)=>{
currentSong.src = "/Songs/" +track
    // let audio= new Audio("/Songs/" +track);
    if(!pause)
    {
     currentSong.play();
     play.src = "Assets/img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML= decodeURI(track);
    document.querySelector(".songtime").innerHTML= "00:00/ 00:00"
}

async function main()
{
   

songs = await getSongs()
playMusic(songs[0], true)
console.log(songs)
 let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
 for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML+ `<li> <img class="invert" src="Assets/img/music.svg" alt="">
    <div class="info">
        <div>${song.replaceAll("%20", " ")} </div>

    </div>
    <div class="playNow">
        <span>Play Now</span>
    <img class ="invert" src="Assets/img/play.svg" alt="">
    </div>
</li>`
 }
 Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element=>{

        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
 })
 play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong.play();
        play.src = "Assets/img/pause.svg"
    }
    else{
        currentSong.pause();
        play.src = "Assets/img/play.svg"
    }
 })

 currentSong.addEventListener("timeupdate", ()=>{
 console.log(currentSong.currentTime, currentSong.duration);
 document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}  / ${formatTime(currentSong.duration)}`
 document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration)*100 + "%";
 })

 document.querySelector(".seekbar").addEventListener("click", e=>{
    let percent = (e.offsetX/ e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ( (currentSong.duration)*percent)/100;

 })

document.querySelector(".hamburger").addEventListener("click", ()=>{
document.querySelector(".left").style.left ="0"
})
document.querySelector(".close").addEventListener("click", ()=>{
document.querySelector(".left").style.left ="-120%"
})


previous.addEventListener("click", ()=>{
   let index = songs.indexOf(currentSong.src.split("/").splice(-1)[0])
   if((index-1)>=0){
    playMusic(songs[index-1])
    
}
    
})

next.addEventListener("click", ()=>{
    currentSong.pause()

    let index = songs.indexOf(currentSong.src.split("/").splice(-1)[0])
    if((index+1)< songs.length){
        playMusic(songs[index+1])  
    }
})


document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
  currentSong.volume = parseInt(e.target.value)/100
})


}
main()