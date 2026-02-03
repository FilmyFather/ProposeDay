/* =====================================================
   GLOBAL / PAGE CONTROL
===================================================== */
let currentPage = 1;
const pages = document.querySelectorAll(".page");
const music = document.getElementById("bgMusic");

/* FULLSCREEN FIX (Mobile + iOS) */
function setVh(){
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();
window.addEventListener("resize", setVh);

/* PAGE NAVIGATION */
function go(n){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
  currentPage = n;

  if(n===2) loadQuestion();
  if(n===4) initHunt();
}

/* =====================================================
   MUSIC CONTROL (HEADPHONE)
===================================================== */
let musicLevel = 0.5;
const musicControl = document.getElementById("musicControl");
const musicOptions = document.getElementById("musicOptions");

music.volume = musicLevel;

music.addEventListener("loadedmetadata",()=>{
  music.currentTime = 62; // 01:02 start point
});

function toggleMusicOptions(){
  musicOptions.classList.toggle("show");
}

function setVolume(v){
  music.volume = v;
  if(v>0 && music.paused) music.play();
}

/* =====================================================
   PAGE 1 — LOCK / UNLOCK
===================================================== */
const PASSWORD = "rajkumari";
let wrongCount = 0;

const taunts = [
  "Arre Ghelsodi 😝 itna bhi mushkil nahi!",
  "Dhapudiii 😜 phir se galat!",
  "Bhilan ❌ dhyaan se daal!",
  "Wagri 🤯 soch ke likh!",
  "Gaanduu Insaan 🤦‍♂️ hint le le!"
];

function unlock(){
  const input = document.getElementById("password");
  const msg = document.getElementById("lockMsg");
  const val = input.value.trim().toLowerCase();

  if(val === PASSWORD){
    msg.innerText = "";
    confetti({particleCount:200,spread:140});
    music.play();
    go(2);
  }else{
    wrongCount++;
    input.classList.add("shake");
    setTimeout(()=>input.classList.remove("shake"),300);

    msg.innerText = taunts[Math.min(wrongCount-1, taunts.length-1)];

    if(wrongCount===5){
      msg.innerText += "\nHint: Agar Yuvraj Rajkumar hai… to tum uski kya ho? ❤️";
    }
  }
}

/* =====================================================
   PAGE 2 — QUIZ
===================================================== */
const quizData = [
  {
    q:"01. Who is the lucky one?",
    options:["Me","You","Both","Fate","Us"],
    correct:2
  },
  {
    q:"02. What do you want from me?",
    options:[
      "Expensive Gift",
      "One Night Stand",
      "Whole Day Spend Together",
      "Stay Together For Life",
      "Party Out of State"
    ],
    correct:3
  },
  {
    q:"03. After 3 years, what matters most?",
    options:["Looks","Money","Trust","Fame","Status"],
    correct:2
  },
  {
    q:"04. Who do you trust the most?",
    options:["Friends","Family","Yuvraj","Everyone","Time"],
    correct:2
  },
  {
    q:"05. After 3 beautiful years together, will you be mine forever? 💍",
    options:[
      "Yes, today and always ❤️",
      "Forever and beyond ♾️",
      "I already belong to you 😘",
      "Till my last breath 💕",
      "All of the above 💍❤️"
    ],
    correct:4
  },
  {
    q:"06. Will you choose me again every single day?",
    options:[
      "Yes, without thinking",
      "Always and forever",
      "In every lifetime",
      "Already chosen ❤️",
      "All of the above 💕"
    ],
    correct:4
  },
  {
    q:"07. Love for you means?",
    options:["Timepass","Habit","Mood","Trust","Routine"],
    correct:3
  },
  {
    q:"08. Final answer?",
    options:["No","Maybe","Yes","Always","Forever"],
    correct:2
  }
];

let qIndex = 0;

function loadQuestion(){
  const q = quizData[qIndex];
  document.getElementById("qNo").innerText = q.q.split(".")[0];
  document.getElementById("question").innerText = q.q;
  const optBox = document.getElementById("options");
  optBox.innerHTML = "";

  q.options.forEach((o,i)=>{
    const btn = document.createElement("div");
    btn.className="quiz-option";
    btn.innerText=o;
    btn.onclick=()=>checkAnswer(i,btn);
    optBox.appendChild(btn);
  });
}

function checkAnswer(i,btn){
  const correct = quizData[qIndex].correct;

  if(i===correct){
    btn.classList.add("correct");
    confetti({particleCount:80,spread:80});
    setTimeout(()=>{
      qIndex++;
      if(qIndex<quizData.length){
        loadQuestion();
      }else{
        confetti({particleCount:250,spread:160});
        go(3);
      }
    },600);
  }else{
    btn.classList.add("wrong","shake");
    navigator.vibrate?.(200);
  }
}

/* =====================================================
   PAGE 3 — FINAL SECURITY
===================================================== */
function noFinal(btn){
  btn.style.position="absolute";
  btn.style.left=Math.random()*70+"%";
  btn.style.top=Math.random()*70+"%";
}

/* =====================================================
   PAGE 4 — PROPOSAL HUNT
===================================================== */
let ringsFound = 0;

function initHunt(){
  ringsFound=0;
  document.getElementById("rings").innerText="0";
}

function clickItem(el,isRing){
  if(isRing){
    ringsFound++;
    el.innerText="💍";
    el.onclick=null;
    document.getElementById("rings").innerText=ringsFound;
    if(ringsFound===3) setTimeout(()=>go(5),800);
  }else{
    el.innerText="💩";
  }
}

/* =====================================================
   PAGE 5 — CATCH MY LOVE
===================================================== */
let caught=0, gameInterval;

function startGame(){
  caught=0;
  document.getElementById("bar").style.width="0%";
  const box=document.getElementById("gameBox");

  clearInterval(gameInterval);
  gameInterval=setInterval(()=>{
    if(currentPage!==5) return;

    const h=document.createElement("span");
    h.innerText="❤️";
    h.className="fall-heart";
    h.style.left=Math.random()*90+"%";

    h.onclick=()=>{
      caught++;
      document.getElementById("bar").style.width=(caught/12*100)+"%";
      h.remove();
      if(caught>=12){
        clearInterval(gameInterval);
        go(6);
      }
    };

    box.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
}

/* =====================================================
   PAGE 6 — LETTER
===================================================== */
function openLetter(){
  document.getElementById("letter").style.display="block";
}

/* =====================================================
   PAGE 8 — YES / NO DRAMA
===================================================== */
let yesScale=1;
function noDrama(btn){
  yesScale+=0.3;
  document.getElementById("yesBtn").style.transform=`scale(${yesScale})`;
  btn.innerText=["NO","PLEASE","ARE YOU SURE?","CLICK YES!"][Math.min(Math.floor(yesScale),3)];
}

/* =====================================================
   PAGE 9 — REPLAY
===================================================== */
function replay(){
  location.reload();
}
