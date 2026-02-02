/* ===============================
   SAFE INIT (VERY IMPORTANT)
================================ */
document.addEventListener("DOMContentLoaded", () => {
  init();
});

function init(){

/* ===============================
   PAGE NAVIGATION
================================ */
const pages = document.querySelectorAll(".page");
window.go = function(n){
  pages.forEach(p => p.classList.remove("active"));
  const pg = document.getElementById("p"+n);
  if(pg) pg.classList.add("active");
};

/* ===============================
   BACKGROUND HEARTS
================================ */
const heartLayer = document.getElementById("heartLayer");
if(heartLayer){
  for(let i=0;i<30;i++){
    const h = document.createElement("span");
    h.className = "bg-heart";
    h.innerText = "❤";
    h.style.left = Math.random()*100 + "vw";
    h.style.top  = Math.random()*100 + "vh";
    h.style.animationDuration = (5 + Math.random()*5) + "s";
    heartLayer.appendChild(h);
  }
}

/* ===============================
   LOCK / UNLOCK
================================ */
let wrong = 0;
const taunts = [
 "Arre Pagli 😝 itna bhi nahi pata?",
 "Ghelsodi 😜 thoda socho",
 "Dhapudiii 😂 almost pahunch gayi",
 "Bhilan 😆 ek baar aur try karo",
 "💡 Hint: Agar Yuvraj Rajkumar hai… to tum kaun ho? 👑"
];

window.unlock = function(){
  const password = document.getElementById("password");
  const lockMsg  = document.getElementById("lockMsg");
  const music    = document.getElementById("music");

  if(!password || !lockMsg) return;

  const val = password.value.trim().toLowerCase();

  if(val === "rajkumari"){
    lockMsg.innerText = "";
    if(music){
      music.currentTime = 62;
      music.play().catch(()=>{});
    }
    go(2);
  }else{
    lockMsg.innerText = taunts[Math.min(wrong, taunts.length-1)];
    password.classList.add("shake");
    navigator.vibrate?.([80,40,80]);
    setTimeout(()=>password.classList.remove("shake"),300);
    wrong++;
  }
};

/* ===============================
   QUIZ (8 QUESTIONS)
================================ */
const quiz = [
 ["01. Who is the lucky one?",["You","Me","Both","Destiny","Secret"],2],
 ["02. Perfect Propose Day gift?",["Chocolate","Ring","Your hand","Trip","Food"],2],
 ["03. Will you stay with me forever?",["No","Maybe","Always","Later","Ask"],2],
 ["04. Who understands you most?",["Friends","Family","Yuvraj","Nobody","Time"],2],
 ["05. Relationship depends on?",["Mood","Fight","Time","Food","Depends"],4],
 ["06. Sorry first kaun bolega?",["You","Me","Both","No one","Mood pe"],4],
 ["07. Most important thing?",["Looks","Money","Trust","Luck","Drama"],2],
 ["08. Are we meant to be?",["No","Maybe","Yes","Time","Secret"],2]
];

let qi = 0;
const qTitle = document.getElementById("qTitle");
const options = document.getElementById("options");

function loadQuiz(){
  if(!qTitle || !options) return;

  qTitle.innerText = quiz[qi][0];
  options.innerHTML = "";

  quiz[qi][1].forEach((txt,i)=>{
    const b = document.createElement("button");
    b.className = "option";
    b.innerText = txt;

    b.onclick = ()=>{
      document.querySelectorAll(".option").forEach(x=>x.onclick=null);

      if(i === quiz[qi][2]){
        b.classList.add("correct");
        if(qi === quiz.length-1){
          confetti({particleCount:180,spread:100});
        }
        setTimeout(()=>{
          qi++;
          qi < quiz.length ? loadQuiz() : go(3);
        },700);
      }else{
        b.classList.add("wrong","shake");
        navigator.vibrate?.([80,40,80]);
      }
    };

    options.appendChild(b);
  });
}
loadQuiz();

/* ===============================
   FINAL SECURITY (NO BUTTON RUN)
================================ */
const runBtn = document.getElementById("runBtn");
if(runBtn){
  runBtn.addEventListener("mouseover", ()=>{
    runBtn.style.position = "absolute";
    runBtn.style.left = Math.random()*70 + "%";
    runBtn.style.top  = Math.random()*70 + "%";
  });
}

/* ===============================
   PROPOSAL HUNT (3 RINGS)
================================ */
const huntGrid = document.getElementById("huntGrid");
const ringCount = document.getElementById("ringCount");
let found = 0;
const ringPos = [0,2,5];

if(huntGrid){
  for(let i=0;i<9;i++){
    const d = document.createElement("div");
    d.innerText = "🌿";
    d.onclick = ()=>{
      if(ringPos.includes(i) && !d.done){
        d.innerText = "💍";
        d.done = true;
        found++;
        ringCount.innerText = found;
        if(found === 3){
          setTimeout(()=>go(5),600);
        }
      }else{
        d.innerText = "💩";
      }
    };
    huntGrid.appendChild(d);
  }
}

/* ===============================
   CATCH MY LOVE GAME
================================ */
let caught = 0;
let interval;
const gameBox = document.getElementById("gameBox");
const bar = document.getElementById("bar");

window.startGame = function(){
  if(!gameBox || !bar) return;

  caught = 0;
  bar.style.width = "0%";
  gameBox.innerHTML = "";

  interval = setInterval(()=>{
    const h = document.createElement("span");
    h.innerText = "❤️";
    h.style.position = "absolute";
    h.style.left = Math.random()*85 + "%";
    h.style.top = "-20px";
    h.style.cursor = "pointer";

    h.onclick = ()=>{
      caught++;
      bar.style.width = (caught/12*100) + "%";
      h.remove();
      if(caught >= 12){
        clearInterval(interval);
        confetti();
        setTimeout(()=>go(6),600);
      }
    };

    gameBox.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },700);
};

/* ===============================
   PHOTOS
================================ */
window.openPhoto = function(img){
  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("modalImg");
  if(modal && modalImg){
    modal.style.display = "block";
    modalImg.src = img.src;
  }
};
window.closePhoto = function(){
  const modal = document.getElementById("photoModal");
  if(modal) modal.style.display = "none";
};

/* ===============================
   YES / NO FINAL
================================ */
let scale = 1;
const yesBtn = document.getElementById("yesBtn");

window.noClick = function(){
  scale += 0.2;
  if(yesBtn){
    yesBtn.style.transform = `scale(${scale})`;
  }
};
window.yesClick = function(){
  confetti({particleCount:200,spread:120});
  setTimeout(()=>go(9),600);
};

} // 🔚 init end
