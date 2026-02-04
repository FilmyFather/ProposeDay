/* ======================
   GLOBAL
====================== */
let currentPage = 1;
const pages = document.querySelectorAll(".page");
const music = document.getElementById("bgMusic");

/* PAGE SWITCH */
function go(n){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
  currentPage = n;

  if(n===2) loadQuestion();
  if(n===4) initHunt();
}

/* ======================
   BACKGROUND HEARTS
====================== */
const hb = document.getElementById("hearts");
for(let i=0;i<30;i++){
  let h=document.createElement("div");
  h.className="heart";
  h.innerText="❤️";
  h.style.left=Math.random()*100+"%";
  h.style.top=Math.random()*100+"%";
  h.style.fontSize=12+Math.random()*18+"px";
  hb.appendChild(h);
}

/* ======================
   MUSIC – FINAL
====================== */
const opts = document.getElementById("options");
music.volume = 0.5;

music.addEventListener("loadedmetadata",()=>{
  music.currentTime = 62;
});

function toggleOptions(){
  opts.classList.toggle("show");
}

function setVolume(v){
  if(v===0){
    music.pause();
  }else{
    music.volume=v;
    if(music.paused){
      music.play().catch(()=>{});
    }
  }
  opts.classList.remove("show");
}

function startMusicOnUnlock(){
  music.currentTime = 62;
  music.volume = 0.5;
  music.play().catch(()=>{});
}

/* ======================
   PAGE 1 — LOCK (FINAL)
====================== */
const PASSWORD = "rajkumari";
let wrong = 0;
let hintShown = false;

const taunts = [
  "Arre Ghelsodi 😝 itna bhi nahi pata?",
  "Dhapudiii 😜 thoda socho!",
  "Bhilan ❌ dimaag use karo!",
  "Wagri 🤯 almost aa gaya tha!",
  "Gaanduu Insaan 🤦‍♂️ ab hint milega!"
];

function unlock(){
  const val = password.value.toLowerCase().trim();

  if(val === PASSWORD){
    confetti({particleCount:200,spread:120});
    startMusicOnUnlock();
    go(2);
  }else{
    password.classList.add("shake");
    setTimeout(()=>password.classList.remove("shake"),300);

    if(!hintShown){
      lockMsg.innerText = taunts[wrong] || taunts[taunts.length-1];
    }

    wrong++;

    if(wrong >= 5 && !hintShown){
      lockMsg.innerHTML += `
        <div class="hint-box">
          Hint: Agar <b>Yuvraj</b> Rajkumar hai…<br>
          to tum uski kya ho? ❤️
        </div>
      `;
      hintShown = true;
    }
  }
}

/* ======================
   PAGE 2 — QUIZ
====================== */
const quiz = [
 {q:"01. Who is the lucky one?",o:["Me","You","Both","Us","Always You"],a:2},
 {q:"02. What do you want from me?",o:["Expensive Gift","One Night Stand","Whole Day Together","Stay Together For Life","Party"],a:3},
 {q:"03. After 3 years, what matters most?",o:["Looks","Money","Trust","Fame","Status"],a:2},
 {q:"04. Who do you trust the most?",o:["Friends","Family","Yuvraj","Everyone","Fate"],a:2},
 {q:"05. After 3 beautiful years, will you be mine forever?",o:["Yes ❤️","Beyond ♾️","Belong 😘","Breath 💕","All Above 💍"],a:4},
 {q:"06. Will you choose me again every day?",o:["Yes","Always","Lifetime","Already","All Above"],a:4},
 {q:"07. Love means?",o:["Timepass","Habit","Mood","Trust","Drama"],a:3},
 {q:"08. Final answer?",o:["No","Maybe","Yes","Smile","Silence"],a:2}
];

let qi=0;
function loadQuestion(){
  qNo.innerText = quiz[qi].q;
  options.innerHTML="";
  quiz[qi].o.forEach((t,i)=>{
    let b=document.createElement("div");
    b.className="quiz-option";
    b.innerText=t;
    b.onclick=()=>{
      if(i===quiz[qi].a){
        b.classList.add("correct");
        confetti({particleCount:80,spread:90});
        setTimeout(()=>{
          qi++;
          qi<quiz.length ? loadQuestion() : (confetti({particleCount:200,spread:140}),go(3));
        },600);
      }else{
        b.classList.add("wrong","shake");
        navigator.vibrate?.(200);
      }
    };
    options.appendChild(b);
  });
}

/* ======================
   PAGE 3 — NO BUTTON
====================== */
noBtn.onmouseover=()=>{
  noBtn.style.left=Math.random()*80+"%";
  noBtn.style.top=Math.random()*80+"%";
};

/* ======================
   PAGE 4 — PROPOSAL HUNT
====================== */
let found=0;
function initHunt(){
  found=0;
  ringCount.innerText=0;
  huntGrid.innerHTML="";
  let items=["💍","💍","💍","🍃","🍃","🍃","🍃","🍃","🍃"].sort(()=>Math.random()-.5);
  items.forEach(it=>{
    let c=document.createElement("div");
    c.className="card";
    c.innerText="🍃";
    c.onclick=()=>{
      c.innerText = it==="💍"?"💍":"💩";
      if(it==="💍" && ++found===3) go(5);
      ringCount.innerText=found;
      c.onclick=null;
    };
    huntGrid.appendChild(c);
  });
}

/* ======================
   PAGE 5 — CATCH GAME
====================== */
let caught=0,intv;
function startGame(){
  caught=0;
  bar.style.width="0%";
  gameBox.innerHTML="";
  clearInterval(intv);
  intv=setInterval(()=>{
    if(currentPage!==5) return;
    let h=document.createElement("div");
    h.className="fall-heart";
    h.innerText="❤️";
    h.style.left=Math.random()*90+"%";
    h.onclick=()=>{
      caught++;
      bar.style.width=(caught/12*100)+"%";
      h.remove();
      if(caught>=12){clearInterval(intv);go(6);}
    };
    gameBox.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
}

/* ======================
   PAGE 6–9
====================== */
function openLetter(){letter.style.display="block";}
function openPhoto(s){modalImg.src=s;photoModal.style.display="flex";}
function closePhoto(){photoModal.style.display="none";}
let ys=1;
function noClick(){ys+=.3;yesBtn.style.transform=`scale(${ys})`;if(ys>2.5)noBtn8.style.display="none";}
function finalYes(){confetti({particleCount:300,spread:160});go(9);}
function replay(){location.reload();}
