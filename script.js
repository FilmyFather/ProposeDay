function go(n){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 document.getElementById('p'+n).classList.add('active');
}

/* MUSIC + LOCK */
let wrong=0, musicStarted=false;
const bg=document.getElementById("bgMusic");

function unlock(){
 const v=document.getElementById("pass").value.toLowerCase().trim();
 const msg=document.getElementById("lockMsg");

 if(v==="rajkumari"){
  if(!musicStarted){
    bg.currentTime=62;
    bg.volume=.8;
    bg.play();
    musicStarted=true;
  }
  go(2);
 }else{
  wrong++;
  const words=[
   "Arre Ghelsodi 😝 itna bhi nahi pata?",
   "Dhapudiii 😂 thoda socho!",
   "Bhilan 😆 galat ho gaya!",
   "Wagri 😜 fir try karo!",
   "Gaanduu insaan 🤣 par cute!"
  ];
  msg.innerText=words[(wrong-1)%5];
  if(wrong>=5){
   msg.innerText="Hint: Agar Yuvraj Rajkumar hai… to tum kaun ho? 👑";
  }
 }
}

/* QUIZ */
const quiz=[
 ["01. Who is the lucky one?","You","Me","Both of us","Destiny","Secret",2],
 ["02. Perfect propose gift?","Gifts","Ring","Your hand","Chocolate","Food",2],
 ["03. Stay forever?","Maybe","No","Yes, always","Later","Ask later",2],
 ["04. Who understands you?","Friends","Family","Yuvraj","Time","No one",2],
 ["05. Who gets angry first?","You","Me","Both","No one","Depends",4],
 ["06. Who says sorry first?","You","Me","Both","No one","Mood pe",4],
 ["07. What matters most?","Looks","Money","Trust","Luck","Drama",2],
 ["08. Are we meant to be?","No","Maybe","Yes","Time","Secret",2]
];
let qi=0;
const qb=document.getElementById("quizBox");
const qr=document.getElementById("quizReact");

function showQ(){
 qb.innerHTML="<p>"+quiz[qi][0]+"</p>";
 qr.innerText="";
 for(let i=1;i<=5;i++){
  const d=document.createElement("div");
  d.className="option";
  d.innerText=quiz[qi][i];
  d.onclick=()=>{
   if(i-1===quiz[qi][6]){
    d.classList.add("correct");
    setTimeout(()=>{qi++;qi<quiz.length?showQ():go(3)},600);
   }else{
    d.classList.add("wrong");
    qr.innerText="Galat 😝 phir socho!";
   }
  };
  qb.appendChild(d);
 }
}
showQ();

/* ===== PROPOSAL HUNT (FIXED) ===== */
let ringsFound = 0;
const grid = document.getElementById("huntGrid");
const ringCount = document.getElementById("rings");

// clear grid (safety)
grid.innerHTML = "";

// exactly 3 ring positions
const positions = [...Array(9).keys()];
positions.sort(() => 0.5 - Math.random());
const ringPositions = positions.slice(0, 3);

for (let i = 0; i < 9; i++) {
  const box = document.createElement("div");
  box.innerText = "🌿";
  box.style.cursor = "pointer";

  box.onclick = () => {
    if (box.dataset.clicked) return;
    box.dataset.clicked = "true";

    if (ringPositions.includes(i)) {
      box.innerText = "💍";
      ringsFound++;
      ringCount.innerText = ringsFound;

      if (ringsFound === 3) {
        setTimeout(() => go(5), 800); // next page
      }
    } else {
      box.innerText = "💩";
    }
  };

  grid.appendChild(box);
}

/* ===== HEART CATCH GAME (FINAL WORKING) ===== */
let caught = 0;
let gameStarted = false;
let heartInterval = null;

const box = document.getElementById("gameBox");
const bar = document.getElementById("bar");
const startBtn = document.getElementById("startGameBtn");

startBtn.addEventListener("click", startHeartGame);

function startHeartGame(){
  if(gameStarted) return;
  gameStarted = true;
  startBtn.style.display = "none";

  heartInterval = setInterval(()=>{
    // page 5 active hona chahiye
    if(!document.getElementById("p5").classList.contains("active")) return;

    const h = document.createElement("span");
    h.innerText = "❤️";
    h.style.position = "absolute";
    h.style.left = Math.random()*85 + "%";
    h.style.top = "-30px";
    h.style.fontSize = "24px";
    h.style.cursor = "pointer";
    h.style.transition = "top 3s linear";

    box.appendChild(h);

    // fall
    requestAnimationFrame(()=>{
      h.style.top = "110%";
    });

    // catch
    h.onclick = ()=>{
      caught++;
      bar.style.width = (caught/12)*100 + "%";
      h.remove();

      if(caught >= 12){
        clearInterval(heartInterval);
        setTimeout(()=>go(6), 700);
      }
    };

    // miss
    setTimeout(()=>{
      if(h.parentElement) h.remove();
    }, 3200);

  }, 700);
}

/* YES NO */
const yes=document.getElementById("yesBtn");
const no=document.getElementById("noBtn");
let scale=1;
no.onclick=()=>{
 scale+=.2;
 yes.style.transform=`scale(${scale})`;
 if(scale>2)no.style.display="none";
};
yes.onclick=()=>go(9);
