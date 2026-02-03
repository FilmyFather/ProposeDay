const pages=document.querySelectorAll(".page");
const music=document.getElementById("bgMusic");
let currentPage=1;

function go(n){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById("p"+n).classList.add("active");
  currentPage=n;
  if(n===2){qIndex=0;loadQuestion()}
  if(n===4)initHunt();
}

function toggleMusic(){
  music.paused?music.play():music.pause();
}

/* LOCK */
const PASSWORD="rajkumari";
let wrong=0;
const taunts=[
 "Arre Ghelsodi 😝",
 "Dhapudiii 😜",
 "Bhilan ❌",
 "Wagri 🤯",
 "Gaanduu Insaan 🤦‍♂️"
];

function unlock(){
  const v=password.value.toLowerCase();
  if(v===PASSWORD){
    music.currentTime=62;
    music.play();
    go(2);
  }else{
    lockMsg.innerText=taunts[wrong]||"Hint: Agar Yuvraj Rajkumar hai…";
    wrong++;
  }
}

/* QUIZ */
const quiz=[
 {q:"Who is the lucky one?",o:["Me","You","Both"],a:2},
 {q:"Best gift ever?",o:["Expensive","One Night","Whole Day","Stay Forever","Party"],a:3},
 {q:"Love is based on?",o:["Looks","Money","Trust","Mood"],a:2},
 {q:"Who do you trust?",o:["Friends","Family","Yuvraj","All"],a:2},
 {q:"Will you be mine forever?",o:["Yes","Forever","Belong","Last Breath","All"],a:4}
];

let qIndex=0;

function loadQuestion(){
  qNo.innerText="0"+(qIndex+1);
  question.innerText=quiz[qIndex].q;
  options.innerHTML="";
  quiz[qIndex].o.forEach((t,i)=>{
    const b=document.createElement("button");
    b.className="optBtn";
    b.innerText=t;
    b.onclick=()=>check(i,b);
    options.appendChild(b);
  });
}

function check(i,b){
  if(i===quiz[qIndex].a){
    b.classList.add("correct");
    setTimeout(()=>{qIndex++;qIndex<quiz.length?loadQuestion():go(3)},600);
  }else{
    b.classList.add("wrong");
  }
}

/* HUNT */
let rings=0;
function initHunt(){
  rings=0;
  huntGrid.innerHTML="";
  const items=[1,1,1,0,0,0,0,0,0].sort(()=>.5-Math.random());
  items.forEach(v=>{
    const d=document.createElement("div");
    d.className="card";
    d.onclick=()=>{
      d.innerText=v?"💍":"💩";
      if(v){rings++;if(rings===3)setTimeout(()=>go(5),800)}
    };
    huntGrid.appendChild(d);
  });
}

/* GAME */
function startGame(){
  let caught=0;
  bar.style.width="0%";
  const i=setInterval(()=>{
    if(currentPage!==5)return;
    const h=document.createElement("span");
    h.className="fall-heart";
    h.innerText="❤️";
    h.style.left=Math.random()*90+"%";
    h.onclick=()=>{
      caught++;
      bar.style.width=(caught/12*100)+"%";
      h.remove();
      if(caught>=12){clearInterval(i);go(6)}
    };
    gameBox.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },600);
}

function openLetter(){
  letter.classList.add("open");
}

let yesSize=1;
function growYes(){
  yesSize+=.3;
  yesBtn.style.transform=`scale(${yesSize})`;
}
