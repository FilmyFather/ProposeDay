const music = document.getElementById("bgMusic");
const panel = document.getElementById("musicPanel");
const toggleBtn = document.getElementById("musicToggle");
const onOffBtn = document.getElementById("onOffBtn");

let isPlaying = false;

/* 🎧 toggle panel */
toggleBtn.onclick = () => {
  panel.style.display =
    panel.style.display === "block" ? "none" : "block";
};

/* 🔊 volume */
function setVolume(v){
  music.volume = v;
}

/* ▶️ ⏸ play pause */
function toggleMusic(){
  if(!isPlaying){
    music.play();
    isPlaying = true;
    onOffBtn.innerText = "ON";
  }else{
    music.pause();
    isPlaying = false;
    onOffBtn.innerText = "OFF";
  }
}

/* 🔓 unlock logic */
function unlock(){
  const val = document
    .getElementById("passwordInput")
    .value.trim()
    .toLowerCase();

  if(val === "rajkumari"){
    music.currentTime = 62; // 01:02
    music.volume = 0.6;

    music.play().then(()=>{
      isPlaying = true;
      onOffBtn.innerText = "ON";
    });

    document.getElementById("lockPage").style.display="none";
    document.getElementById("main").style.display="block";
  }else{
    document.getElementById("msg").innerText =
      "Galat hai madam ji 😜 thoda socho…";
  }
}
