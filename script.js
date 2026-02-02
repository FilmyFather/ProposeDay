/* PAGE NAV */
const pages=document.querySelectorAll(".page");
function go(n){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
}

/* BACKGROUND HEARTS */
for(let i=0;i<25;i++){
  let h=document.createElement("span");
  h.innerText="❤️";
  h.style.left=Math.random()*100+"vw";
  h.style.top=Math.random()*100+"vh";
  document.getElementById("bgHearts").appendChild(h);
}

/* LOCK */
let wrong=0;
const taunts=[
 "Arre Pagli 😝 itna bhi nahi pata?",
 "Ghelsodi 😜 thoda socho",
 "Dhapudiii 😂 almost",
 "Bhilan 😆 ek baar aur",
 "💡 Hint: Agar Yuvraj Rajkumar hai… to tum kaun ho? 👑"
];

function unlock(){
  const val=password.value.trim().toLowerCase();
  if(val==="rajkumari"){
    music.currentTime=62;
    music.play();
    go(2);
  }else{
    lockMsg.innerText=taunts[Math.min(wrong,4)];
    password.classList.add("shake");
    navigator.vibrate?.([80,40,80]);
    setTimeout(()=>password.classList.remove("shake"),300);
    wrong++;
  }
}

/* QUIZ */
const quiz=[
 ["01. Who is the lucky one?",["You","Me","Both","Destiny","Secret"],2],
 ["02. Perfect Propose Day gift?",["Chocolate","Ring","Your hand","Trip","Food"],2],
 ["03. Will you stay with me forever?",["No","Maybe","Always","Later","Ask"],2],
 ["04. Who understands you most?",["Friends","Family","Yuvraj","Nobody","Time"],2],
 ["05. Relationship depends on?",["Mood","Fight","Time","Food","Depends"],4],
 ["06. Sorry first kaun bolega?",["You","Me","Both","No one","Mood pe"],4],
 ["07. Most important thing?",["Looks","Money","Trust","Luck","Drama"],2],
 ["08. Are we meant to be?",["No","Maybe","Yes","Time","Secret"],2]
];
let qi=0;

function loadQuiz(){
  qTitle.innerText=quiz[qi][0];
  options.innerHTML="";
  quiz[qi][1].forEach((t,i)=>{
    const b=document.createElement("button");
    b.className="option";
    b.innerText=t;
    b.onclick=()=>{
      if(i===quiz[qi][2]){
        b.classList.add("correct");
        if(qi===quiz.length-1) confetti();
        setTimeout(()=>{qi++;qi<quiz.length?loadQuiz():go(3)},700);
      }else{
        b.classList.add("wrong");
        navigator.vibrate?.([80,40,80]);
      }
    };
    options.appendChild(b);
  });
}
loadQuiz();

/* SECURITY */
runBtn.onmouseover=()=>{
  runBtn.style.position="absolute";
  runBtn.style.left=Math.random()*70+"%";
  runBtn.style.top=Math.random()*70+"%";
};

/* PROPOSAL HUNT */
let found=0;
[0,2,5].forEach(()=>{});
for(let i=0;i<9;i++){
  const d=document.createElement("div");
  d.innerText="🌿";
  d.onclick=()=>{
    if([0,2,5].includes(i)&&!d.done){
      d.innerText="💍";d.done=true;found++;
      ringCount.innerText=found;
      if(found===3)go(5);
    }else d.innerText="💩";
  };
  huntGrid.appendChild(d);
}

/* GAME */
let caught=0,interval;
function startGame(){
  caught=0;bar.style.width="0%";
  interval=setInterval(()=>{
    const h=document.createElement("span");
    h.innerText="❤️";
    h.style.position="absolute";
    h.style.left=Math.random()*85+"%";
    h.style.top="-20px";
    h.onclick=()=>{
      caught++;bar.style.width=(caught/12*100)+"%";
      h.remove();
      if(caught>=12){clearInterval(interval);go(6);}
    };
    gameBox.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },700);
}

/* PHOTOS */
function openPhoto(i){
  photoModal.style.display="block";
  modalImg.src=i.src;
}
function closePhoto(){
  photoModal.style.display="none";
}

/* YES NO */
let scale=1;
function noClick(){
  scale+=0.2;
  yesBtn.style.transform=`scale(${scale})`;
}
function yesClick(){
  confetti();
  go(9);
}
