/* ================= GLOBAL ================= */

let currentPage = 1;
const pages = document.querySelectorAll(".page");
const music = document.getElementById("bgMusic");
const musicControl = document.getElementById("musicControl");

/* ================= PAGE SWITCH ================= */

function go(n){
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
  currentPage = n;

  if(n === 2) loadQuestion();
  if(n === 4) initHunt();
}

/* ================= BACKGROUND HEARTS ================= */

const heartsBox = document.getElementById("hearts");
for(let i=0;i<28;i++){
  const h = document.createElement("div");
  h.className = "heart";
  h.innerText = "❤️";
  h.style.left = Math.random()*100+"%";
  h.style.top  = Math.random()*100+"%";
  h.style.fontSize = 12 + Math.random()*18 + "px";
  heartsBox.appendChild(h);
}

/* ================= MUSIC (LUXURY LOGIC – SAME AS YOUR CODE) ================= */

let volState = 0; // 0=low,1=mid,2=high,3=mute

music.volume = 0.5;

music.addEventListener("loadedmetadata",()=>{
  if(music.currentTime < 62){
    music.currentTime = 62;
  }
});

musicControl.onclick = ()=>{
  volState = (volState + 1) % 4;

  if(volState === 0){
    music.volume = 0.3;
    music.play().catch(()=>{});
  }
  if(volState === 1){
    music.volume = 0.6;
  }
  if(volState === 2){
    music.volume = 1;
  }
  if(volState === 3){
    music.pause();
  }
};

/* ================= PAGE 1 – LOCK ================= */

const PASSWORD = "rajkumari";
let wrongCount = 0;

const taunts = [
  "Arre Ghelsodi 😝 dhyaan se daal!",
  "Dhapudiii 😜 fir galat!",
  "Bhilan ❌ soch ke likh!",
  "Wagri 🤯 itna tough nahi!",
  "Gaanduu Insaan 🤦‍♂️"
];

function unlock(){
  const val = password.value.trim().toLowerCase();

  if(val === PASSWORD){
    confetti({particleCount:220, spread:120});
    music.currentTime = 62;
    music.play().catch(()=>{});
    go(2);
  }else{
    password.classList.add("shake");
    setTimeout(()=>password.classList.remove("shake"),300);

    if(wrongCount < taunts.length){
      lockMsg.innerText += (lockMsg.innerText ? "\n" : "") + taunts[wrongCount];
    }

    wrongCount++;

    if(wrongCount === 5){
      lockMsg.innerText +=
        "\n\nHint: Agar Yuvraj Rajkumar hai… to tum uski kya ho? ❤️";
      lockMsg.style.opacity = "0.6";
    }
  }
}

/* ================= PAGE 2 – QUIZ ================= */

const quiz = [
 {q:"01. Who is the lucky one?",o:["Me","You","Both","Us","Always You"],a:2},
 {q:"02. What do you want from me?",o:[
   "Expensive Gift",
   "One Night Stand",
   "Whole Day Spend Together",
   "Stay Together For Life",
   "Party Out of State"
 ],a:3},
 {q:"03. After 3 years, what matters most?",o:["Looks","Money","Trust","Fame","Status"],a:2},
 {q:"04. Who do you trust the most?",o:["Friends","Family","Yuvraj","Everyone","Destiny"],a:2},
 {q:"05. After 3 beautiful years, will you be mine forever? 💍",o:[
   "Yes, today & always ❤️",
   "Forever & beyond ♾️",
   "I already belong to you 😘",
   "Till my last breath 💕",
   "All of the above 💍❤️"
 ],a:4},
 {q:"06. Will you choose me again every single day?",o:[
   "Yes, without thinking",
   "Always & forever",
   "In every lifetime",
   "Already chosen ❤️",
   "All of the above 💕"
 ],a:4},
 {q:"07. Love means?",o:["Timepass","Habit","Mood","Trust","Drama"],a:3},
 {q:"08. Final answer?",o:["No","Maybe","Yes","Smile","Silence"],a:2}
];

let qi = 0;

function loadQuestion(){
  qNo.innerText = quiz[qi].q;
  options.innerHTML = "";

  quiz[qi].o.forEach((txt,i)=>{
    const b = document.createElement("div");
    b.className = "quiz-option";
    b.innerText = txt;

    b.onclick = ()=>{
      if(i === quiz[qi].a){
        b.classList.add("correct");
        confetti({particleCount:80, spread:70});

        setTimeout(()=>{
          qi++;
          if(qi < quiz.length){
            loadQuestion();
          }else{
            confetti({particleCount:220, spread:120});
            go(3);
          }
        },600);
      }else{
        b.classList.add("wrong","shake");
        navigator.vibrate?.(200);
      }
    };
    options.appendChild(b);
  });
}

/* ================= PAGE 3 ================= */

noBtn.onmouseover = ()=>{
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random()*80+"%";
  noBtn.style.top  = Math.random()*80+"%";
};

/* ================= PAGE 4 – PROPOSAL HUNT ================= */

let found = 0;

function initHunt(){
  found = 0;
  ringCount.innerText = "0";
  huntGrid.innerHTML = "";

  const items = ["💍","💍","💍","🍃","🍃","🍃","🍃","🍃","🍃"]
    .sort(()=>Math.random()-0.5);

  items.forEach(it=>{
    const c = document.createElement("div");
    c.className = "card";
    c.innerText = "🍃";

    c.onclick = ()=>{
      c.innerText = it === "💍" ? "💍" : "💩";
      if(it === "💍"){
        found++;
        ringCount.innerText = found;
        if(found === 3){
          setTimeout(()=>go(5),600);
        }
      }
      c.onclick = null;
    };
    huntGrid.appendChild(c);
  });
}

/* ================= PAGE 5 – CATCH MY LOVE ================= */

let caught = 0;
let gameInt;

function startGame(){
  caught = 0;
  bar.style.width = "0%";
  gameBox.innerHTML = "";
  clearInterval(gameInt);

  gameInt = setInterval(()=>{
    if(currentPage !== 5) return;

    const h = document.createElement("div");
    h.className = "fall-heart";
    h.innerText = "❤️";
    h.style.left = Math.random()*90+"%";

    h.onclick = ()=>{
      caught++;
      bar.style.width = (caught/12*100)+"%";
      h.remove();
      if(caught >= 12){
        clearInterval(gameInt);
        go(6);
      }
    };

    gameBox.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
}

/* ================= PAGE 6 – LETTER ================= */

function openLetter(){
  document.getElementById("letter").style.display = "block";
}

/* ================= PAGE 7 – PHOTOS ================= */

function openPhoto(src){
  modalImg.src = src;
  photoModal.style.display = "flex";
}
function closePhoto(){
  photoModal.style.display = "none";
}

/* ================= PAGE 8 ================= */

let yesScale = 1;
function noClick(){
  yesScale += 0.3;
  yesBtn.style.transform = `scale(${yesScale})`;
  if(yesScale > 2.5){
    noBtn8.style.display = "none";
  }
}
function finalYes(){
  confetti({particleCount:300, spread:160});
  go(9);
}

/* ================= PAGE 9 ================= */

function replay(){
  location.reload();
   }
