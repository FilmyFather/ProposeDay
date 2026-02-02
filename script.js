let current=1,wrong=0,qi=0,found=0;
const music=document.getElementById("music");

/* NAV */
function go(n){
  document.getElementById("p"+current).classList.remove("active");
  current=n;
  document.getElementById("p"+current).classList.add("active");
}

/* BG HEARTS */
const bg=document.getElementById("bgHearts");
for(let i=0;i<20;i++){
  let h=document.createElement("span");
  h.innerText="❤️";
  h.style.left=Math.random()*100+"%";
  h.style.top=Math.random()*100+"%";
  bg.appendChild(h);
}

/* LOCK */
const taunts=[
 "Arre Ghelsodi 😝 itne pyaar ke baad bhi password yaad nahi?",
 "Dhapudiii 😜 dimaag me hint tha, par use karna bhool gayi.",
 "Bhilan ❌ itna aasan tha, phir bhi galat try.",
 "Wagri 🤯 thoda socho yaar.",
 "Gaanduu Insaan 🤦‍♂️ pyaar me bhi confusion?"
];

function unlock(){
  const v=password.value.trim().toLowerCase();
  if(v==="rajkumari"){
    lockMsg.innerText="Unlocked 💖";
    music.currentTime=62;
    music.play();
    loadQuiz(); go(2);
  }else{
    password.classList.add("shake");
    setTimeout(()=>password.classList.remove("shake"),300);
    lockMsg.innerText = wrong>=5
      ? "Hint ❤️: Agar Yuvraj Rajkumar hai… to tum uski kya ho?"
      : taunts[wrong];
    wrong++;
  }
}

/* QUIZ */
const quiz=[
 {q:"Who is the lucky one?",o:["Me","You","Both"],c:1},
 {q:"Perfect propose gift?",o:["Ring","Chocolate","Heart"],c:0},
 {q:"Stay forever?",o:["Yes","No","Maybe"],c:0},
 {q:"Who loves more?",o:["You","Yuvraj","Both"],c:1},
 {q:"Relationship depends on?",o:["Mood","Trust","Time"],c:1},
 {q:"Fight ke baad?",o:["Ignore","Talk","Block"],c:1},
 {q:"Forever means?",o:["Time","Always","Sometimes"],c:1},
 {q:"Final answer?",o:["Yes","No","Think"],c:0}
];

function loadQuiz(){
  const q=quiz[qi];
  quizQ.innerText=`0${qi+1}. ${q.q}`;
  quizOpt.innerHTML="";
  q.o.forEach((t,i)=>{
    const b=document.createElement("button");
    b.innerText=t;
    b.onclick=()=>{
      if(i===q.c){
        b.style.background="green";
        qi++;
        setTimeout(()=>qi<quiz.length?loadQuiz():go(3),400);
      }else{
        b.style.background="red";
        b.classList.add("shake");
      }
    };
    quizOpt.appendChild(b);
  });
}

/* NO RUN */
noRun.onmouseover=()=>{noRun.style.left=Math.random()*70+"%";noRun.style.top=Math.random()*70+"%"}

/* HUNT */
const rows=[["💍","💩","💩"],["💩","💍","💩"],["💩","💩","💍"]];
rows.forEach(r=>{
 r.sort(()=>Math.random()-0.5);
 r.forEach(x=>{
  const c=document.createElement("div");
  c.className="huntCard"; c.innerText="❓";
  c.onclick=()=>{
    if(c.done)return;
    c.done=true; c.innerText=x;
    if(x==="💍"){found++; huntCount.innerText=`Rings Found: ${found}/3`; if(found===3)go(5);}
  };
  huntGrid.appendChild(c);
 });
});

/* GAME */
let caught=0,intv;
function startGame(){
 caught=0;bar.style.width="0%";
 clearInterval(intv);
 intv=setInterval(()=>{
  let h=document.createElement("div");
  h.className="heart";h.innerText="❤️";
  h.style.left=Math.random()*90+"%";
  h.onclick=()=>{
    caught++;bar.style.width=(caught/12*100)+"%";
    h.remove(); if(caught>=12){clearInterval(intv);go(6);}
  };
  gameBox.appendChild(h);
  setTimeout(()=>h.remove(),3000);
 },600);
}

/* LETTER */
function openLetter(){
 letter.classList.remove("hidden");
 letterNext.classList.remove("hidden");
}

/* YES NO */
function yes(){go(9)}
function no(){
 noBtn.style.left=Math.random()*70+"%";
 noBtn.style.top=Math.random()*70+"%";
}

/* MUSIC CTRL */
musicCtrl.onclick=()=> music.paused?music.play():music.pause();
